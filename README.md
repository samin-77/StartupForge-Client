# StartupForge Client

Frontend for the StartupForge startup team-building platform. Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and Recharts.

## Features

- Role-based dashboards (Founder, Collaborator, Admin)
- Startup & opportunity browsing with search/filter/pagination
- Stripe Checkout payment integration
- Google OAuth + email authentication
- Fully responsive dark theme UI

## Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_API_URL | Backend API URL |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | Google OAuth client ID |
| NEXT_PUBLIC_IMGBB_API_KEY | imgbb API key for image uploads |

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
