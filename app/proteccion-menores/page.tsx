import Link from 'next/link';

export const metadata = {
  title: 'Política de Protección de Niños, Niñas y Adolescentes — Aqui Estamos Venezuela',
  description:
    'Política temporal de protección de la infancia de Aquí Estamos: durante esta fase no se realizan registros audiovisuales de personas menores de edad.',
};

export default function ProteccionMenores() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>Política de Protección de Niños, Niñas y Adolescentes</h1>
      <h2>Aquí Estamos · Versión 1.0 · Vigencia inmediata</h2>

      <div className="alert info" role="note">
        <strong>Política temporal vigente.</strong> Mientras la organización desarrolla sus protocolos
        especializados y formaliza alianzas con instituciones competentes, <strong>Aquí Estamos no
        realiza registros audiovisuales de personas menores de edad</strong>. Esta medida incluye
        fotografías, videos, entrevistas, grabaciones de audio y cualquier medio que permita
        identificar directa o indirectamente a un menor.
      </div>

      <div className="panel">
        <h3 className="section-title">1. Propósito</h3>
        <p>
          Esta política establece los principios y normas que rigen la protección de niños, niñas y
          adolescentes en todas las actividades desarrolladas por Aquí Estamos. Su finalidad es
          prevenir cualquier riesgo para la seguridad, la privacidad, la dignidad y los derechos de
          los menores de edad.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">2. Principios</h3>
        <ul className="steps">
          <li>El interés superior del niño prevalece sobre cualquier otro interés.</li>
          <li>La protección de la identidad y los datos personales constituye una prioridad.</li>
          <li>La recopilación de información debe limitarse al mínimo indispensable.</li>
          <li>La actuación de todos los voluntarios debe ser ética, responsable y respetuosa.</li>
        </ul>
      </div>

      <div className="panel">
        <h3 className="section-title">3. Alcance</h3>
        <p>
          Esta política aplica a directivos, coordinadores, voluntarios, colaboradores, asesores,
          contratistas y cualquier persona que actúe en representación de Aquí Estamos.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">4. Política temporal vigente</h3>
        <p>
          Mientras la organización desarrolla sus protocolos especializados y formaliza alianzas con
          instituciones competentes, Aquí Estamos no realizará registros audiovisuales de personas
          menores de edad. Esta medida incluye fotografías, videos, entrevistas, grabaciones de audio
          y cualquier medio que permita identificar directa o indirectamente a un menor.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">5. Protección de datos</h3>
        <p>
          Los datos personales deberán tratarse bajo los principios de confidencialidad, acceso
          restringido, minimización de datos, seguridad de la información y trazabilidad. Ningún dato
          será compartido fuera de los procedimientos autorizados por la organización.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">6. Responsabilidades</h3>
        <p>
          Todo voluntario deberá conocer esta política, respetarla y firmar su aceptación antes de
          participar en actividades oficiales. Ningún voluntario podrá actuar fuera de los protocolos
          establecidos ni representar a la organización sin autorización.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">7. Uso de imágenes</h3>
        <p>
          Durante la vigencia de esta política queda prohibido registrar, almacenar, publicar o
          difundir imágenes o videos de menores de edad en nombre de Aquí Estamos. Cualquier futura
          excepción requerirá protocolos específicos, autorizaciones institucionales y los
          consentimientos legalmente exigibles.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">8. Reporte de incidentes</h3>
        <p>
          Cualquier situación que pueda comprometer la seguridad de un menor o implique un posible
          incumplimiento de esta política deberá reportarse inmediatamente a la coordinación de Aquí
          Estamos para su evaluación y documentación.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">9. Incumplimiento</h3>
        <p>
          El incumplimiento de esta política podrá ocasionar la suspensión o desvinculación inmediata
          del voluntario, sin perjuicio de las responsabilidades civiles, administrativas o penales
          que correspondan.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">10. Revisión</h3>
        <p>
          Esta política será revisada periódicamente y podrá actualizarse conforme evolucionen la
          organización, el marco jurídico aplicable y las alianzas institucionales.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">11. Declaración institucional</h3>
        <p>
          Aquí Estamos reconoce que la protección de la infancia constituye un compromiso permanente.
          La organización prioriza la seguridad y los derechos de los niños, niñas y adolescentes por
          encima de cualquier objetivo operativo o documental.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">Control de versiones</h3>
        <table className="pubpriv">
          <thead>
            <tr>
              <th>Versión</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Aprobación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.0</td>
              <td>Junio 2026</td>
              <td>Primera emisión</td>
              <td>Pendiente de aprobación</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="lead-rule">
        <strong>Principio rector:</strong> el interés superior del niño prevalece sobre cualquier
        objetivo operativo o documental de la organización.
      </p>

      <footer>
        <Link href="/">Volver al inicio</Link>
        &nbsp;·&nbsp;
        <Link href="/privacidad">Política de Búsqueda y Privacidad</Link>
      </footer>
    </main>
  );
}
