'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConfig } from '@/lib/config';

export default function Home() {
  const [instagram, setInstagram] = useState('#');
  useEffect(() => {
    setInstagram(getConfig().instagramUrl);
  }, []);

  return (
    <main className="wrap">
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>Aqui Estamos Venezuela</h1>
      <h2>
        Aquí Estamos vuelve a reactivarse. Una iniciativa que logró reunir a muchas familias durante
        la tragedia de Vargas en 1999.
      </h2>

      <ul className="buttons">
        <li>
          <Link className="btn btn-primary" href="/busqueda" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
            </svg>
            Buscar a una persona
          </Link>
        </li>
        <li>
          <Link className="btn" href="/registro" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 3l-1.83 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
            Añadir un registro
          </Link>
        </li>
        <li>
          <Link className="btn" href="/voluntario" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4z" />
            </svg>
            Quiero ser voluntario
          </Link>
        </li>
        <li>
          <Link className="btn" href="/verificar" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
            </svg>
            Verificar un voluntario
          </Link>
        </li>
      </ul>

      <p className="lead">
        Hoy somos una <strong>Red Ciudadana de Registro Audiovisual</strong> para ayudar a localizar
        personas en hospitales y refugios durante emergencias, con un sistema integrado de
        verificación de identidad para brindar mayor confianza y reducir la desinformación.
      </p>
      <p>
        Creamos juntos esta red ciudadana para apoyar a todas las personas afectadas por la
        emergencia en Venezuela. Nuestro propósito es reunir familias, organizando información
        confiable y coordinando un <strong>Registro Audiovisual Ciudadano</strong> que contribuya a la
        búsqueda de personas, la identificación de necesidades y documentación responsable de la
        emergencia.
      </p>
      <p>
        <em>
          No pertenecemos a ningún organismo oficial. Trabajamos de manera independiente, voluntaria,
          colaborativa y sin fines de lucro.
        </em>
      </p>

      <hr className="divider" />

      <h3>La idea, el proceso y el objetivo</h3>
      <p>
        Es un registro audiovisual de personas rescatadas sin identificación o con dificultades de
        comunicación, creado para ayudar a reunirlas con sus familias.
      </p>
      <p>
        <strong>El proceso:</strong>
      </p>
      <ul className="steps">
        <li>Voluntarios capacitados documentan en terreno.</li>
        <li>Suben registros (foto/video + metadata) a la plataforma.</li>
        <li>Equipos de verificación voluntaria revisan la información.</li>
        <li>
          El contenido se publica de forma responsable para consulta pública y puede ser compartido
          con medios y entidades.
        </li>
      </ul>

      <hr className="divider" />

      <h3>Nuestra Visión</h3>
      <p>Muchas familias están buscando a sus seres queridos después de la emergencia.</p>
      <p>
        Niños, adultos mayores, personas con Alzheimer o personas heridas pueden no estar en
        condiciones de llamar por teléfono, recordar un número o comunicar su identidad por distintos
        motivos.
      </p>
      <p>
        En estos casos, una imagen puede ser la única forma de decir: <strong>&quot;Aquí estoy&quot;</strong>.
      </p>

      <hr className="divider" />

      <h3>Política Temporal de Protección de Niños, Niñas y Adolescentes</h3>
      <p>
        Mientras desarrollamos nuestros protocolos especializados y formalizamos alianzas con
        instituciones competentes, <strong>Aquí Estamos no realiza registros audiovisuales de
        personas menores de edad</strong> (fotografías, videos, entrevistas o cualquier medio que
        permita identificarlas). Durante esta fase, todas nuestras herramientas se orientan al apoyo
        humanitario y logístico a las víctimas del terremoto del 24 de junio de 2026.
      </p>
      <p>
        <Link className="btn" href="/proteccion-menores" role="button">
          Leer la política completa
        </Link>
      </p>

      <footer>
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        &nbsp;·&nbsp;
        <Link href="/privacidad">Política de Búsqueda y Privacidad</Link>
        &nbsp;·&nbsp;
        <Link href="/proteccion-menores">Protección de Niños, Niñas y Adolescentes</Link>
      </footer>
    </main>
  );
}
