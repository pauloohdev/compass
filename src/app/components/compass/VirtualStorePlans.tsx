import { useState } from "react";
import { motion } from "motion/react";

export function VirtualStorePlans() {
  const [hovered, setHovered] = useState<number | null>(null);

  const plans = [
    {
      num: "01",
      title: "Profissional",
      price: "R$ 1.497",
      delivery: "Entrega em 15-20 dias úteis",
      items: [
        "Plataforma Nuvemshop ou WooCommerce",
        "Até 30 produtos cadastrados",
        "Design semi-customizado",
        "Frete automático configurado",
        "Pixel do Meta configurado",
        "Checkout otimizado para conversão",
        "Botão de WhatsApp",
        "Versão responsiva para mobile",
      ],
    },
    {
      num: "02",
      title: "Elite",
      price: "R$ 2.497",
      delivery: "Entrega em 20-25 dias úteis",
      items: [
        "Tudo do Profissional",
        "Até 50 produtos cadastrados",
        "Bot de recuperação de carrinho abandonado",
        "Notificações automáticas de pedido",
        "Google Analytics configurado",
      ],
    },
  ];

  return (
    <section id="virtual-store" className="bg-white py-24 lg:py-28">
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
              Loja Virtual
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
            E-commerce completo para vender produtos online com pagamento integrado.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative overflow-hidden transition-colors duration-300 px-10 py-16 md:px-14 md:py-20 border ${
                i === 0 ? 'ring-2 ring-[#BA7517] ring-opacity-50 shadow-lg shadow-[#BA7517]/20' : 'border-[#11111010]'
              }`}
              style={{
                backgroundColor: hovered === i ? "#111110" : "transparent",
                ...(i === 0 && !hovered ? { boxShadow: '0 0 20px rgba(186, 117, 23, 0.3)' } : {}),
              }}
            >
              {/* Recommended Badge for Profissional */}
              {i === 0 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#BA7517] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Mais Popular
                </div>
              )}

              {/* Accent Line */}
              <motion.div
                animate={{ opacity: hovered === i ? 1 : 0 }}
                className="absolute top-0 left-0 w-[3px] h-full bg-[#BA7517]"
              />

              <span className={`block mb-10 text-[11px] font-medium tracking-widest uppercase transition-colors ${hovered === i ? "text-[#f5f4f04d]" : "text-[#11111040]"}`}>
                {plan.num}
              </span>

              <h3 className={`text-2xl font-semibold tracking-tight mb-4 transition-colors ${hovered === i ? "text-[#F5F4F0]" : "text-[#111110]"}`}>
                {plan.title}
              </h3>

              <div className={`text-3xl font-semibold tracking-tight mb-2 transition-colors ${hovered === i ? "text-[#F5F4F0]" : "text-[#111110]"}`}>
                {plan.price}
              </div>
              <p className={`text-[13px] font-medium uppercase tracking-[0.2em] mb-6 transition-colors ${hovered === i ? "text-[#f5f4f099]" : "text-[#11111080]"}`}>
                {plan.delivery}
              </p>

              <ul className={`space-y-3 text-[14px] leading-relaxed mb-8 transition-colors ${hovered === i ? "text-[#f5f4f099]" : "text-[#111110cc]"}`}>
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#BA7517]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full flex items-center justify-center gap-2 text-sm font-medium transition-all border rounded-full py-3 px-6 hover:bg-[#BA7517] hover:text-white hover:border-[#BA7517] ${hovered === i ? "border-[#f5f4f033] text-[#f5f4f080]" : "border-[#11111040] text-[#11111066]"}`}>
                <span>Contratar agora</span>
                <motion.span animate={{ x: hovered === i ? 5 : 0 }}>→</motion.span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
