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
        // Removido o overflowX daqui para permitir que o sticky funcione globalmente
      }}
    >
      <NavBar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />

      {/* Seção com efeito de trava (Sticky) */}
      <ServicesSection />

      <ProjectsSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </div>
  );
} 