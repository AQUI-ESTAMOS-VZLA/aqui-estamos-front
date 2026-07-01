import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Constitución Tecnológica de Aquí Estamos — Aqui Estamos Venezuela",
  description:
    "Documento fundacional (Versión 1.0): principios de una infraestructura digital humanitaria centrada en la dignidad, la privacidad y la no exposición de las personas.",
};

export default function ConstitucionTecnologica() {
  return (
    <main className="pg">
      <SiteHeader homeHref="/" switchHref="/en/technological-constitution" switchLabel="Translate to English" lang="es" />
      <div className="pg-main lp-inner">
        <div className="pg-hero">
          <p className="pg-eyebrow">Documento Fundacional</p>
          <h1 className="pg-title">Constitución Tecnológica de Aquí Estamos</h1>
          <p className="pg-lead">Versión 1.0</p>
        </div>
        <article className="doc pg-body">

      <div className="callout" role="note">
        <strong>Preámbulo.</strong> La tecnología no es el objeto de este documento; las personas lo
        son. Aquí Estamos{" "}
        <strong>
          desarrolla tecnología únicamente como un medio para proteger la dignidad, la privacidad y el
          derecho
        </strong>{" "}
        de las personas a ser localizadas sin quedar expuestas durante una emergencia.
      </div>

      <section>
        <h3><span className="num">1.</span> Declaración de intención</h3>
        <p>
          Aquí Estamos impulsa una infraestructura digital humanitaria para apoyar a instituciones
          competentes en la localización, identificación y reunificación de personas afectadas por
          emergencias, bajo un modelo de protección de datos, derechos humanos y seguridad por diseño.
        </p>
      </section>

      <section>
        <h3><span className="num">2.</span> Misión tecnológica</h3>
        <p>
          Diseñar una infraestructura humanitaria digital que facilite procesos seguros de
          identificación, reunificación y coordinación institucional, minimizando la exposición pública
          de las personas afectadas.
        </p>
      </section>

      <section>
        <h3><span className="num">3.</span> Principios fundamentales</h3>
        <ul>
          <li>Principio de seguridad, dignidad y voluntad para la persona registrada.</li>
          <li>Principio de No Exposición.</li>
          <li>Principio de Custodia Responsable.</li>
          <li>Privacidad desde el diseño.</li>
          <li>Seguridad por defecto.</li>
          <li>Minimización de datos.</li>
          <li>Separación de identidades.</li>
          <li>Divulgación mínima.</li>
          <li>Supervisión humana en decisiones críticas.</li>
          <li>
            Protección reforzada de niños, niñas, adolescentes y demás personas en situación de
            vulnerabilidad.
          </li>
        </ul>
      </section>

      <section>
        <h3><span className="num">4.</span> Derechos de las personas</h3>
        <p>
          El diseño del sistema buscará respetar el derecho a la dignidad, la privacidad, la identidad,
          la protección de datos, la no discriminación y el acceso a procedimientos seguros de
          verificación conforme al marco jurídico aplicable.
        </p>
      </section>

      <section>
        <h3><span className="num">5.</span> Compromisos institucionales</h3>
        <p>
          Aquí Estamos está diseñando sus procesos para reducir riesgos, documentar decisiones técnicas
          relevantes, revisar periódicamente sus controles de seguridad y mantener una mejora continua
          basada en evidencia y asesoría especializada.
        </p>
      </section>

      <section>
        <h3><span className="num">6.</span> Tecnología humanitaria responsable</h3>
        <p>
          No toda funcionalidad técnicamente posible debe implementarse. Toda nueva capacidad será
          evaluada considerando su impacto en los derechos de las personas, los riesgos de seguridad y
          la proporcionalidad de su uso.
        </p>
      </section>

      <section>
        <h3><span className="num">7.</span> Gobernanza tecnológica</h3>
        <p>
          La evolución del sistema contará con asesoría multidisciplinaria en protección de datos,
          ciberseguridad, derecho, respuesta humanitaria y ética tecnológica. Las decisiones
          estratégicas procurarán ser transparentes y documentadas.
        </p>
      </section>

      <section>
        <h3><span className="num">8.</span> Propiedad intelectual con propósito humanitario</h3>
        <p>
          La propiedad intelectual permanecerá en sus autores para preservar la integridad, seguridad y
          evolución del sistema. La intención es facilitar su utilización mediante licencias gratuitas o
          convenios de interés público para instituciones humanitarias, sin fines de lucro.
        </p>
      </section>

      <section>
        <h3><span className="num">9.</span> Invitación a la cooperación</h3>
        <p>
          Aquí Estamos invita a especialistas, universidades, organismos internacionales,
          organizaciones humanitarias y autoridades competentes a revisar, cuestionar y fortalecer
          continuamente esta Constitución Tecnológica.
        </p>
      </section>

      <p className="lead-rule">
        <strong>Declaración final:</strong> no aspiramos a desarrollar el sistema más grande, sino el
        más responsable posible. Creemos que una persona puede ser localizada sin convertir su
        identidad en información pública y que la confianza se construye mediante transparencia, mejora
        continua y protección efectiva de los derechos humanos.
      </p>

        </article>
      </div>
      <SiteFooter lang="es" />
    </main>
  );
}
