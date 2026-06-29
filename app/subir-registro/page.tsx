'use client';
import { PolicyConsent } from '@/components/PolicyConsent';

export default function SubirRegistro() {
  return (
    <PolicyConsent
      title="Añadir un registro"
      subtitle="Antes de subir un registro, lee y acepta nuestra política de protección de la infancia."
      formKey="registroFormUrl"
      continueLabel="Continuar al formulario de registro"
      extraNote="Queda prohibido registrar imágenes, videos o entrevistas de personas menores de edad. Durante esta fase, los registros se orientan exclusivamente al apoyo a las víctimas del terremoto del 24 de junio de 2026."
    />
  );
}
