/* Central configuration for the Aqui Estamos POC frontend.
 * Edit these values per environment (local dev vs. Vercel deploy). */
window.AE_CONFIG = {
  // Base URL of the FastAPI backend (aqui-estamos-back deployed on Vercel).
  // For local dev with `uvicorn`/`vercel dev`, use http://localhost:8000.
  // In production set this to the backend deployment, e.g. https://aqui-estamos-back.vercel.app
  API_BASE: (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:8000'
    : 'https://aqui-estamos-back.vercel.app',

  // Per requirement #2 the two landing buttons point to the SAME address.
  // Change this single value to repoint both "Quiero Ayudar" and "Subir un Registro".
  SHARED_FORM_URL: 'https://forms.gle/CeaiBpMKw1AGk9rf8',

  INSTAGRAM_URL: 'https://www.instagram.com/aqui.estamos.vnzl',

  // Supabase Auth (admin.<domain> per-person logins). These are PUBLIC values
  // (the anon key is safe to ship to the browser). Fill them from the
  // AquiEstamosDev project: Settings -> API. If SUPABASE_ANON_KEY is blank, the
  // admin page falls back to the shared-token login (useful for local mock dev).
  SUPABASE_URL: 'https://qycxgscxuvfrspogocvs.supabase.co',
  SUPABASE_ANON_KEY: '',
};
