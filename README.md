# MediCore - B2B Healthcare SaaS Frontend

MediCore is a frontend-first healthcare operations platform built to simulate real B2B clinical workflows.

## Tech Stack

- React 18
- TypeScript
- Zustand for state management
- React Router for routing
- React Query for async server-state style data flows
- Firebase Authentication
- Vite + vite-plugin-pwa (Service Worker)
- Tailwind CSS

## Assignment Coverage

### 1. Authentication

- Login flow with Firebase email/password authentication
- Validation and error mapping in login form
- Session handling with Firebase auth persistence and bootstrap listener
- Sign out action implemented in application sidebar

### 2. Application Pages

- Login page
- Home/Dashboard page
- Analytics page
- Patient details page

### 3. Patient Details Module

- Patient records in Grid View
- Patient records in List View (virtualized list)
- Grid/List toggle control
- Responsive layout across breakpoints

### 4. Notifications and Service Worker

- Service Worker registration through vite-plugin-pwa
- Local notification support with browser Notification API
- Working notification use cases:
  - Critical vitals alert
  - Overdue review alert
  - PWA update and offline-ready notifications

### 5. State Management

- Auth state via Zustand store
- Patient module state via Zustand store
- Notification state via Zustand store
- Shared data flow across modules with predictable store updates

## Good to Have Coverage

- Reusable component design present across layout, charts, and patient modules
- Performance optimizations:
  - Route-level lazy loading
  - Virtualized patient list table
  - Query caching with React Query staleTime
- Clean, feature-oriented folder structure used for scalability
- Micro-frontend architecture not implemented in this version

## Project Structure (High Level)

- src/components: shared UI primitives and layout
- src/features: module-scoped business features
- src/store: Zustand stores
- src/services: Firebase, notifications, and mock API layer
- src/hooks: cross-module reactive logic
- src/types: domain typing

## Run Locally

1. Install dependencies
   npm install
2. Start development server
   npm run dev
3. Run lint checks
   npm run lint
4. Build production bundle
   npm run build

## Demo Credentials

- Username: test@medicaore.com
- Password: testpass123

## Firebase Setup

Firebase config is loaded from Vite environment variables.

1. Copy .env.example to .env
2. Fill the Firebase values in .env
3. Restart the dev server

Required variables:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

## Deployment

This project can be deployed on Vercel or Netlify.

### Vercel Quick Steps

1. Push repository to GitHub
2. Import project in Vercel
3. Use default build command: npm run build
4. Use default output directory: dist
5. Add environment variables (if Firebase config is externalized)
6. Deploy

## Final Submission Checklist

- Code pushed to GitHub repository
- Live deployed URL added below
- Core assignment features verified

Live URL: Add deployed link here

## Current Known Gaps

- ESLint currently reports a few hook rule violations that should be cleaned before final evaluation.
- Micro-frontend architecture is not included.

## Build Status Snapshot

- Production build: Passing
- Lint: Failing due to a small set of actionable hook warnings/errors
