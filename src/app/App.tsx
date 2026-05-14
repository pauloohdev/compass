import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompassNeedleCursor } from "./components/compass/CompassNeedleCursor";
import { NavBar } from "./components/compass/NavBar";
import { HeroSection } from "./components/compass/HeroSection";
import { AboutSection } from "./components/compass/AboutSection";
import { MarqueeStrip } from "./components/compass/MarqueeStrip";
import { ServicesSection } from "./components/compass/ServicesSection";
import { LandingPageSection } from "./components/compass/Landingpage";
import { VirtualStorePlans } from "./components/compass/VirtualStorePlans";
import { InstitutionalSitePlans } from "./components/compass/InstitutionalSitePlans";
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

function VirtualStore() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#F5F4F0",
      }}
    >
      <CompassNeedleCursor />
      <NavBar />
      <VirtualStorePlans />
      <Footer />
    </div>
  );
}

function InstitutionalSite() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#F5F4F0",
      }}
    >
      <CompassNeedleCursor />
      <NavBar />
      <InstitutionalSitePlans />
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
        <Route path="/virtual-store" element={<VirtualStore />} />
        <Route path="/institutional-site" element={<InstitutionalSite />} />
      </Routes>
    </BrowserRouter>
  );
} 