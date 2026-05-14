import { useState } from "react";
import { motion } from "motion/react";

export function LandingPageSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const plans = [
    {
      num: "01",
      title: "Essencial",
      price: "R$ 497",
      delivery: "Entrega em 3–5 dias úteis",
      items: [
        "Template customizado com identidade visual",
        "Botão de WhatsApp direto",
        "Formulário de contato simples",
        "Versão responsiva para mobile",
        "2 rodadas de revisão inclusas",
      ],
    },
    {
      num: "02",
      title: "Profissional",
      price: "R$ 897",
      delivery: "Entrega em 7–10 dias úteis",
      items: [
        "Tudo do Essencial",
        "Design semi-customizado",
        "Estrutura de copy orientada à conversão",
        "Pixel do Meta configurado",
        "Integração de WhatsApp aprimorada",
        "2 rodadas de revisão inclusas",
      ],
    },
    {
      num: "03",
      title: "Elite",
      price: "R$ 1.497",
      delivery: "Entrega em 12–15 dias úteis",
      items: [
        "Tudo do Profissional",
        "Bot de WhatsApp com fluxo automatizado",
        "Qualificação de leads via mensagem",
        "2 rodadas de revisão inclusas",
      ],
    },
  ];

  return (
<section id="landingpage" className="bg-[#F5F4F0] py-24 lg:py-28">
  <div className="mx-auto max-w-6xl px-6 lg:px-8">
    <div className="max-w-3xl">
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
          Landing Page
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
        Tabela de serviços
      </h2>
      <p className="mt-6 text-[15px] font-light text-[#111110] opacity-55 max-w-[320px]">
        Planos, descrições e valores para produtos de alta conversão. Cada landing page é pensada para acelerar vendas diretas, captar leads qualificados e garantir presença digital com identidade.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-8">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.title}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          animate={{
            y: hovered === i ? -8 : 0,
            scale: hovered === i ? 1.02 : 1,
          }}
          className={`relative overflow-hidden transition-all duration-300 px-8 py-12 md:px-10 md:py-14 rounded-xl border-2 ${
            i === 1
              ? 'border-[#BA7517] bg-gradient-to-br from-[#BA7517]/5 to-transparent shadow-2xl shadow-[#BA7517]/20'
              : 'border-[#11111015] bg-white hover:border-[#11111030]'
          }`}
          style={{
            backgroundColor: hovered === i && i !== 1 ? "#f9f8f5" : undefined,
          }}
        >
          {/* Badge - Most Popular */}
          {i === 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-3 left-1/2 transform -translate-x-1/2"
            >
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#BA7517] to-[#d4940f] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                <span>⭐</span>
                <span>MAIS POPULAR</span>
              </div>
            </motion.div>
          )}

          {/* Corner Accent */}
          {i === 1 && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#BA7517]/10 to-transparent rounded-bl-full" />
          )}

          <div className="relative z-10">
            {/* Price Section */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-2 ${
                i === 1 ? 'text-[#BA7517]' : 'text-[#111110]'
              }`}>
                {plan.title}
              </h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className={`text-4xl font-black ${
                  i === 1 ? 'text-[#BA7517]' : 'text-[#111110]'
                }`}>
                  {plan.price}
                </span>
                {i === 0 && <span className="text-sm text-[#11111066]">entrada</span>}
              </div>
              <p className={`text-sm font-medium ${
                i === 1 ? 'text-[#BA7517]/80' : 'text-[#11111080]'
              }`}>
                ⏱️ {plan.delivery}
              </p>
            </div>

            {/* Divider */}
            <div className={`h-px mb-8 ${
              i === 1 ? 'bg-[#BA7517]/30' : 'bg-[#11111010]'
            }`} />

            {/* Features List */}
            <ul className="space-y-3.5 mb-10">
              {plan.items.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <motion.span
                    animate={{ scale: hovered === i ? 1.2 : 1 }}
                    className={`mt-1.5 inline-flex h-2 w-2 rounded-full shrink-0 ${
                      i === 1 ? 'bg-[#BA7517]' : 'bg-[#BA7517]/60'
                    }`}
                  />
                  <span className={`text-[14px] leading-relaxed ${
                    i === 1 ? 'text-[#111110] font-medium' : 'text-[#111110cc]'
                  }`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.button
              animate={{
                backgroundColor: hovered === i ? "#BA7517" : (i === 1 ? "#BA7517" : "#f5f4f0"),
                color: hovered === i ? "#ffffff" : (i === 1 ? "#ffffff" : "#BA7517"),
              }}
              className={`w-full py-3.5 px-6 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 border-2 flex items-center justify-center gap-2 ${
                i === 1
                  ? 'border-[#BA7517] bg-[#BA7517] text-white hover:shadow-lg hover:shadow-[#BA7517]/40'
                  : 'border-[#BA7517] hover:bg-[#BA7517] hover:text-white hover:shadow-lg'
              }`}
            >
              <span>Começar agora</span>
              <motion.span animate={{ x: hovered === i ? 5 : 0 }}>→</motion.span>
            </motion.button>

            {/* Comparison Note */}
            {i !== 1 && (
              <p className="text-center text-xs text-[#11111066] mt-4">
                {i === 0 ? "Ótimo para começar" : "Máximo ROI garantido"}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>
  );
}
  

