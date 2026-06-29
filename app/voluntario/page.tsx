'use client';
import { PolicyConsent } from '@/components/PolicyConsent';

export default function Voluntario() {
  return (
    <PolicyConsent
      switchHref="/en/volunteer"
      title="Quiero ser voluntario"
      subtitle="Antes de inscribirte, lee y acepta nuestra política de protección de la infancia."
      formKey="ayudarFormUrl"
      continueLabel="Continuar al formulario de inscripción"
      extraNote="Durante esta fase, todas las actividades se orientan exclusivamente al apoyo humanitario y logístico a las víctimas del terremoto del 24 de junio de 2026."
    />
  );
}
