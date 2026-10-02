# Motorida Frontend

Show-piece landing page for Motorida, aimed at recruiters and investors.
Vite + React + TypeScript, Tailwind v4, Motion, Phosphor icons. Static build, deploys anywhere.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

The hero phone is a working USSD demo: `src/ussd.ts` is a browser port of
`../backend/src/ussd.js` (same menu text, same split-on-`*` protocol) with a
small in-memory store, so visitors can place an order or take a rider job.

## Placeholders to replace before sharing widely

| What | Where |
|---|---|
| Contact email `hello@motorida.co.ke` | `CONTACT` in `src/App.tsx` |
| USSD code `*384*7426#` | `DEMO_CODE` in `src/ussd.ts` |
| Rider/business names, plate, `0711 000 000` | `src/ussd.ts` |
| Repo link (must be public for visitors) | `REPO` in `src/App.tsx` |
| Logo (simple M mark) | `public/favicon.svg` |

## Numbers on the page

All from `../research/` (business-model.md, competitor-deep-dive.md,
marketing-plan.md). They are modelled, pre-revenue estimates and the page says so.

## Photos

From Unsplash (free license), self-hosted in `public/img/`:
rider.jpg (photo-1641295437743), riders-road.jpg (photo-1551356522),
mama-cooking.jpg (photo-1760907949894), kitchen.jpg (photo-1698827623494),
nairobi.jpg (photo-1790456175905).
