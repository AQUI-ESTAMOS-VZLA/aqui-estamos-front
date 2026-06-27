# Aqui Estamos Venezuela — Frontend

Static frontend (no build step) for the Aqui Estamos Venezuela POC, deployed on
**Vercel**. It is a faithful clone of [aquiestamosvenezuela.com](https://aquiestamosvenezuela.com)
plus a volunteer-verification flow and a colaboradores registration site.

## Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Landing clone. Buttons **Quiero Ayudar** and **Subir un Registro** point to the *same* address (configurable), plus a third button **Verificar Voluntario**. |
| `verificar.html` | `/verificar` | Form (nombre, apellido, cédula). Looks the volunteer up **by cédula** via the backend and shows their photo + information. |
| `colaboradores.html` | `colaboradores.<domain>` | Registration site to upload a volunteer (nombre, apellido, cédula, rol, foto). |

## Configuration

All tunables live in [`assets/js/config.js`](assets/js/config.js):

- `API_BASE` — backend URL (`aqui-estamos-back` on Vercel). Auto-uses
  `http://localhost:8000` on localhost.
- `SHARED_FORM_URL` — the single address both landing buttons open.
- `INSTAGRAM_URL`.

## The `colaboradores` subdomain

`vercel.json` rewrites requests whose host starts with `colaboradores.` to
`colaboradores.html`. To enable it:

1. Add `colaboradores.<your-domain>` as a domain on this Vercel project.
2. Point its DNS (CNAME) at Vercel. The rewrite serves the registration page at
   the subdomain root while `/` on the main domain stays the landing page.

## Local development

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

Run the backend (`aqui-estamos-back`) on `:8000` for the verify/register flows.

## Deploy to Vercel

Import the repo, framework preset **Other**, no build command, output = repo
root. `cleanUrls` is enabled so `/verificar` resolves to `verificar.html`.

## Branch

Work for this POC lives on **`rod/vercel-poc`**.
