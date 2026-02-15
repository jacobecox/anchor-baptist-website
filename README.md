# Anchor Baptist Church - Simi Valley

Church website for Anchor Baptist Church, an independent, Bible-believing Baptist church in Simi Valley, California.

**Live site:** [calvarybaptistsv.org](https://calvarybaptistsv.org)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth)
- **Language:** JavaScript (React 19)
- **Font:** Montserrat (via `next/font`)
- **Analytics:** Google Analytics 4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout (navbar, analytics, SEO schema)
│   ├── page.js                # Homepage (slideshow, service info, contact form)
│   ├── beliefs/               # Statement of beliefs
│   ├── how-to-be-saved/       # Salvation page
│   ├── visit/                 # Location, directions, service times
│   ├── watch/                 # Online streaming / YouTube
│   ├── events/                # Upcoming church events
│   ├── more/                  # Additional resources
│   ├── admin/                 # Admin panel (auth-protected)
│   │   ├── page.js            # Login page
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── service-times/     # Manage service schedule
│   │   ├── events/            # Manage church events
│   │   └── analytics/         # View site analytics
│   └── components/            # Shared components
│       ├── NavBar.js           # Site navigation
│       ├── PageFooter.js       # Footer with service times
│       ├── PhotoSlideshow.js   # Homepage image carousel
│       ├── ContactForm.js      # Contact form
│       ├── OptimizedImage.js   # Image wrapper (Next.js Image with fallback)
│       ├── ServerSchema.js     # Structured data for SEO (JSON-LD)
│       ├── GoogleAnalytics.js  # GA4 integration (production only)
│       └── ErrorBoundary.js    # Error boundary wrapper
├── lib/
│   └── supabase.js            # Supabase client initialization
public/
├── ABCSV*.jpg                 # Church photos (slideshow + hero images)
├── ABCSV-logo.jpg             # Site logo
├── anchor-baptist-logo.*      # Logo variants
└── ABC square logo no background.png  # Favicon / app icon
```

## Frontend

All public-facing pages are client-rendered React components using the Next.js App Router. The homepage lazy-loads the `PhotoSlideshow` and `ContactForm` components for performance.

Key pages pull live data from Supabase:
- **Visit, Watch, Footer** -- fetch `service_times` to display the current schedule
- **Events** -- fetch `events` to show upcoming and past church events

## Backend (Supabase)

The backend is fully managed by [Supabase](https://supabase.com). There is no custom backend server.

### Database Tables

**`service_times`** -- Church service schedule

| Column | Type | Description |
|---|---|---|
| `id` | bigint | Primary key (auto-generated) |
| `service_name` | text | e.g. "Morning Service" |
| `day_of_week` | text | e.g. "Sunday", "Wednesday" |
| `time` | text | e.g. "12:00 PM" |

**`events`** -- Church events and calendar

| Column | Type | Description |
|---|---|---|
| `id` | bigint | Primary key (auto-generated) |
| `title` | text | Event name |
| `description` | text | Event details |
| `event_date` | date | Event date |
| `event_time` | text | Event time (optional) |
| `location` | text | Event location (optional) |
| `is_recurring` | boolean | Whether the event repeats |
| `recurrence_pattern` | text | "weekly", "monthly", or "yearly" |
| `end_date` | date | End date for recurring events |

### Row-Level Security

- **Public read access** on both tables (no auth required to view)
- **Authenticated write access** for insert, update, and delete (admin only)

### Authentication

Supabase Auth with email/password. A single admin user is configured in the Supabase dashboard under **Authentication > Users**.

## Admin Panel

**URL:** `/admin`

The admin panel is part of the same Next.js app (not a separate service). All admin routes are behind Supabase authentication.

### How to access:
1. Navigate to `/admin`
2. Log in with the admin email and password
3. You'll be redirected to `/admin/dashboard`

### Admin features:
- **Service Times** (`/admin/service-times`) -- Add, edit, or delete service times. Changes appear immediately on the public site.
- **Events** (`/admin/events`) -- Manage church events with support for recurring events.
- **Analytics** (`/admin/analytics`) -- View basic site usage data.

## Deployment

The site is designed to deploy on [Vercel](https://vercel.com). Push to `main` to trigger a production deployment.

```bash
npm run build   # Verify the build passes locally
```

Make sure to set the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your Vercel project settings.
