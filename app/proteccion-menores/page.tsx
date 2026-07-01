import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title:
    'Política de Protección de Niños, Niñas y Adolescentes y Salvaguarda de Personas en Situación de Vulnerabilidad — Aqui Estamos Venezuela',
  description:
    'Política institucional de Aquí Estamos (Versión 2.0): protección reforzada de la infancia, no exposición pública de las personas registradas y salvaguarda de personas en situación de vulnerabilidad.',
};

export default function ProteccionMenores() {
  return (
    <main className="pg">
      <SiteHeader homeHref="/" switchHref="/en/child-protection" switchLabel="Translate to English" lang="es" />
      <div className="pg-main lp-inner">
        <div className="pg-hero">
          <p className="pg-eyebrow">Protección</p>
          <h1 className="pg-title">Política de Protección de Niños, Niñas y Adolescentes y Salvaguarda de Personas en Situación de Vulnerabilidad</h1>
          <p className="pg-lead">Aquí Estamos · Versión 2.0 · Documento institucional para publicación pública</p>
        </div>
        <article className="doc pg-body">

      <div className="callout" role="note">
        <strong>Protección reforzada de menores.</strong> Como medida institucional vigente, Aquí
        Estamos no realiza registros audiovisuales ni otros tratamientos de información que permitan
        identificar directa o indirectamente a niños, niñas y adolescentes hasta contar con protocolos
        especializados, asesoría jurídica y acuerdos con las instituciones competentes.
      </div>

      <section>
        <h3><span className="num">1.</span> Declaración de principios</h3>
        <p>
          Aquí Estamos desarrolla infraestructura tecnológica para apoyar la respuesta humanitaria en
          situaciones de emergencia. La protección de la dignidad, la privacidad y los derechos de las
          personas constituye el principio rector del proyecto. Los niños, niñas y adolescentes reciben
          el más alto nivel de protección dentro de esta política.
        </p>
      </section>

      <section>
        <h3><span className="num">2.</span> Principio de no exposición</h3>
        <p>
          La plataforma está diseñada para evitar la exposición pública de las personas registradas. No
          publica listados de víctimas, fotografías, perfiles individuales, ubicaciones ni información
          que permita identificar directa o indirectamente a una persona. Su función es facilitar
          procesos seguros de verificación entre quien busca a un familiar y la institución responsable
          de protegerlo.
        </p>
      </section>

      <section>
        <h3><span className="num">3.</span> Protección reforzada de menores</h3>
        <p>
          Como medida institucional vigente, Aquí Estamos no realiza registros audiovisuales ni otros
          tratamientos de información que permitan identificar directa o indirectamente a niños, niñas y
          adolescentes hasta contar con protocolos especializados, asesoría jurídica y acuerdos con las
          instituciones competentes. Esta medida podrá revisarse únicamente cuando existan garantías
          suficientes para la protección de sus derechos.
        </p>
      </section>

      <section>
        <h3><span className="num">4.</span> Minimización de datos</h3>
        <p>
          Solo se recopilará la información estrictamente necesaria para cumplir la finalidad
          humanitaria autorizada. Siempre que sea posible se utilizarán mecanismos que reduzcan la
          exposición de datos personales.
        </p>
      </section>

      <section>
        <h3><span className="num">5.</span> Supervisión humana</h3>
        <p>
          Las decisiones relacionadas con la identificación, verificación o contacto respecto a
          personas vulnerables no serán adoptadas exclusivamente mediante procesos automatizados. La
          intervención humana será un requisito esencial.
        </p>
      </section>

      <section>
        <h3><span className="num">6.</span> Temporalidad y custodia</h3>
        <p>
          Aquí Estamos actúa como custodio temporal de la información humanitaria que administra. Los
          datos deberán conservarse únicamente durante el tiempo necesario para cumplir su finalidad o
          mientras exista una obligación legal o institucional que justifique su conservación;
          posteriormente deberán eliminarse o anonimizarse conforme a la normativa aplicable.
        </p>
      </section>

      <section>
        <h3><span className="num">7.</span> Restricciones de acceso</h3>
        <p>
          El acceso a la información estará limitado por funciones, necesidad de conocer y mecanismos de
          autenticación. La descarga, exportación o reproducción de información sensible solo podrá
          realizarse cuando exista autorización expresa de la institución responsable y conforme a
          procedimientos seguros.
        </p>
      </section>

      <section>
        <h3><span className="num">8.</span> Compromiso institucional</h3>
        <p>
          Aquí Estamos diseña sus procesos para minimizar los riesgos asociados al tratamiento de
          información sensible y mejorar continuamente sus medidas técnicas y organizativas. Ningún
          sistema puede eliminar por completo los riesgos, por lo que la organización revisará y
          fortalecerá permanentemente sus protocolos de protección.
        </p>
      </section>

      <section>
        <h3><span className="num">9.</span> Declaración final</h3>
        <p>
          La información más segura es aquella que nunca necesita hacerse pública para cumplir su
          propósito humanitario. Ese principio guía el desarrollo tecnológico y operativo de Aquí
          Estamos.
        </p>
      </section>

      <section>
        <h3>Vigencia</h3>
        <p>
          Esta política entra en vigor desde su publicación y será revisada periódicamente para
          incorporar mejoras derivadas de la evolución tecnológica, jurídica y humanitaria.
        </p>
      </section>

      <hr className="divider" />

      <section>
        <h3>🛡️ Reglas para Voluntarios en Refugios</h3>
        <p>
          Aquí Estamos · Protección de niños, niñas, adolescentes y personas vulnerables. Lee esto
          antes de cada jornada. Si tienes una duda, pregunta a coordinación <strong>antes</strong> de
          actuar.
        </p>
      </section>

      <section>
        <h3><span className="num">1.</span> Lo que NUNCA se hace</h3>
        <ul>
          <li>❌ No tomar fotos ni videos de menores — ni para uso interno, ni «solo para el grupo».</li>
          <li>❌ No escribir nombres de niños ni datos que los identifiquen en WhatsApp, redes ni chats.</li>
          <li>
            ❌ No publicar listados de víctimas, fotos, perfiles, ubicaciones ni datos de ninguna
            persona registrada.
          </li>
          <li>❌ No compartir ubicaciones de refugios donde haya menores.</li>
          <li>❌ No prometer nada a una familia que no puedas cumplir (reencuentros, traslados, ayudas).</li>
          <li>❌ No compartir claves ni accesos del equipo con nadie fuera de coordinación.</li>
        </ul>
      </section>

      <section>
        <h3><span className="num">2.</span> Lo que SÍ se hace</h3>
        <ul>
          <li>✅ Llegar en grupos de 3 e identificarse con el responsable del refugio.</li>
          <li>✅ Pedir permiso a la institución/responsable antes de registrar cualquier dato.</li>
          <li>✅ Recoger solo la información estrictamente necesaria para la finalidad humanitaria.</li>
          <li>
            ✅ Registrar los datos únicamente por el canal seguro del proyecto (el sistema / Excel
            autorizado), nunca por chats sueltos ni notas personales.
          </li>
          <li>✅ Explicar a cada adulto, con respeto, para qué se toman sus datos y pedir su acuerdo.</li>
          <li>✅ Tratar a cada persona con dignidad y privacidad: nada de exponer su situación.</li>
        </ul>
      </section>

      <section>
        <h3><span className="num">3.</span> Si encuentras a un menor no acompañado</h3>
        <ul>
          <li>No te lo lleves y no lo dejes solo.</li>
          <li>Avisa de inmediato al responsable del refugio y a la institución competente presente.</li>
          <li>No publiques su foto, nombre ni ubicación en ningún chat o red.</li>
          <li>Reporta la situación a coordinación (ver abajo).</li>
        </ul>
      </section>

      <section>
        <h3><span className="num">4.</span> Principio que guía todo</h3>
        <p>
          La mejor información sensible es aquella que nunca necesita hacerse pública para cumplir su
          propósito humanitario.
        </p>
        <p>Si dudas entre registrar algo o no: no lo registres y consulta a coordinación.</p>
      </section>

      <section>
        <h3>🚨 Reporte de incidentes</h3>
        <p>
          Reporta de inmediato si ocurre cualquiera de estas cosas — no esperes, no lo manejes solo/a,
          no borres nada:
        </p>
        <ul>
          <li>Se publicó por error una foto, nombre o dato de un menor o de una persona registrada.</li>
          <li>Se filtró o se perdió información sensible.</li>
          <li>Alguien usó mal un acceso o una clave del equipo.</li>
          <li>Detectaste una situación de riesgo para un menor o persona vulnerable.</li>
          <li>Una página o persona externa pide datos de forma sospechosa (posible fraude).</li>
        </ul>
        <p>
          <strong>Cómo reportar:</strong>
        </p>
        <ul>
          <li>Contacto de incidentes: [nombre del responsable] · [teléfono / correo].</li>
          <li>
            Correo del equipo:{' '}
            <a href="mailto:aquiestamos.emergencia.venezuela@gmail.com">
              aquiestamos.emergencia.venezuela@gmail.com
            </a>
            .
          </li>
          <li>
            Qué incluir: ¿qué pasó?, ¿cuándo?, ¿dónde? y ¿a quién afecta? Sin reenviar el dato
            sensible.
          </li>
        </ul>
        <p className="callout">
          Reportar a tiempo protege a las personas y al proyecto. Reportar nunca trae problemas;
          callar, sí.
        </p>
      </section>

      </article>
      </div>
      <SiteFooter lang="es" />
    </main>
  );
}
