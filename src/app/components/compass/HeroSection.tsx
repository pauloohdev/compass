import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { CompassRose } from "./CompassIcon";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll relativo à seção hero (0 = topo, 1 = saiu da tela)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll absoluto da janela para a rotação da agulha
  const { scrollY } = useScroll();

  // Paralax vertical do bloco inteiro da rosa
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Rotação bruta: 1 volta completa a cada 1200px de scroll
  const rotateRaw = useTransform(scrollY, [0, 1200], [0, 360]);

  // Spring com inércia — agulha "resiste" e acompanha com suavidade física
  const needleRotate = useSpring(rotateRaw, {
    stiffness: 28,
    damping: 18,
    mass: 1.2,
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        backgroundColor: "#F5F4F0",
        /* svh alinha melhor com a área visível real (barras móveis / UI do browser) */
        minHeight: "100svh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Decorative compass rose — right side */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute right-[-80px] md:right-[-40px] lg:right-[0px] top-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <CompassRose
          size={600}
          color="#111110"
          accentColor="#BA7517"
          opacity={0.08}
          scrollRotate={needleRotate}
          className="hidden md:block"
        />
        <CompassRose
          size={340}
          color="#111110"
          accentColor="#BA7517"
          opacity={0.06}
          scrollRotate={needleRotate}
          className="block md:hidden"
        />
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20 w-full pt-[calc(72px+clamp(1rem,3vh,2rem))] pb-14 md:pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: "900px" }}
        >
          {/* Eyebrow label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 md:mb-8">
            <div style={{ width: "32px", height: "1px", backgroundColor: "#BA7517" }} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#BA7517",
                textTransform: "uppercase",
              }}
            >Agência de Software · Passos, Brasil</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              lineHeight: "0.95",
              color: "#111110",
              margin: 0,
              letterSpacing: "-0.03em",
            }}
            className="text-[clamp(38px,6vw,88px)]"
          >
            Construímos
            <br />
            <span
              style={{
                display: "block",
                paddingLeft: "clamp(18px, 3.5vw, 52px)",
              }}
            >
              o digital que
            </span>
            <span
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: "1.5px #111110",
              }}
            >
              move negócios.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 1.2vw, 18px)",
              fontWeight: 300,
              color: "#111110",
              opacity: 0.6,
              lineHeight: "1.65",
              marginTop: "clamp(20px, 2.8vw, 36px)",
              maxWidth: "480px",
            }}
          >
            Estratégia, design e desenvolvimento sob medida para empresas que querem crescer de verdade.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{ marginTop: "clamp(22px, 3vw, 36px)", display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <a
              href="#projetos"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#F5F4F0",
                backgroundColor: "#111110",
                borderRadius: "100px",
                padding: "14px 32px",
                display: "inline-block",
                letterSpacing: "0.02em",
                transition: "all 0.25s ease",
                border: "1px solid #111110",
              }}
              className="hover:bg-[#BA7517] hover:border-[#BA7517] transition-all duration-250"
            >
              Ver projetos
            </a>
            <a
              href="#processo"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#111110",
                backgroundColor: "transparent",
                borderRadius: "100px",
                padding: "14px 32px",
                display: "inline-block",
                letterSpacing: "0.02em",
                border: "1px solid rgba(17,17,16,0.3)",
                transition: "all 0.25s ease",
              }}
              className="hover:border-[#111110] hover:bg-[rgba(17,17,16,0.04)] transition-all duration-250"
            >
              Como trabalhamos
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom detail */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-10 md:left-16 lg:left-20 hidden lg:flex items-center gap-8"
        >
          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "#111110",
                opacity: 0.4,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "1px",
                height: "28px",
                backgroundColor: "#111110",
                opacity: 0.25,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}