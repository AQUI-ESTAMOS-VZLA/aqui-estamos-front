import Link from "next/link";

// Landing page — redesign based on the Figma file "Front-UI_Aqui-Estamos".
// Editorial layout: white hero → flag stripe → navy action/content sections →
// full-bleed photography → cream child-protection block → black footer.
// Desktop matches Figma (1440); mobile is a responsive adaptation.

const IG = "https://www.instagram.com/aqui.estamos.vnzl";

function ArrowCircle() {
  return (
    <svg className="lp-arrowc" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="21" fill="none" strokeWidth="1.5" />
      <path d="M15 22h13M22 16l6 6-6 6" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ACTIONS = [
  {
    href: "/busqueda",
    label: "Buscar a una persona",
    icon: (
      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
    ),
  },
  {
    href: "/subir-registro",
    label: "Añadir un registro",
    icon: (
      <path d="M9 3l-1.83 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    ),
  },
  {
    href: "/voluntario",
    label: "Quiero ser voluntario",
    icon: <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4z" />,
  },
  {
    href: "/verificar",
    label: "Verificar Voluntario",
    icon: (
      <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
    ),
  },
];

const STEPS = [
  {
    title: "Documentación responsable",
    desc: "Los voluntarios autorizados recopilan información siguiendo los protocolos establecidos por Aquí Estamos.",
  },
  {
    title: "Verificación",
    desc: "Cada registro es revisado por los equipos de coordinación antes de incorporarse al sistema.",
  },
  {
    title: "Búsqueda segura",
    desc: "Las personas que buscan a un familiar pueden aportar datos descriptivos y, cuando corresponda, una fotografía de referencia. La plataforma analiza la información disponible para determinar si existe una posible coincidencia.",
  },
  {
    title: "Intermediación institucional",
    desc: "Cuando se identifica una posible coincidencia, la plataforma no revela la identidad ni la ubicación de la persona registrada. El caso es derivado al equipo o institución responsable para realizar el proceso de verificación correspondiente.",
  },
];

export default function Home() {
  return (
    <main className="lp">
      {/* ---------------- Hero ---------------- */}
      <header className="lp-hero">
        <div className="lp-inner">
          <div className="lp-hero-top">
            <Link href="/" className="lp-brand">
              <img src="/assets/figma/logo-shield.png" alt="" />
              <span>Aquí Estamos</span>
            </Link>
            <Link href="/en" className="lp-lang" hrefLang="en">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.6a15.7 15.7 0 0 0-1.2-3.1A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.4 2.5 1.8 4h-3.6c.4-1.5 1-2.8 1.8-4zM4.3 14a7.8 7.8 0 0 1 0-4h3a17.9 17.9 0 0 0 0 4h-3zm.8 2h2.6c.3 1.1.7 2.1 1.2 3.1A8 8 0 0 1 5.1 16zm2.6-8H5.1a8 8 0 0 1 3.8-3.1A15.7 15.7 0 0 0 7.7 8zM12 20c-.8-1.2-1.4-2.5-1.8-4h3.6c-.4 1.5-1 2.8-1.8 4zm2.2-6H9.8a15.9 15.9 0 0 1 0-4h4.4a15.9 15.9 0 0 1 0 4zm.3 5.1c.5-1 .9-2 1.2-3.1h2.6a8 8 0 0 1-3.8 3.1zM16.7 14a17.9 17.9 0 0 0 0-4h3a7.8 7.8 0 0 1 0 4h-3z" />
              </svg>
              Translate to English
            </Link>
          </div>

          <div className="lp-hero-main">
            <p className="lp-eyebrow">Red Ciudadana</p>
            <h1 className="lp-title">Aquí Estamos Venezuela</h1>
          </div>

          <div className="lp-hero-foot">
            <p className="lp-lead">
              Red Ciudadana para la Localización Segura de Personas durante
              Emergencias.
            </p>
            <p className="lp-sub">
              Aquí Estamos no pertenece a ningún organismo oficial. Somos una
              iniciativa ciudadana, independiente, colaborativa y sin fines de
              lucro.
            </p>
          </div>
        </div>
        {/* Flag stripe pinned to the bottom of the hero slide */}
        <div className="lp-stripe" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      {/* ---------------- Actions (navy) ---------------- */}
      <section className="lp-section lp-navy lp-actions-section">
        <div className="lp-inner">
          <ul className="lp-actions">
            {ACTIONS.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="lp-action">
                  <span className="lp-action-ic">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {a.icon}
                    </svg>
                  </span>
                  <span className="lp-action-label">{a.label}</span>
                  <ArrowCircle />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- ¿Qué hacemos? (navy) ---------------- */}
      <section className="lp-section lp-navy">
        <div className="lp-inner lp-split">
          <div className="lp-media">
            <img src="/assets/figma/foto-que-hacemos.jpg" alt="Emergencia en Venezuela" loading="lazy" />
          </div>
          <div className="lp-body">
            <p className="lp-eyebrow lp-eyebrow-light">Sobre Nosotros</p>
            <h2 className="lp-h2">¿Qué hacemos?</h2>
            <p>
              Aquí Estamos es una iniciativa ciudadana, independiente y sin fines
              de lucro que desarrolla una red de colaboración para apoyar la
              localización de personas afectadas por emergencias mediante un
              sistema seguro de registro, verificación e intermediación de
              información.
            </p>
            <p>
              Nuestro propósito es ayudar a reunir familias, reducir la
              desinformación y facilitar que la información llegue de manera
              organizada a quienes tienen la responsabilidad de proteger a las
              personas afectadas.
            </p>
            <Link href="/voluntario" className="lp-cta">
              <span>Únete como voluntario</span>
              <ArrowCircle />
            </Link>
          </div>
        </div>
      </section>

      {/* Full-bleed photo */}
      <div className="lp-fullbleed">
        <img src="/assets/figma/foto-rescate.jpg" alt="Rescate humanitario" loading="lazy" />
      </div>

      {/* ---------------- ¿Cómo funciona? (navy, centered) ---------------- */}
      <section className="lp-section lp-navy">
        <div className="lp-inner">
          <div className="lp-center">
            <p className="lp-eyebrow lp-eyebrow-light">Paso a Paso</p>
            <h2 className="lp-h2">¿Cómo funciona?</h2>
          </div>
          <div className="lp-steps">
            {STEPS.map((s, i) => (
              <div className="lp-step" key={s.title}>
                <div className="lp-step-head">
                  <span className="lp-step-n">{i + 1}.</span>
                  <h3>{s.title}</h3>
                </div>
                <p className="lp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner (single composite image) */}
      <div className="lp-banner">
        <img
          src="/assets/figma/banner-registro.jpg"
          alt="Aquí Estamos · Red Ciudadana de Registro Audiovisual para Emergencias. Registramos para ubicar. Protegemos para reunir."
          loading="lazy"
        />
      </div>

      {/* ---------------- Nuestra Visión (white) ---------------- */}
      <section className="lp-section lp-white">
        <div className="lp-inner lp-split lp-split-reverse">
          <div className="lp-body">
            <p className="lp-eyebrow">Conócenos</p>
            <h2 className="lp-h2 lp-h2-dark">Nuestra Visión</h2>
            <p>
              Las emergencias pueden separar familias en cuestión de minutos.
              Niños, personas mayores, pacientes hospitalizados, personas con
              discapacidad o personas con dificultades para comunicarse pueden
              quedar temporalmente sin posibilidad de informar dónde se
              encuentran.
            </p>
            <p>
              Creemos que la tecnología puede ayudar a encontrarlas sin que ello
              implique exponer públicamente su identidad. Por eso desarrollamos
              una infraestructura de intermediación humanitaria que prioriza la
              protección de las personas por encima de la difusión de
              información.
            </p>
          </div>
          <div className="lp-media">
            <img src="/assets/figma/foto-vision.jpg" alt="Comunidad costera de Venezuela" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ---------------- Protección de menores (cream) ---------------- */}
      <section className="lp-section lp-cream">
        <div className="lp-inner lp-split">
          <div className="lp-body">
            <h2 className="lp-h2 lp-h2-dark">
              Protección de Niños, Niñas y Adolescentes y de Personas en
              Situación de Vulnerabilidad
            </h2>
            <div className="lp-doc-btns">
              <Link href="/proteccion-menores" className="lp-outline">
                <span>Leer la política completa</span>
                <ArrowCircle />
              </Link>
              <Link href="/constitucion-tecnologica" className="lp-outline">
                <span>Leer la Constitución Tecnológica</span>
                <ArrowCircle />
              </Link>
            </div>
          </div>
          <div className="lp-body">
            <p>
              La protección de las personas constituye el principio fundamental
              de Aquí Estamos. Nuestra plataforma está diseñada para evitar la
              exposición pública de la identidad de las personas registradas. No
              publica listados de víctimas, galerías de fotografías, perfiles
              individuales ni ubicaciones.
            </p>
            <p>
              Como medida institucional vigente, Aquí Estamos no realiza
              registros audiovisuales de niños, niñas y adolescentes ni incorpora
              información que permita su identificación directa o indirecta,
              hasta contar con protocolos especializados, asesoría jurídica y
              acuerdos con las instituciones competentes. Esta decisión forma
              parte de nuestro compromiso con la protección de la infancia y con
              el desarrollo responsable de tecnología humanitaria.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Independencia (navy) ---------------- */}
      <section className="lp-section lp-navy">
        <div className="lp-inner lp-split lp-split-reverse">
          <div className="lp-body">
            <h2 className="lp-h2">Independencia</h2>
            <p>
              Aquí Estamos no pertenece a ningún organismo oficial. Somos una
              iniciativa ciudadana, independiente, colaborativa y sin fines de
              lucro.
            </p>
          </div>
          <div className="lp-media">
            <img src="/assets/figma/foto-independencia.jpg" alt="Mapa de Venezuela" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ---------------- Footer (black) ---------------- */}
      <footer className="lp-footer">
        <div className="lp-inner">
          <div className="lp-footer-top">
            <span className="lp-footer-brand">AQUÍ ESTAMOS VENEZUELA</span>
            <div className="lp-footer-right">
              <span>© 2026 Aquí Estamos Venezuela. Todos los derechos reservados.</span>
              <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.21 8.48 3.2 8.85 3.2 12s.01 3.52.07 4.76c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.38-.32-1.7a2.9 2.9 0 0 0-.68-1.06 2.9 2.9 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-1.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
                </svg>
              </a>
            </div>
          </div>
          <nav className="lp-footer-links" aria-label="Enlaces legales">
            <Link href="/privacidad">Política de Búsqueda y Privacidad</Link>
            <span aria-hidden="true">·</span>
            <Link href="/proteccion-menores">
              Política de Protección de Niños, Niñas y Adolescentes
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/constitucion-tecnologica">Constitución Tecnológica</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
