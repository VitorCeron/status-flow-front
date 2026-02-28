# StatusFlow

A full-featured **uptime monitoring** web application that tracks the availability and performance of HTTP endpoints. Users can configure monitors, visualize response times, inspect check history, and get notified when services go down.

This project was built as a portfolio piece to demonstrate real-world frontend architecture using modern React and Next.js patterns.

---

## Features

- **Authentication** — Login, register, and password recovery flows
- **Dashboard** — At-a-glance stats: total monitors, how many are up/down/paused, and a quick list of recently created monitors
- **Monitor management** — Create, edit, pause, and delete HTTP monitors with configurable interval, timeout, HTTP method, and failure threshold
- **Monitor detail** — Per-monitor view with:
  - 7-day uptime percentage
  - Last failure timestamp
  - Response time chart (daily avg/min/max)
  - Status timeline (last 50 checks)
  - Full checks history table
- **Admin backoffice** — Separate panel for admin users to oversee all monitors and users across the platform
- **Dark/light theme** — System-aware theme toggle with no flash on load
- **Responsive layout** — Mobile-friendly sidebar with drawer overlay

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Font | Geist |
| Language | TypeScript 5 |

---

## Architecture & Challenges

### 1. Proxy pattern to avoid CORS

The frontend communicates with a separate Laravel backend API. Rather than configuring CORS headers on the API and exposing the backend URL to the browser, all API calls are routed through a Next.js catch-all route handler (`/api/proxy/[...path]`).

This lets the server attach the auth token from cookies before forwarding the request, keeping credentials off the client entirely.

### 2. Theme without flash

Implementing dark mode with Zustand + `localStorage` creates a hydration mismatch: the server always renders light mode, and the client switches after hydration, causing a visible flash.

The solution is an inline `<script>` injected in the root `layout.tsx` that runs synchronously before React hydrates. It reads the saved preference from `localStorage` and sets `data-theme` on `<html>` immediately, so the correct theme is applied before the first paint.

```tsx
// layout.tsx — runs before hydration
<script dangerouslySetInnerHTML={{
  __html: `(function(){
    const t = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
  })()`
}} />
```

### 3. Tailwind v4 custom design tokens

Tailwind CSS v4 removed `tailwind.config.js` in favor of CSS-native configuration. All design tokens (colors, spacing, semantic aliases) live in `globals.css` inside `@theme` blocks.

Semantic color tokens like `bg-bg-surface`, `text-status-up`, and `border-border-default` are defined once and referenced throughout the codebase — making it trivial to change the entire palette by updating a single file.

```css
/* globals.css */
@theme {
  --color-bg-surface: var(--surface);
  --color-text-status-up: var(--green-500);
}
```

### 4. Server Components + async data fetching

Monitor detail pages fetch all data server-side using Next.js async Server Components. This avoids client-side loading spinners on initial load and keeps API tokens on the server.

The challenge here is mixing client interactivity (delete button, edit navigation) with server-rendered content. The solution is to isolate mutations into small `'use client'` boundary components (`MonitorDetailActions`) while keeping the data-heavy parts as server components.

### 5. Feature-based folder structure

As the app grew, a flat components folder became hard to navigate. The project adopts a feature-based structure under `src/features/` where each domain (auth, monitors, dashboard) owns its components, hooks, schemas, services, and types.

This makes it easy to find everything related to a feature in one place and delete a feature without hunting across the codebase.

```
src/features/monitors/
├── components/   # UI specific to monitors
├── hooks/        # Data-fetching hooks
├── schemas/      # Zod validation schemas
├── services/     # API calls (server + client)
└── types/        # TypeScript interfaces
```

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, register, forgot-password
│   ├── (app)/           # User dashboard, monitors, settings
│   ├── (backoffice)/    # Admin panel
│   └── api/proxy/       # Catch-all proxy to backend API
├── components/
│   ├── ui/              # Button, Input, Badge, Card, Avatar, Spinner
│   └── layout/          # Sidebar, TopNav, ThemeToggle
├── features/
│   ├── auth/
│   ├── monitors/
│   └── dashboard/
├── stores/              # Zustand stores (theme, sidebar)
├── services/            # Base fetch wrappers (server + client)
├── hooks/               # Global hooks
├── i18n/                # Translations
└── utils/               # Utility functions
```

---

## Installation

### Prerequisites

- **Node.js** 20+
- **npm**, **yarn**, or **pnpm**
- A running instance of the [StatusFlow API](https://github.com/VitorCeron/status-flow-api/) (Laravel backend) — or set `NEXT_PUBLIC_API_URL` to any compatible REST API

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/status-flow.git
   cd status-flow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file at the project root:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

   Replace the value with the URL of your backend API.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

<!-- --- -->

<!-- ## Screenshots

> _Add screenshots or a screen recording of the app here._ -->

---

## License

MIT
