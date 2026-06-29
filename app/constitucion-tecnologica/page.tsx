import Link from 'next/link';

export const metadata = {
  title: 'Constitución Tecnológica de Aquí Estamos — Aqui Estamos Venezuela',
  description:
    'Documento fundacional (Versión 1.0): principios de una infraestructura digital humanitaria centrada en la dignidad, la privacidad y la no exposición de las personas.',
};

export default function ConstitucionTecnologica() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>Constitución Tecnológica de Aquí Estamos</h1>
      <h2>Versión 1.0 · Documento Fundacional</h2>

      <div className="alert info" role="note">
        <strong>Preámbulo.</strong> La tecnología no es el objeto de este documento; las personas lo
        son. Aquí Estamos desarrolla tecnología únicamente como un medio para proteger la dignidad, la
        privacidad y el derecho de las personas a ser localizadas sin quedar expuestas durante una
        emergencia.
      </div>

      <div className="panel">
        <h3 className="section-title">1. Declaración de intención</h3>
        <p>
          Aquí Estamos impulsa una infraestructura digital humanitaria para apoyar a instituciones
          competentes en la localización, identificación y reunificación de personas afectadas por
          emergencias, bajo un modelo de protección de datos, derechos humanos y seguridad por diseño.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">2. Misión tecnológica</h3>
        <p>
          Diseñar una infraestructura humanitaria digital que facilite procesos seguros de
          identificación, reunificación y coordinación institucional, minimizando la exposición pública
          de las personas afectadas.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">3. Principios fundamentales</h3>
        <ul className="steps">
          <li>La persona como centro del sistema.</li>
          <li>Principio de No Exposición.</li>
          <li>Principio de Custodia Responsable.</li>
          <li>Privacidad desde el diseño.</li>
          <li>Seguridad por defecto.</li>
          <li>Minimización de datos.</li>
          <li>Separación de identidades.</li>
          <li>Divulgación mínima.</li>
          <li>Resiliencia ante incidentes.</li>
          <li>Supervisión humana en decisiones críticas.</li>
          <li>
            Protección reforzada de niños, niñas, adolescentes y demás personas en situación de
            vulnerabilidad.
          </li>
        </ul>
      </div>

      <div className="panel">
        <h3 className="section-title">4. Derechos de las personas</h3>
        <p>
          El diseño del sistema buscará respetar el derecho a la dignidad, la privacidad, la identidad,
          la protección de datos, la no discriminación y el acceso a procedimientos seguros de
          verificación conforme al marco jurídico aplicable.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">5. Compromisos institucionales</h3>
        <p>
          Aquí Estamos diseñará sus procesos para reducir riesgos, documentar decisiones técnicas
          relevantes, revisar periódicamente sus controles de seguridad y mantener una mejora continua
          basada en evidencia y asesoría especializada.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">6. Tecnología humanitaria responsable</h3>
        <p>
          No toda funcionalidad técnicamente posible debe implementarse. Toda nueva capacidad será
          evaluada considerando su impacto en los derechos de las personas, los riesgos de seguridad y
          la proporcionalidad de su uso.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">7. Gobernanza tecnológica</h3>
        <p>
          La evolución del sistema contará con asesoría multidisciplinaria en protección de datos,
          ciberseguridad, derecho, respuesta humanitaria y ética tecnológica. Las decisiones
          estratégicas procurarán ser transparentes y documentadas.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">8. Propiedad intelectual con propósito humanitario</h3>
        <p>
          La propiedad intelectual permanecerá en sus autores para preservar la integridad, seguridad y
          evolución del sistema. La intención es facilitar su utilización mediante licencias gratuitas o
          convenios de interés público para instituciones humanitarias, sin fines de lucro.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">9. Invitación a la cooperación</h3>
        <p>
          Aquí Estamos invita a especialistas, universidades, organismos internacionales,
          organizaciones humanitarias y autoridades competentes a revisar, cuestionar y fortalecer
          continuamente esta Constitución Tecnológica.
        </p>
      </div>

      <p className="lead-rule">
        <strong>Declaración final:</strong> no aspiramos a desarrollar el sistema más grande, sino el
        más responsable posible. Creemos que una persona puede ser localizada sin convertir su
        identidad en información pública y que la confianza se construye mediante transparencia, mejora
        continua y protección efectiva de los derechos humanos.
      </p>

      <footer>
        <Link href="/">Volver al inicio</Link>
        &nbsp;·&nbsp;
        <Link href="/proteccion-menores">Protección de Niños, Niñas y Adolescentes</Link>
        &nbsp;·&nbsp;
        <Link href="/privacidad">Política de Búsqueda y Privacidad</Link>
      </footer>
    </main>
  );
}
