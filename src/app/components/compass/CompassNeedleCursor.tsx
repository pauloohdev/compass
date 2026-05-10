import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const ACCENT = "#BA7517";
const INK = "#111110";

/** Só começamos a procurar letras quando o cursor está perto da caixa do bloco (px). */
const NEAR_BLOCK_MAX_PX = 96;
/** Só rodamos a agulha quando a ponta está claramente perto de UMA letra (px). */
const NEAR_LETTER_MAX_PX = 42;
/** Máx. de parágrafos/títulos analisados por frame (mais próximos da agulha). */
const MAX_BLOCKS_TO_SCAN = 3;
/**
 * Peso extra no eixo Y ao escolher letra: >1 favorece a mesma linha e evita “grudar”
 * na linha de baixo só por estar um pouco mais perto em linha reta.
 */
const LETTER_VERTICAL_BIAS = 2.35;
/**
 * Só trocamos a letra alvo se o ganho na pontuação (com viés) ultrapassar isto —
 * evita descolar da palavra ao ler letras na mesma linha.
 */
const STICKY_SCORE_MARGIN = 260;

const MAGNET_RADIUS_PX = 92;
const MAGNET_STRENGTH = 0.42;

/** Blocos onde fazemos leitura letra-a-letra (sem span na raiz — letras vêm dos filhos). */
const BLOCK_SELECTOR =
  "p, h1, h2, h3, h4, h5, h6, li, label, a, blockquote, figcaption";
const MAGNET_SELECTOR =
  'a[href], button, [role="button"], input[type="submit"], textarea';

function isVisibleEl(el: Element): boolean {
  const s = getComputedStyle(el);
  if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) === 0)
    return false;
  const r = el.getBoundingClientRect();
  return r.width > 1 && r.height > 1;
}

function distPointToRectEdge(px: number, py: number, r: DOMRect): number {
  const cx = Math.max(r.left, Math.min(px, r.right));
  const cy = Math.max(r.top, Math.min(py, r.bottom));
  return Math.hypot(px - cx, py - cy);
}

/** Centros das caixas de cada carácter não-espaço (Range), invalidado no scroll. */
const letterCentersCache = new Map<Element, { cx: number; cy: number }[]>();

function invalidateLetterGeometry() {
  letterCentersCache.clear();
}

function buildLetterCenters(container: Element): { cx: number; cy: number }[] {
  const out: { cx: number; cy: number }[] = [];

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const t = node.textContent;
      for (let i = 0; i < t.length; i++) {
        if (/\s/.test(t[i])) continue;
        const range = document.createRange();
        try {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
        } catch {
          continue;
        }
        const rects = range.getClientRects();
        for (let k = 0; k < rects.length; k++) {
          const rr = rects[k];
          if (rr.width < 0.25 && rr.height < 0.25) continue;
          out.push({
            cx: rr.left + rr.width / 2,
            cy: rr.top + rr.height / 2,
          });
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden") return;
      for (const c of el.childNodes) walk(c);
    }
  };

  walk(container);
  return out;
}

function getLetterCenters(el: Element): { cx: number; cy: number }[] {
  const cached = letterCentersCache.get(el);
  if (cached) return cached;
  const built = buildLetterCenters(el);
  letterCentersCache.set(el, built);
  return built;
}

function collectTargets(root: HTMLElement) {
  const blocks: Element[] = [];
  for (const el of root.querySelectorAll(BLOCK_SELECTOR)) {
    if (el.closest("[data-compass-cursor]")) continue;
    if (!isVisibleEl(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 64) continue;
    blocks.push(el);
  }

  const magnets: Element[] = [];
  for (const el of root.querySelectorAll(MAGNET_SELECTOR)) {
    if (el.closest("[data-compass-cursor]")) continue;
    if (!isVisibleEl(el)) continue;
    magnets.push(el);
  }

  return { blocks, magnets };
}

/** Menor = melhor; penaliza saltos verticais em relação ao cursor. */
function letterPickScore(
  mx: number,
  my: number,
  cx: number,
  cy: number,
): number {
  const dx = cx - mx;
  const dy = cy - my;
  return dx * dx + (dy * LETTER_VERTICAL_BIAS) ** 2;
}

function applyMagnet(
  mx: number,
  my: number,
  magnets: Element[],
): { x: number; y: number } {
  let best: { cx: number; cy: number; d: number } | null = null;
  for (const el of magnets) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const d = Math.hypot(mx - cx, my - cy);
    if (d >= MAGNET_RADIUS_PX) continue;
    if (!best || d < best.d) best = { cx, cy, d };
  }
  if (!best) return { x: mx, y: my };
  const t = 1 - best.d / MAGNET_RADIUS_PX;
  const pull = t * t * MAGNET_STRENGTH;
  return {
    x: mx + (best.cx - mx) * pull,
    y: my + (best.cy - my) * pull,
  };
}

/**
 * Direção da agulha (graus CSS, 0 = norte) para a letra com melhor pontuação
 * (não só mais próxima em linha recta) + histerese na letra anterior.
 */
function lookAtNearestLetter(
  mx: number,
  my: number,
  blocks: Element[],
  stickyLetterRef: { current: { cx: number; cy: number } | null },
): number | null {
  const nearBlocks = blocks
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { el, edgeD: distPointToRectEdge(mx, my, r) };
    })
    .filter((x) => x.edgeD < NEAR_BLOCK_MAX_PX)
    .sort((a, b) => a.edgeD - b.edgeD)
    .slice(0, MAX_BLOCKS_TO_SCAN);

  if (nearBlocks.length === 0) {
    stickyLetterRef.current = null;
    return null;
  }

  let best: { cx: number; cy: number; score: number } | null = null;
  for (const { el } of nearBlocks) {
    for (const { cx, cy } of getLetterCenters(el)) {
      const d = Math.hypot(mx - cx, my - cy);
      if (d > NEAR_LETTER_MAX_PX) continue;
      const score = letterPickScore(mx, my, cx, cy);
      if (!best || score < best.score) best = { cx, cy, score };
    }
  }

  if (!best) {
    stickyLetterRef.current = null;
    return null;
  }

  let target = best;
  const prev = stickyLetterRef.current;
  if (prev) {
    const dPrev = Math.hypot(mx - prev.cx, my - prev.cy);
    if (dPrev < NEAR_LETTER_MAX_PX * 1.35) {
      const sPrev = letterPickScore(mx, my, prev.cx, prev.cy);
      if (best.score > sPrev - STICKY_SCORE_MARGIN) {
        target = { cx: prev.cx, cy: prev.cy, score: sPrev };
      }
    }
  }

  stickyLetterRef.current = { cx: target.cx, cy: target.cy };
  const deg =
    (Math.atan2(target.cy - my, target.cx - mx) * 180) / Math.PI;
  return deg + 90;
}

/**
 * Cursor agulha: íman em controlos; rotação só muito perto de cada letra (leitura fluida).
 */
export function CompassNeedleCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rotation = useSpring(0, {
    stiffness: 68,
    damping: 28,
    mass: 0.95,
  });
  const [active, setActive] = useState(false);
  const targetsRef = useRef<{ blocks: Element[]; magnets: Element[] }>({
    blocks: [],
    magnets: [],
  });
  /** Letra para onde a agulha “estava”; histerese contra saltos entre linhas. */
  const stickyLetterRef = useRef<{ cx: number; cy: number } | null>(null);

  useEffect(() => {
    const mqPrimaryFine = window.matchMedia("(pointer: fine)");
    const mqAnyFine = window.matchMedia("(any-pointer: fine)");

    const evaluate = () => {
      setActive(mqPrimaryFine.matches || mqAnyFine.matches);
    };

    evaluate();
    mqPrimaryFine.addEventListener("change", evaluate);
    mqAnyFine.addEventListener("change", evaluate);
    return () => {
      mqPrimaryFine.removeEventListener("change", evaluate);
      mqAnyFine.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("compass-cursor-active");
    return () => {
      document.documentElement.classList.remove("compass-cursor-active");
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const root = document.getElementById("root");
    if (!root) return;

    const refresh = () => {
      invalidateLetterGeometry();
      stickyLetterRef.current = null;
      targetsRef.current = collectTargets(root);
    };

    let debounceTimer: ReturnType<typeof setTimeout>;
    const scheduleRefresh = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(refresh, 200);
    };

    refresh();
    const onScrollOrResize = () => {
      invalidateLetterGeometry();
      stickyLetterRef.current = null;
    };
    window.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });
    const obs = new MutationObserver(scheduleRefresh);
    obs.observe(root, { childList: true, subtree: true });
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", onScrollOrResize, { capture: true });
      obs.disconnect();
      invalidateLetterGeometry();
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const last = { clientX: 0, clientY: 0 };

    const flush = () => {
      raf = 0;
      const { blocks, magnets } = targetsRef.current;
      const mx = last.clientX;
      const my = last.clientY;
      const mag = applyMagnet(mx, my, magnets);
      x.set(mag.x);
      y.set(mag.y);
      const angle = lookAtNearestLetter(
        mag.x,
        mag.y,
        blocks,
        stickyLetterRef,
      );
      rotation.set(angle ?? 0);
    };

    const move = (e: MouseEvent) => {
      last.clientX = e.clientX;
      last.clientY = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const leave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      stickyLetterRef.current = null;
      x.set(-100);
      y.set(-100);
      rotation.set(0);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [active, x, y, rotation]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      data-compass-cursor
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y }}
    >
      <div style={{ transform: "translate(-50%, 0)" }}>
        <svg
          width={22}
          height={26}
          viewBox="-11 -20 22 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-[0_1px_1px_rgba(17,17,16,0.12)]"
        >
          <motion.g
            style={{
              transformOrigin: "0px -18px",
              rotate: rotation,
            }}
          >
            <polygon
              points="0,-18 6.5,1.5 0,-2.5 -6.5,1.5"
              fill={ACCENT}
              stroke={INK}
              strokeWidth={1.1}
              strokeLinejoin="round"
            />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}
