import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CompassRose } from "./CompassIcon";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contato"
      ref={ref}
      style={{
        backgroundColor: "#111110",
        padding: "clamp(100px, 14vw, 200px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background compass watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <CompassRose
          size={700}
          color="#F5F4F0"
          accentColor="#BA7517"
          opacity={0.04}
        />
      </div>

      <div
        className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20 relative z-10"
        style={{ textAlign: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex items-center justify-center gap-3 mb-8"
          >
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
              Vamos conversar
            </span>
            <div style={{ width: "24px", height: "1px", backgroundColor: "#BA7517" }} />
          </div>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 9vw, 120px)",
              letterSpacing: "-0.04em",
              color: "#F5F4F0",
              lineHeight: "0.95",
              margin: "0 auto 28px",
              maxWidth: "900px",
            }}
          >
            Pronto para
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(245,244,240,0.4)" }}>
              crescer?
            </span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              fontWeight: 300,
              color: "rgba(245,244,240,0.45)",
              lineHeight: "1.65",
              margin: "0 auto 52px",
              maxWidth: "420px",
            }}
          >
            Conte-nos sobre o seu projeto. Respondemos em até 24 horas com uma proposta inicial.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:ola@compassstudio.com.br"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "#111110",
                backgroundColor: "#F5F4F0",
                borderRadius: "100px",
                padding: "16px 40px",
                display: "inline-block",
                letterSpacing: "0.01em",
                border: "1px solid #F5F4F0",
                transition: "all 0.25s ease",
              }}
              className="hover:bg-[#BA7517] hover:border-[#BA7517] hover:text-white transition-all duration-250"
            >
              Iniciar projeto →
            </a>
            <a
              href="https://wa.me/5511999999999"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                fontWeight: 400,
                color: "rgba(245,244,240,0.6)",
                backgroundColor: "transparent",
                borderRadius: "100px",
                padding: "16px 40px",
                display: "inline-block",
                letterSpacing: "0.01em",
                border: "1px solid rgba(245,244,240,0.15)",
                transition: "all 0.25s ease",
              }}
              className="hover:border-[rgba(245,244,240,0.4)] hover:text-[#F5F4F0] transition-all duration-250"
            >
              WhatsApp
            </a>
          </div>

          {/* Email */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(245,244,240,0.25)",
              letterSpacing: "0.08em",
              marginTop: "40px",
            }}
          >
            ola@compassstudio.com.br
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
