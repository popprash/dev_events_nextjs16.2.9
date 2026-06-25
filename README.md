# DevEvents

A polished Next.js event discovery platform for developers, built with modern React, Tailwind CSS, MongoDB, and real-time analytics.

## 🚀 Project Overview

DevEvents is a developer-first event marketplace showcasing curated tech conferences, workshops, and networking experiences. It combines:

- **Dynamic server-side rendering** with Next.js App Router
- **A fully featured events API** with MongoDB/Mongoose
- **Cloudinary image upload integration** for event banners
- **PostHog analytics** for tracking interactions
- **WebGL-powered visual flair** via `ogl` background rays

## 🌟 What Makes This App Special

- **Homepage event feed** powered by `GET /api/events`
- **Event detail pages** using slug-based routing and related event recommendations
- **Booking interaction** via a lightweight booking form
- **Client-side telemetry** using PostHog to capture meaningful product events
- **Custom UI styling** with Tailwind CSS v4, utility-first design, and responsive layouts

## 🧱 Tech Stack

- `next@16.2.9` — App Router, server components, and optimized React rendering
- `react@19.2.4` / `react-dom@19.2.4`
- `typescript@^5` — type-safe components and models
- `tailwindcss@^4` + `@tailwindcss/postcss` — design system and utility styling
- `mongoose@^9.7.2` + `mongodb@^7.3.0` — MongoDB ODM and persistence
- `cloudinary@^2.10.0` — image storage / CDN uploads
- `posthog-js@^1.393.0` — in-app analytics capture
- `ogl@^1.0.11` — interactive WebGL ray background
- `lucide-react`, `clsx`, `tailwind-merge`, `radix-ui`, `shadcn`

## 📁 Key Project Structure

```text
/app
  layout.tsx           # global page layout, fonts, and background effects
  page.tsx             # homepage event feed
  api/events/route.ts  # API GET + POST for events
  api/events/[slug]/route.ts  # event detail API
  events/[slug]/page.tsx  # event details page
/components
  EventCard.tsx        # event preview cards
  EventDetails.tsx     # detail page content and booking sidebar
  BookEvent.tsx        # client booking form
  Navbar.tsx           # site navigation
  ExploreBtn.tsx       # CTA button with analytics
  LightRays.tsx        # animated WebGL background
/database
  event.model.ts       # event schema, validation, slug generation
  booking.model.ts     # booking schema and event reference validation
/lib
  mongodb.ts           # MongoDB connection cache
  utils.ts             # Tailwind classnames helper
  actions
    booking.actions.ts # server action for creating bookings
    event.actions.ts   # similar event lookup
/public
  images/              # local asset images used for event cards
  icons/               # UI icons and SVG assets
```
```

## 🧠 Feature Summary

### Homepage

`app/page.tsx` fetches events from the API using the environment-defined `NEXT_PUBLIC_BASE_URL`, then renders the feed with `EventCard` components.

### Event Detail Page

`app/events/[slug]/page.tsx` uses suspense to render `EventDetails`, which fetches a specific event by slug, displays a full banner, agenda, organizer details, and similar events.

### Booking Flow

`BookEvent.tsx` is a client component that submits an email through a server action (`createBooking`). It also captures a PostHog event for analytics.

### Event API

- `app/api/events/route.ts`
  - `GET` returns all events sorted by creation date
  - `POST` accepts multipart form data, uploads the image to Cloudinary, then stores the event

- `app/api/events/[slug]/route.ts`
  - `GET` returns one event by slug with sanitization and error handling

## 🗄️ Database Models

### Event schema (`database/event.model.ts`)

- `title`, `description`, `overview`, `venue`, `location`
- `image` (uploaded via Cloudinary)
- `date`, `time`, `mode` enum: `online`, `offline`, `hybrid`
- `audience`, `agenda`, `organizer`, `tags`
- pre-save normalization for slug, date, and time
- MongoDB indexes on `slug` and `{ date, mode }`

### Booking schema (`database/booking.model.ts`)

- stores `eventId`, `email`
- validates email format
- ensures referenced event exists
- indexes for fast lookups and unique event/email combination

## 🧩 Styling and UI

The app uses `app/globals.css` with Tailwind utilities and custom component styles:

- layout styling for responsive grids
- hero typography and gradient text
- glass-like card panels and dark theme palette
- event card image posters and metadata display
- booking sidebar and agenda list design

## 🌐 Configuration

### `next.config.ts`

- allows remote images from `res.cloudinary.com`
- enables `cacheComponents` and `reactCompiler`
- configures PostHog ingestion rewrites
- disables trailing slash redirects

### Environment Variables

Required variables:

- `MONGODB_URI` — MongoDB connection string
- `NEXT_PUBLIC_BASE_URL` — Base app URL for server fetches
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` — PostHog token for analytics

## 💡 Notes for Development

Start the project locally:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Optional Build

```bash
npm run build
npm start
```

## 🌈 Interactive & Observability

- `Explore` button triggers a PostHog capture
- clicking an event card logs `event_card_clicked`
- booking submissions send analytic events and use server-side database persistence
- background visuals are rendered in WebGL for an immersive experience

## 🔧 What You Can Extend

- add event search and filtering
- add pagination or infinite scrolling
- add authenticated event creation or admin panel
- add email confirmation for bookings
- add unit / integration tests

## 📌 Contribution

This app is a great starting point for event discovery and modern Next.js architecture. Feel free to fork, extend the API, and improve the design system.

---

> Built with Next.js, TypeScript, Tailwind CSS, MongoDB, Cloudinary, and PostHog.
