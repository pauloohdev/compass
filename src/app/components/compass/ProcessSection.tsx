import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CompassIcon } from "./CompassIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const steps = [
  { num: "01", title: "Diagnóstico", desc: "Entendemos profundamente o negócio, o público-alvo e os objetivos antes de escrever uma linha de código." },
  { num: "02", title: "Estratégia", desc: "Definimos arquitetura, tecnologias, fluxos e KPIs que vão guiar todo o processo de criação." },
  { num: "03", title: "Execução", desc: "Design de alta fidelidade e desenvolvimento iterativo com revisões semanais e entregas parciais." },
  { num: "04", title: "Entrega", desc: "Deploy, testes, treinamento e suporte pós-lançamento. O projeto não termina no go-live." },
];

const easeSection = [0.22, 1, 0.36, 1] as const;
const SLIDE_X = 40;

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const boatRef = useRef<SVGGElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current || !boatRef.current || !containerRef.current) return;

    const length = pathRef.current.getTotalLength();
    gsap.set(progressPathRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      // Criamos a Timeline que será controlada pelo Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // Trava quando o topo da seção encosta no topo da tela
          end: "+=200%",         // Duração do "trava": rola 2x a altura da tela antes de soltar
          scrub: 1,              // Suavidade do movimento do barco
          pin: true,             // O SEGREDO: Trava a seção
          anticipatePin: 1,
        },
      });

      // Animação sincronizada do barco e da linha
      tl.to(boatRef.current, {
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        ease: "none",
      })
      .to(progressPathRef.current, {
        strokeDashoffset: 0,
        ease: "none"
      }, 0); // 0 garante que começam juntos
    });

    return () => ctx.revert();
  }, []);

  // Variants para o Staggering inicial (quando a seção entra no viewport)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -SLIDE_X },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeSection } },
  };

  return (
    <div ref={containerRef} className="bg-[#F5F4F0]">
      <section
        ref={sectionRef}
        id="processo"
        className="relative h-screen w-full flex flex-col justify-center overflow-hidden"
        style={{ borderTop: "1px solid rgba(17,17,16,0.08)" }}
      >
        {/* Camada do Path (Atrás dos cards) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
            <path
              ref={pathRef}
              d="M-50,450 C250,450 450,650 720,650 S1190,450 1500,450"
              stroke="#BA7517"
              strokeOpacity="0.05"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <path
              ref={progressPathRef}
              d="M-50,450 C250,450 450,650 720,650 S1190,450 1500,450"
              stroke="#BA7517"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <g ref={boatRef}>
              <circle r="5" fill="#BA7517" />
              <circle r="9" stroke="#BA7517" strokeOpacity="0.2" strokeWidth="1" />
            </g>
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20 relative z-10 w-full">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeSection }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[#BA7517]" />
              <span className="uppercase tracking-[0.18em] font-medium text-[11px] text-[#BA7517]">Como trabalhamos</span>
            </div>
            <h2 className="font-bold leading-[1.05] text-[clamp(32px,4vw,56px)] tracking-[-0.03em] text-[#111110]">
              Método, <br /> não improviso.
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative border-r-0 md:border-r last:border-r-0 border-b md:border-b-0"
                style={{
                  padding: "clamp(24px, 2vw, 40px)",
                  borderColor: "rgba(17,17,16,0.08)",
                  zIndex: i % 2 === 0 ? 20 : 5,
                }}
              >
                {/* Backdrop sutil para destacar sobre o path */}
                <div className={`absolute inset-0 z-[-1] ${i % 2 === 0 ? 'bg-[#F5F4F0]/70 backdrop-blur-sm' : ''}`} />

                <div className="flex items-center gap-3 uppercase font-medium text-[11px] tracking-[0.18em] mb-8 text-[rgba(17,17,16,0.3)]">
                  {step.num}
                  {i < 3 && <div className="hidden lg:block flex-1 h-[1px] bg-[rgba(17,17,16,0.1)]" />}
                </div>

                <h3 className="font-semibold text-[20px] mb-3 text-[#111110] tracking-tight">{step.title}</h3>
                <p className="font-light text-[14px] leading-[1.6] text-[rgba(17,17,16,0.6)]">{step.desc}</p>
                
                {i === 1 && (
                  <div className="hidden lg:block absolute -right-[13px] top-8 z-10">
                    <CompassIcon size={26} color="#111110" accentColor="#BA7517" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}