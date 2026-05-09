import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const services = [
  {
    num: "01",
    title: "Landing Pages de Alta Conversão",
    desc: "Páginas construídas para transformar visitantes em clientes. Design focado em resultado, copy estratégico e performance técnica.",
    tags: ["Design", "Desenvolvimento", "CRO"],
  },
  {
    num: "02",
    title: "Lojas que Vendem de Verdade",
    desc: "E-commerces com experiência de compra fluida, integração com meios de pagamento e gestão simplificada para o lojista.",
    tags: ["E-commerce", "UX", "Integração"],
  },
  {
    num: "03",
    title: "Sites que Representam sua Marca",
    desc: "Sites institucionais que comunicam autoridade, transmitem confiança e se destacam da concorrência desde o primeiro segundo.",
    tags: ["Institucional", "Identidade", "SEO"],
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="servicos"
      ref={ref}
      style={{
        backgroundColor: "#F5F4F0",
        padding: "clamp(80px, 10vw, 160px) 0",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants}>
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
                Serviços
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
              O que
              <br />
              entregamos.
            </h2>
          </motion.div>
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "#111110",
              opacity: 0.55,
              lineHeight: "1.65",
              maxWidth: "320px",
              margin: 0,
            }}
          >
            Cada serviço é projetado para gerar resultado mensurável, não apenas para ser bonito na tela.
          </motion.p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ border: "1px solid rgba(17,17,16,0.1)" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "clamp(32px, 3vw, 52px)",
                borderRight: i < 2 ? "1px solid rgba(17,17,16,0.1)" : "none",
                cursor: "default",
                transition: "background-color 0.3s ease",
                backgroundColor: hovered === i ? "#111110" : "transparent",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle accent corner on hover */}
              <motion.div
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "3px",
                  height: "100%",
                  backgroundColor: "#BA7517",
                }}
              />

              {/* Number */}
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: hovered === i ? "rgba(245,244,240,0.3)" : "rgba(17,17,16,0.25)",
                  textTransform: "uppercase",
                  marginBottom: "clamp(28px, 3vw, 48px)",
                  transition: "color 0.3s ease",
                }}
              >
                {service.num}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  fontWeight: 600,
                  color: hovered === i ? "#F5F4F0" : "#111110",
                  lineHeight: "1.3",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  marginBottom: "16px",
                  transition: "color 0.3s ease",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: hovered === i ? "rgba(245,244,240,0.6)" : "rgba(17,17,16,0.55)",
                  lineHeight: "1.7",
                  margin: 0,
                  marginBottom: "32px",
                  transition: "color 0.3s ease",
                }}
              >
                {service.desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: hovered === i ? "rgba(245,244,240,0.5)" : "rgba(17,17,16,0.4)",
                      border: `1px solid ${hovered === i ? "rgba(245,244,240,0.2)" : "rgba(17,17,16,0.15)"}`,
                      borderRadius: "100px",
                      padding: "4px 10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow link */}
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: hovered === i ? "#BA7517" : "rgba(17,17,16,0.4)",
                  letterSpacing: "0.05em",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                <span>Saiba mais</span>
                <motion.span
                  animate={{ x: hovered === i ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
