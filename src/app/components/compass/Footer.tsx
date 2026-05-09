import { CompassIcon } from "./CompassIcon";

export function Footer() {
  const navLinks = [
    { label: "Trabalhos", href: "#projetos" },
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#processo" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#F5F4F0",
        borderTop: "1px solid rgba(17,17,16,0.1)",
      }}
    >
      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 py-12 md:py-16"
        >
          {/* Wordmark */}
          <a href="#" className="flex items-center gap-2.5">
            <CompassIcon size={20} animated />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#111110",
                textTransform: "uppercase",
              }}
            >
              Compass
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.03em",
                  color: "#111110",
                  opacity: 0.5,
                  transition: "opacity 0.2s",
                }}
                className="hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Location + socials */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "#111110",
                opacity: 0.4,
                letterSpacing: "0.05em",
              }}
            >Passos, Brasil</span>
            <div style={{ display: "flex", gap: "20px" }}>
              {[
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Behance", href: "https://behance.net" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#111110",
                    opacity: 0.4,
                    letterSpacing: "0.03em",
                    transition: "opacity 0.2s",
                  }}
                  className="hover:opacity-100"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(17,17,16,0.06)",
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 300,
              color: "#111110",
              opacity: 0.3,
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} Compass Studio. Todos os direitos reservados.
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 300,
              color: "#111110",
              opacity: 0.3,
              letterSpacing: "0.05em",
            }}
          >
            CNPJ 00.000.000/0001-00
          </span>
        </div>
      </div>
    </footer>
  );
}
