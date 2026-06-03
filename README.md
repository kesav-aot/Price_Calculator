# Multimodal AI Pricing & ROI Engine

Production-ready Vite React app for estimating image extraction token usage, multimodal model costs, cache savings, and pipeline architecture tradeoffs.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository in Vercel. The included `vercel.json` uses:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

Pricing and token formulas are stored in `src/data/modelRegistry.js` and `src/lib/pricing.js`.
