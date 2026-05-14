import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
  const targetRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Controle de Scroll: Começa quando o topo da seção bate no topo da tela
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transformação: Move de 0% até -65% lateralmente conforme o scroll vertical
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-27%"]);

  return (
    <section
      id="servicos"
      ref={targetRef}
      className="relative h-[300vh] bg-[#F5F4F0]" // Altura que define o tempo da trava
    >
      {/* A Janela Sticky: Fica fixa enquanto o usuário rola os 300vh */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* O Trilho Horizontal */}
        <motion.div
          style={{ x }}
          className="flex items-center gap-12 pl-10 md:pl-15 w-max"
        >

          {/* Bloco de Texto (Entra no trilho lateral) */}
          <div className="min-w-[320px] max-w-[420px] shrink-0 mr-10">
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
              }}
            >
              O que<br />entregamos.
            </h2>
            <p className="mt-6 text-[15px] font-light text-[#111110] opacity-55 max-w-[320px]">
              Cada serviço é projetado para gerar resultado mensurável, não apenas para ser bonito na tela.
            </p>
          </div>

          {/* Cards de Serviço */}
          <div className="flex gap-px border border-[#1111101a]">
            {services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="w-[80vw] sm:w-[450px] shrink-0 relative overflow-hidden transition-colors duration-300 px-10 py-16 md:px-14 md:py-20"
                style={{
                  borderRight: i < services.length - 1 ? "1px solid rgba(17,17,16,0.1)" : "none",
                  backgroundColor: hovered === i ? "#111110" : "transparent",
                }}
              >
                {/* Accent Line */}
                <motion.div
                  animate={{ opacity: hovered === i ? 1 : 0 }}
                  className="absolute top-0 left-0 w-[3px] h-full bg-[#BA7517]"
                />

                <span className={`block mb-10 text-[11px] font-medium tracking-widest uppercase transition-colors ${hovered === i ? "text-[#f5f4f04d]" : "text-[#11111040]"}`}>
                  {service.num}
                </span>

                <h3 className={`text-2xl font-semibold tracking-tight mb-4 transition-colors ${hovered === i ? "text-[#F5F4F0]" : "text-[#111110]"}`}>
                  {service.title}
                </h3>

                <p className={`text-[15px] font-light leading-relaxed mb-10 transition-colors ${hovered === i ? "text-[#f5f4f099]" : "text-[#1111108c]"}`}>
                  {service.desc}
                </p>

                <div className="flex gap-2 flex-wrap mb-10">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-medium px-3 py-1 rounded-full border transition-all ${hovered === i
                        ? "border-[#f5f4f033] text-[#f5f4f080]"
                        : "border-[#11111026] text-[#11111066]"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={i === 0 ? "/landingpage" : i === 1 ? "/virtual-store" : "#landingpage"}
                  className={`flex items-center gap-2 text-sm font-medium transition-all ${hovered === i ? "text-[#BA7517]" : "text-[#11111066]"}`}
                >
                  <span>Saiba mais</span>
                  <motion.span animate={{ x: hovered === i ? 5 : 0 }}>→</motion.span>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}