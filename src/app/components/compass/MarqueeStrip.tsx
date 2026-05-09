import { motion } from "motion/react";

const items = [
  "Landing Pages",
  "Lojas Virtuais",
  "Sites Institucionais",
  "Sistemas Web",
  "Identidade Digital",
  "E-commerce",
  "Plataformas SaaS",
  "Consultoria Digital",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", display: "flex" }}>
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}
      >
        {repeated.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.2em",
                color: "#F5F4F0",
                textTransform: "uppercase",
                padding: "0 32px",
                opacity: 0.7,
              }}
            >
              {item}
            </span>
            <span
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#BA7517",
                opacity: 0.8,
              }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section
      style={{
        backgroundColor: "#111110",
        borderTop: "1px solid rgba(245,244,240,0.08)",
        borderBottom: "1px solid rgba(245,244,240,0.08)",
        padding: "18px 0",
      }}
    >
      <MarqueeRow />
    </section>
  );
}
