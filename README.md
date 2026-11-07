# QuantumX portfolio website

A local Next.js website for QuantumX, using the structure and motion of the earlier site recreation with portfolio content drawn from the supplied QuantumX capabilities presentation. Project images and case-study facts come from slides 14–22. Markets and capabilities come from slides 5–7. Four case studies include the deck's stated challenge, solution and impact; the other project pages use shared templates and shorter portfolio descriptions.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. In Windows PowerShell, use `npm.cmd run dev` if script execution blocks `npm.ps1`. For a production build, run `npm run build` and then `npm start`.

The contact form demonstrates local validation and confirmation only. It does not send or store submissions; the listed email and phone number provide direct contact options.
