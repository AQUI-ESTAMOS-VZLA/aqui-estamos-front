import Link from "next/link";
import React from "react";

const IG = "https://www.instagram.com/aqui.estamos.vnzl";

// Shared black footer for inner pages, matching the landing redesign.
export function SiteFooter({ lang }: { lang: "es" | "en" }) {
  const es = lang === "es";
  const links: [string, string][] = es
    ? [
        ["/privacidad", "Política de Búsqueda y Privacidad"],
        ["/proteccion-menores", "Política de Protección de Niños, Niñas y Adolescentes"],
        ["/constitucion-tecnologica", "Constitución Tecnológica"],
      ]
    : [
        ["/en/privacy", "Search and Privacy Policy"],
        ["/en/child-protection", "Child and Adolescent Protection"],
        ["/en/technological-constitution", "Technological Constitution"],
      ];
  const rights = es ? "Todos los derechos reservados." : "All rights reserved.";

  return (
    <footer className="lp-footer site-footer">
      <div className="lp-inner">
        <div className="lp-footer-top">
          <span className="lp-footer-brand">AQUÍ ESTAMOS VENEZUELA</span>
          <div className="lp-footer-right">
            <span>© 2026 Aquí Estamos Venezuela. {rights}</span>
            <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.21 8.48 3.2 8.85 3.2 12s.01 3.52.07 4.76c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.38-.32-1.7a2.9 2.9 0 0 0-.68-1.06 2.9 2.9 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-1.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
              </svg>
            </a>
          </div>
        </div>
        <nav className="lp-footer-links" aria-label={es ? "Enlaces legales" : "Legal links"}>
          {links.map(([href, label], i) => (
            <React.Fragment key={href}>
              {i > 0 && <span aria-hidden="true">·</span>}
              <Link href={href}>{label}</Link>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </footer>
  );
}
