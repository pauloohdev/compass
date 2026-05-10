import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CompassRose } from "./CompassIcon";

/** Máscara colapsada na diagonal (↘); abre para o retângulo inteiro. */
const CLIP_HIDDEN =
  "polygon(100% 0, 100% 0, 0 100%, 0 100%)" as const;
const CLIP_FULL =
  "polygon(0 0, 100% 0, 100% 100%, 0 100%)" as const;

const easeReveal = [0.22, 1, 0.36, 1] as const;

/** Pausa após a seção entrar em vista, para o utilizador perceber o início da revelação. */
const REVEAL_DELAY_S = 0.32;
const CLIP_DURATION_S = 1.28;
const CONTENT_DURATION_S = 1.48;
/** Conteúdo acompanha a máscara com um ligeiro offset (paralaxe). */
const CONTENT_DELAY_OFFSET_S = 0.06;

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
          initial={{ clipPath: CLIP_HIDDEN }}
          animate={isInView ? { clipPath: CLIP_FULL } : {}}
          transition={{
            duration: CLIP_DURATION_S,
            ease: easeReveal,
            delay: REVEAL_DELAY_S,
          }}
          style={{
            willChange: "clip-path",
          }}
        >
          <motion.div
            initial={{ scale: 1.06, x: 22, y: 14 }}
            animate={
              isInView
                ? { scale: 1, x: 0, y: 0 }
                : {}
            }
            transition={{
              duration: CONTENT_DURATION_S,
              ease: easeReveal,
              delay: REVEAL_DELAY_S + CONTENT_DELAY_OFFSET_S,
            }}
            style={{ transformOrigin: "50% 50%" }}
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
          <p
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
          </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
