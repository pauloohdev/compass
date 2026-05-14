import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { CompassIcon } from "./CompassIcon";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setIsScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  const navLinks = [
    { label: "Serviços", href: "/#servicos" },
    { label: "Trabalhos", href: "/#projetos" },
    { label: "Contato", href: "/#contato" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? "rgba(245, 244, 240, 0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(30px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(17,17,16,0.05)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-[80px]">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group hover:opacity-70 transition-opacity">
              <CompassIcon size={24} animated />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#111110",
                  textTransform: "uppercase",
                }}
              >
                Compass
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    color: "#111110",
                  }}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#BA7517] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="/#contato"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: "#F5F4F0",
                  backgroundColor: "#BA7517",
                  borderRadius: "4px",
                  padding: "10px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                className="hover:bg-[#111110] hover:shadow-lg"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>Iniciar projeto</span>
                <span className="text-sm">→</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:opacity-70 transition-opacity"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} color="#111110" /> : <Menu size={22} color="#111110" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        className="fixed top-[80px] left-0 right-0 z-40 md:hidden"
      >
        <div
          style={{
            backgroundColor: "rgba(245, 244, 240, 0.98)",
            backdropFilter: "blur(30px)",
            borderBottom: "1px solid rgba(17,17,16,0.05)",
            padding: "32px 24px 28px",
          }}
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#111110",
                }}
                className="opacity-70 active:opacity-100"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#11111010]">
              <a
                href="/#contato"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#F5F4F0",
                  backgroundColor: "#BA7517",
                  borderRadius: "4px",
                  padding: "12px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Iniciar projeto</span>
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
