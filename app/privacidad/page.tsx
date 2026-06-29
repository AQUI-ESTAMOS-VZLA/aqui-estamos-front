import Link from 'next/link';

export const metadata = {
  title: 'Política de Búsqueda y Privacidad — Aqui Estamos Venezuela',
  description:
    'Política de búsqueda y privacidad de Aqui Estamos Venezuela: qué información es pública, qué es privada y cómo se localiza a una persona de forma segura.',
};

export default function Privacidad() {
  return (
    <main className="wrap doc">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <h1>Política de Búsqueda y Privacidad</h1>
      <h2>Cómo protegemos la información de las personas registradas.</h2>

      <section>
        <h3>¿Qué información es pública?</h3>
        <ul>
          <li>Nombre y apellido.</li>
          <li>Fotografía principal.</li>
          <li>Edad aproximada (opcional).</li>
          <li>Ciudad o municipio del registro.</li>
          <li>Fecha del registro.</li>
          <li>
            Estado (localizada, en refugio, hospitalizada, buscada por familiares o fallecida cuando
            exista confirmación oficial).
          </li>
          <li>Número único del registro.</li>
        </ul>
      </section>

      <section>
        <h3>¿Qué información es privada?</h3>
        <ul>
          <li>Dirección exacta.</li>
          <li>Coordenadas GPS.</li>
          <li>Hospital o refugio específico.</li>
          <li>Teléfonos y correos.</li>
          <li>Datos de familiares.</li>
          <li>Documento de identidad.</li>
          <li>Información médica.</li>
          <li>Datos del voluntario.</li>
          <li>Videos originales y observaciones internas.</li>
        </ul>
      </section>

      <section>
        <h3>¿Qué se puede buscar?</h3>
        <p>
          La búsqueda pública permite consultar por nombre, apellido, nombre completo, fotografía (en
          una etapa futura mediante reconocimiento facial) o número de registro. El sistema únicamente
          confirma la existencia del registro.
        </p>
      </section>

      <section>
        <h3>¿Cómo se localiza a una persona?</h3>
        <p>
          El sistema confirma que existe un registro y ofrece la opción de solicitar contacto. Un
          operador verifica el parentesco o la identidad antes de compartir información sensible o
          coordinar un encuentro.
        </p>
      </section>

      <section>
        <h3>Protección especial para niños</h3>
        <p>
          Nunca se publica la ubicación, el colegio, el nombre del cuidador ni otra información que
          permita localizar al menor. Toda reunificación requiere verificación de identidad.
        </p>
      </section>

      <section>
        <h3>Resumen</h3>
        <table className="pubpriv">
          <thead>
            <tr>
              <th>Información</th>
              <th className="c">Pública</th>
              <th className="c">Privada</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Nombre</td><td className="c"><span className="yes">✓</span></td><td className="c"></td></tr>
            <tr><td>Fotografía principal</td><td className="c"><span className="yes">✓</span></td><td className="c"></td></tr>
            <tr><td>Ciudad / Municipio</td><td className="c"><span className="yes">✓</span></td><td className="c"></td></tr>
            <tr><td>Fecha del registro</td><td className="c"><span className="yes">✓</span></td><td className="c"></td></tr>
            <tr><td>Estado</td><td className="c"><span className="yes">✓</span></td><td className="c"></td></tr>
            <tr><td>Dirección exacta</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Hospital o refugio específico</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Teléfono</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Datos médicos</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Familiares</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Video original</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Coordenadas GPS</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Observaciones del voluntario</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
          </tbody>
        </table>
      </section>

      <p className="lead-rule">
        <strong>Principio rector:</strong> El objetivo del sistema no es revelar dónde está una
        persona, sino confirmar que está registrada y facilitar un contacto seguro con sus familiares
        mediante un proceso de verificación.
      </p>

      <footer>
        <Link href="/">Volver al inicio</Link>
        &nbsp;·&nbsp;
        <Link href="/proteccion-menores">Protección de Niños, Niñas y Adolescentes</Link>
      </footer>
    </main>
  );
}
