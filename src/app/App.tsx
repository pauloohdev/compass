import { NavBar } from "./components/compass/NavBar";
import { HeroSection } from "./components/compass/HeroSection";
import { MarqueeStrip } from "./components/compass/MarqueeStrip";
import { AboutSection } from "./components/compass/AboutSection";
import { ServicesSection } from "./components/compass/ServicesSection";
import { ProjectsSection } from "./components/compass/ProjectsSection";
import { ProcessSection } from "./components/compass/ProcessSection";
import { CTASection } from "./components/compass/CTASection";
import { Footer } from "./components/compass/Footer";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#F5F4F0",
        overflowX: "hidden",
      }}
    >
      {/* 01 — Navigation */}
      <NavBar />

      {/* 02 — Hero */}
      <HeroSection />

      {/* 03 — Marquee strip */}
      <MarqueeStrip />

      {/* 04 — Sobre / Manifesto */}
      <AboutSection />

      {/* 05 — Serviços */}
      <ServicesSection />

      {/* 06 — Projetos selecionados */}
      <ProjectsSection />

      {/* 07 — Como trabalhamos */}
      <ProcessSection />

      {/* 08 — CTA Final / Contato */}
      <CTASection />

      {/* 09 — Footer */}
      <Footer />
    </div>
  );
}
