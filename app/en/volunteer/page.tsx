'use client';
import { PolicyConsent } from '@/components/PolicyConsent';

export default function VolunteerEn() {
  return (
    <PolicyConsent
      lang="en"
      switchHref="/voluntario"
      title="I want to volunteer"
      subtitle="Before signing up, please read and accept our child-protection policy."
      formKey="ayudarFormUrl"
      continueLabel="Continue to the sign-up form"
      extraNote="During this phase, all activities are oriented exclusively to humanitarian and logistical support for the victims of the June 24, 2026 earthquake."
    />
  );
}
