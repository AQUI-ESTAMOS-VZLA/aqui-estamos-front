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

## Flujo de trabajo (ramas y Pull Requests)

Trabajamos con **Pull Requests**. Cada rama tiene un rol:

- **`main`** — rama de integración y trabajo del día a día. Se mantiene siempre
  actualizada y se puede commitear/abrir PRs contra ella libremente.
- **`prod`** — rama de **producción**: es la que se publica en
  [aquiestamosvenezuela.com](https://aquiestamosvenezuela.com). Está
  **protegida**: no se permite push directo ni `force-push`; los cambios entran
  **únicamente por Pull Request**.

### Cómo contribuir

1. Crea una rama a partir de `main` (o, editando en GitHub, elige *"Create a new
   branch and start a pull request"*).
2. Abre un **Pull Request hacia `main`** y revísalo allí.
3. Para publicar a producción, abre un **PR de `main` → `prod`** y haz *merge*.

### Despliegue

- Al hacer *merge* en **`prod`** se despliega automáticamente a producción
  (siempre que la integración **Vercel ↔ GitHub** esté conectada).
- Cada PR genera una **URL de vista previa (preview)** en Vercel para revisar los
  cambios antes de publicarlos.

> Nota: mientras la integración de Vercel con GitHub no esté conectada, los PR
> funcionan igual en GitHub, pero el despliegue se hace manualmente con
> `vercel --prod`. La rama histórica `rod/vercel-poc` queda en desuso; el trabajo
> nuevo va sobre `main`.
