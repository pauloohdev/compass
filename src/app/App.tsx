import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompassNeedleCursor } from "./components/compass/CompassNeedleCursor";
import { NavBar } from "./components/compass/NavBar";
import { HeroSection } from "./components/compass/HeroSection";
import { AboutSection } from "./components/compass/AboutSection";
import { MarqueeStrip } from "./components/compass/MarqueeStrip";
import { ServicesSection } from "./components/compass/ServicesSection";
import { LandingPageSection } from "./components/compass/Landingpage";
import { ProjectsSection } from "./components/compass/ProjectsSection";
import { ProcessSection } from "./components/compass/ProcessSection";
import { CTASection } from "./components/compass/CTASection";
import { Footer } from "./components/compass/Footer";

function Home() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#F5F4F0",
        // Removido o overflowX daqui para permitir que o sticky funcione globalmente
      }}
    >
      <CompassNeedleCursor />
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

function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#F5F4F0",
      }}
    >
      <CompassNeedleCursor />
      <NavBar />
      <LandingPageSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
} 