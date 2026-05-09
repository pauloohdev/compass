import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const projects = [
  {
    id: 1,
    name: "Velório Digital",
    category: "E-commerce · Moda",
    year: "2024",
    desc: "Loja virtual completa para marca de moda alternativa com mais de 300 SKUs e checkout personalizado.",
    img: "https://images.unsplash.com/photo-1648134859177-66e35b61e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGFnZSUyMG1pbmltYWwlMjBkZXNpZ258ZW58MXx8fHwxNzc4MzEwNzg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: 2,
    name: "Aurum Finance",
    category: "SaaS · Fintech",
    year: "2024",
    desc: "Plataforma de gestão financeira para pequenas empresas com dashboard analítico em tempo real.",
    img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkYXJrfGVufDF8fHx8MTc3ODMxMDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
  },
  {
    id: 3,
    name: "Lapônia Studio",
    category: "Institucional · Branding",
    year: "2023",
    desc: "Site institucional para estúdio de arquitetura premiado em São Paulo.",
    img: "https://images.unsplash.com/photo-1648134859175-78b41b4db186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwcGxhdGZvcm0lMjBsYW5kaW5nJTIwcGFnZSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzc4MzEwNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="projetos"
      ref={ref}
      style={{
        backgroundColor: "#111110",
        padding: "clamp(80px, 10vw, 160px) 0",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div>
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
                Projetos selecionados
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 64px)",
                letterSpacing: "-0.03em",
                color: "#F5F4F0",
                lineHeight: "1.05",
                margin: 0,
              }}
            >
              Trabalhos
              <br />
              recentes.
            </h2>
          </div>
          <a
            href="#contato"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(245,244,240,0.45)",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.2s",
            }}
            className="hover:text-[#F5F4F0] transition-colors"
          >
            Ver todos os projetos →
          </a>
        </motion.div>

        {/* Featured project */}
        {projects.filter(p => p.featured).map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              marginBottom: "2px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "2px",
              cursor: "default",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden" }}>
              <ImageWithFallback
                src={project.img}
                alt={project.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.8s ease",
                  transform: hoveredId === project.id ? "scale(1.03)" : "scale(1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(17,17,16,0.4)",
                  transition: "background-color 0.4s ease",
                  ...(hoveredId === project.id ? { backgroundColor: "rgba(17,17,16,0.2)" } : {}),
                }}
              />
              {/* Project info overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(24px, 3vw, 48px)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      color: "rgba(245,244,240,0.5)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(28px, 3.5vw, 48px)",
                      fontWeight: 700,
                      color: "#F5F4F0",
                      letterSpacing: "-0.03em",
                      margin: 0,
                    }}
                  >
                    {project.name}
                  </h3>
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "rgba(245,244,240,0.4)",
                    fontWeight: 300,
                  }}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Two smaller projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-px">
          {projects.filter(p => !p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ position: "relative", overflow: "hidden", cursor: "default" }}
            >
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <ImageWithFallback
                  src={project.img}
                  alt={project.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s ease",
                    transform: hoveredId === project.id ? "scale(1.04)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: hoveredId === project.id ? "rgba(17,17,16,0.25)" : "rgba(17,17,16,0.45)",
                    transition: "background-color 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "clamp(20px, 2.5vw, 36px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      color: "rgba(245,244,240,0.5)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 700,
                      color: "#F5F4F0",
                      letterSpacing: "-0.025em",
                      margin: 0,
                    }}
                  >
                    {project.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
