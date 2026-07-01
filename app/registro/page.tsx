import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";

export default function Registro() {
  return (
    <ComingSoon
      lang="es"
      eyebrow="Consola de registro"
      title="Consola de registro en construcción"
      body="Todavía estamos trabajando en la consola de registro. Muy pronto los voluntarios podrán subir y gestionar registros desde aquí. Gracias por tu paciencia."
      homeHref="/"
      homeLabel="Volver al inicio"
      note={
        <>
          <strong>Protección de la infancia.</strong> Durante esta fase, Aquí Estamos no realiza
          registros audiovisuales de personas menores de edad.{" "}
          <Link href="/proteccion-menores">Leer la política</Link>.
        </>
      }
    />
  );
}
