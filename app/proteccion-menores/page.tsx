import Link from 'next/link';

export const metadata = {
  title:
    'Política de Protección de Niños, Niñas y Adolescentes y Salvaguarda de Personas en Situación de Vulnerabilidad — Aqui Estamos Venezuela',
  description:
    'Política institucional de Aquí Estamos (Versión 2.0): protección reforzada de la infancia, no exposición pública de las personas registradas y salvaguarda de personas en situación de vulnerabilidad.',
};

export default function ProteccionMenores() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>
        Política de Protección de Niños, Niñas y Adolescentes y Salvaguarda de Personas en Situación
        de Vulnerabilidad
      </h1>
      <h2>Aquí Estamos · Versión 2.0 · Documento institucional para publicación pública</h2>

      <div className="alert info" role="note">
        <strong>Protección reforzada de menores.</strong> Como medida institucional vigente, Aquí
        Estamos <strong>no realiza registros audiovisuales ni otros tratamientos de información que
        permitan identificar directa o indirectamente a niños, niñas y adolescentes</strong> hasta
        contar con protocolos especializados, asesoría jurídica y acuerdos con las instituciones
        competentes.
      </div>

      <div className="panel">
        <h3 className="section-title">1. Declaración de principios</h3>
        <p>
          Aquí Estamos desarrolla infraestructura tecnológica para apoyar la respuesta humanitaria en
          situaciones de emergencia. La protección de la dignidad, la privacidad y los derechos de las
          personas constituye el principio rector del proyecto. Los niños, niñas y adolescentes reciben
          el más alto nivel de protección dentro de esta política.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">2. Principio de no exposición</h3>
        <p>
          La plataforma está diseñada para evitar la exposición pública de las personas registradas. No
          publica listados de víctimas, fotografías, perfiles individuales, ubicaciones ni información
          que permita identificar directa o indirectamente a una persona. Su función es facilitar
          procesos seguros de verificación entre quien busca a un familiar y la institución responsable
          de protegerlo.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">3. Protección reforzada de menores</h3>
        <p>
          Como medida institucional vigente, Aquí Estamos no realiza registros audiovisuales ni otros
          tratamientos de información que permitan identificar directa o indirectamente a niños, niñas y
          adolescentes hasta contar con protocolos especializados, asesoría jurídica y acuerdos con las
          instituciones competentes. Esta medida podrá revisarse únicamente cuando existan garantías
          suficientes para la protección de sus derechos.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">4. Minimización de datos</h3>
        <p>
          Solo se recopilará la información estrictamente necesaria para cumplir la finalidad
          humanitaria autorizada. Siempre que sea posible se utilizarán mecanismos que reduzcan la
          exposición de datos personales.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">5. Supervisión humana</h3>
        <p>
          Las decisiones relacionadas con la identificación, verificación o contacto respecto de
          personas vulnerables no serán adoptadas exclusivamente mediante procesos automatizados. La
          intervención humana será un requisito esencial.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">6. Temporalidad y custodia</h3>
        <p>
          Aquí Estamos actúa como custodio temporal de la información humanitaria que administra. Los
          datos deberán conservarse únicamente durante el tiempo necesario para cumplir su finalidad o
          mientras exista una obligación legal o institucional que justifique su conservación;
          posteriormente deberán eliminarse o anonimizarse conforme a la normativa aplicable.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">7. Restricciones de acceso</h3>
        <p>
          El acceso a la información estará limitado por funciones, necesidad de conocer y mecanismos de
          autenticación. La descarga, exportación o reproducción de información sensible solo podrá
          realizarse cuando exista autorización expresa de la institución responsable y conforme a
          procedimientos seguros.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">8. Compromiso institucional</h3>
        <p>
          Aquí Estamos diseña sus procesos para minimizar los riesgos asociados al tratamiento de
          información sensible y mejorar continuamente sus medidas técnicas y organizativas. Ningún
          sistema puede eliminar por completo los riesgos, por lo que la organización revisará y
          fortalecerá permanentemente sus protocolos de protección.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">9. Declaración final</h3>
        <p>
          La mejor información sensible es aquella que nunca necesita hacerse pública para cumplir su
          propósito humanitario. Ese principio guía el desarrollo tecnológico y operativo de Aquí
          Estamos.
        </p>
      </div>

      <div className="panel">
        <h3 className="section-title">Vigencia</h3>
        <p>
          Esta política entra en vigor desde su publicación y será revisada periódicamente para
          incorporar mejoras derivadas de la evolución tecnológica, jurídica y humanitaria.
        </p>
      </div>

      <p className="lead-rule">
        <strong>Principio rector:</strong> la mejor información sensible es aquella que nunca necesita
        hacerse pública para cumplir su propósito humanitario.
      </p>

      <footer>
        <Link href="/">Volver al inicio</Link>
        &nbsp;·&nbsp;
        <Link href="/privacidad">Política de Búsqueda y Privacidad</Link>
      </footer>
    </main>
  );
}
