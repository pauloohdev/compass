import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CompassIcon } from "./CompassIcon";

const steps = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Entendemos profundamente o negócio, o público-alvo e os objetivos antes de escrever uma linha de código.",
  },
  {
    num: "02",
    title: "Estratégia",
    desc: "Definimos arquitetura, tecnologias, fluxos e KPIs que vão guiar todo o processo de criação.",
  },
  {
    num: "03",
    title: "Execução",
    desc: "Design de alta fidelidade e desenvolvimento iterativo com revisões semanais e entregas parciais.",
  },
  {
    num: "04",
    title: "Entrega",
    desc: "Deploy, testes, treinamento e suporte pós-lançamento. O projeto não termina no go-live.",
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="processo"
      ref={ref}
      style={{
        backgroundColor: "#F5F4F0",
        padding: "clamp(80px, 10vw, 160px) 0",
        borderTop: "1px solid rgba(17,17,16,0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "24px", height: "1px", backgroundColor: "#BA7517" }} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#BA7517",
                textTransform: "uppercase",
              }}
            >
              Como trabalhamos
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              color: "#111110",
              lineHeight: "1.05",
              margin: 0,
            }}
          >
            Método,
            <br />
            não improviso.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              style={{
                padding: "clamp(28px, 2.5vw, 48px) clamp(24px, 2vw, 40px)",
                borderRight: i < 3 ? "1px solid rgba(17,17,16,0.1)" : "none",
                borderBottom: "1px solid rgba(17,17,16,0.08)",
                position: "relative",
              }}
              className="border-r-0 md:border-r last:border-r-0 border-b md:border-b-0"
            >
              {/* Connector line */}
              {i < 3 && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    top: "clamp(28px, 2.5vw, 48px)",
                    right: "-1px",
                    width: "1px",
                    height: "20px",
                    backgroundColor: "#BA7517",
                    opacity: 0.4,
                  }}
                />
              )}

              {/* Step number */}
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "rgba(17,17,16,0.3)",
                  textTransform: "uppercase",
                  marginBottom: "clamp(32px, 3vw, 52px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {step.num}
                {i < 3 && (
                  <div
                    className="hidden lg:block"
                    style={{ flex: 1, height: "1px", backgroundColor: "rgba(17,17,16,0.12)" }}
                  />
                )}
              </div>

              {/* Compass needle between steps (desktop only) */}
              {i === 1 && (
                <div
                  className="hidden lg:block absolute -right-[13px] top-8 z-10"
                >
                  <CompassIcon size={26} color="#111110" accentColor="#BA7517" />
                </div>
              )}

              {/* Title */}
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(20px, 1.8vw, 24px)",
                  fontWeight: 600,
                  color: "#111110",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  marginBottom: "12px",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(17,17,16,0.55)",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
