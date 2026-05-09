import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="sobre"
      ref={ref}
      style={{
        backgroundColor: "#F5F4F0",
        padding: "clamp(80px, 10vw, 160px) 0",
        borderBottom: "1px solid rgba(17,17,16,0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-32"
        >
          {/* Left — label */}
          <motion.div variants={itemVariants} className="md:w-[160px] flex-shrink-0">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "1px",
                  backgroundColor: "#BA7517",
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "#111110",
                  opacity: 0.4,
                  textTransform: "uppercase",
                }}
              >
                — 02
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "#111110",
                  opacity: 0.4,
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Sobre
              </span>
            </div>
          </motion.div>

          {/* Right — manifesto + stats */}
          <div className="flex-1">
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(20px, 2.2vw, 30px)",
                fontWeight: 400,
                lineHeight: "1.55",
                color: "#111110",
                maxWidth: "680px",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Somos uma agência de software que não terceiriza e não entrega pela metade.
              Trabalhamos com um número limitado de clientes, com foco total em resultado.
              Cada projeto é tratado como se fosse o único — porque, enquanto dura, é.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-px mt-14 md:mt-20"
              style={{
                borderTop: "1px solid rgba(17,17,16,0.1)",
              }}
            >
              {[
                { number: "47+", label: "Projetos entregues" },
                { number: "100%", label: "Dos clientes voltaram" },
                { number: "3 anos", label: "De mercado" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  style={{
                    flex: 1,
                    padding: "32px 0",
                    borderRight: i < 2 ? "1px solid rgba(17,17,16,0.1)" : "none",
                    paddingRight: i < 2 ? "48px" : "0",
                    paddingLeft: i > 0 ? "48px" : "0",
                  }}
                  className="border-r-0 sm:border-r last:border-r-0"
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(32px, 4vw, 52px)",
                      fontWeight: 700,
                      color: "#111110",
                      letterSpacing: "-0.03em",
                      lineHeight: "1",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#111110",
                      opacity: 0.45,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: "8px",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
