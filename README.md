# DWG Guardian AI

DWG Guardian AI is an engineering drawing audit prototype built with Next.js, Genkit, and Gemini.

## Current capabilities

- Public landing page and dashboard UI
- Drawing upload flow for DWG, DXF, and PDF files
- Server-side AI audit flow using Genkit
- AI remediation suggestion flow
- Browser-session persistence for the latest uploaded audit
- Live audit results page backed by the uploaded file result
- Demo dashboards for workstation, remediation, and report viewer concepts

## Current architecture

- Frontend: Next.js App Router, React, Tailwind CSS, Radix UI
- AI orchestration: Genkit
- Model provider: Google Gemini
- Deployment target: Vercel

## Important prototype limitations

- No persistent database yet
- No object storage for uploaded drawings yet
- No production authentication yet
- No dedicated CAD parser for DWG or DXF yet
- Some dashboard screens still use demo data
- Generated audit results are stored only in the current browser session

## Development

```bash
npm install
npm run dev
```

The local application runs on port `9002`.

## Key routes

- `/` landing page
- `/login` demo login page
- `/dashboard/upload-workspace` upload and audit flow
- `/dashboard/audit-results` live results for the latest uploaded file
- `/dashboard/analysis-dashboard` workstation demo
- `/dashboard/remediation` remediation demo
- `/dashboard/qa-report-viewer` report viewer demo
