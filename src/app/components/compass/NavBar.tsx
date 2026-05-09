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
    { label: "Trabalhos", href: "#projetos" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? "rgba(245, 244, 240, 0.85)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(17,17,16,0.08)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20">
          <div className="flex items-center justify-between h-[72px]">
            {/* Wordmark */}
            <a href="#" className="flex items-center gap-2.5 group">
              <CompassIcon size={22} animated />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#111110",
                  textTransform: "uppercase",
                }}
              >
                Compass
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    color: "#111110",
                  }}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: "#111110",
                  border: "1px solid rgba(17,17,16,0.4)",
                  borderRadius: "100px",
                  padding: "8px 20px",
                  transition: "all 0.25s ease",
                  display: "inline-block",
                }}
                className="hover:bg-[#111110] hover:text-[#F5F4F0] hover:border-[#111110] transition-all duration-250"
              >
                Iniciar projeto →
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} color="#111110" /> : <Menu size={20} color="#111110" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        className="fixed top-[72px] left-0 right-0 z-40 md:hidden"
      >
        <div
          style={{
            backgroundColor: "rgba(245, 244, 240, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(17,17,16,0.08)",
            padding: "24px 40px 32px",
          }}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#111110",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#111110",
                border: "1px solid rgba(17,17,16,0.4)",
                borderRadius: "100px",
                padding: "10px 24px",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              Iniciar projeto →
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
