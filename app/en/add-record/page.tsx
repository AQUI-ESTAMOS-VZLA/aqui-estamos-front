'use client';
import { PolicyConsent } from '@/components/PolicyConsent';

export default function AddRecordEn() {
  return (
    <PolicyConsent
      lang="en"
      switchHref="/subir-registro"
      title="Add a record"
      subtitle="Before uploading a record, please read and accept our child-protection policy."
      formKey="registroFormUrl"
      continueLabel="Continue to the registration form"
      extraNote="Recording images, videos or interviews of minors is prohibited. During this phase, records are oriented exclusively to supporting the victims of the June 24, 2026 earthquake."
    />
  );
}
