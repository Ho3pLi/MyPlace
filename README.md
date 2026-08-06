# MyPlace

Personal website and blog monorepo.

## Architecture

```text
MyPlace/
├── apps/
│   ├── web/   # React 18 + Vite frontend, Vercel serverless functions
│   └── api/   # temporary Express API, currently health-check only
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

The frontend reads the backend URL from `VITE_API_URL`. No production API URL is hardcoded.

The backend is intentionally minimal right now because it will be rebuilt. It only exposes `/health`.

## Requirements

- Node.js 22+
- npm

The repository includes `.node-version` with `22`.

## Install

Install every workspace dependency from the repository root:

```bash
npm install
```

There should be one lockfile only: `package-lock.json` in the root.

## Local Environment

Create local env files from the examples.

macOS/Linux:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

Windows PowerShell:

```powershell
Copy-Item apps/web/.env.example apps/web/.env
Copy-Item apps/api/.env.example apps/api/.env
```

`apps/web/.env.example`:

```text
VITE_API_URL=http://localhost:4000
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

`apps/api/.env.example`:

```text
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

Do not commit real `.env` files. They are ignored by git.

## Development

Run frontend and backend together:

```bash
npm run dev
```

Run only the frontend:

```bash
npm run dev:web
```

Run only the backend:

```bash
npm run dev:api
```

Default local URLs:

- Web: `http://localhost:5173`
- API: `http://localhost:4000`
- API health: `http://localhost:4000/health`

## Build and Test

From the root:

```bash
npm run build
npm test
```

Specific workspace commands:

```bash
npm run build:web
npm run test:web
npm run start:api
```

The backend currently has no test suite because it is a temporary health-check service.

## API

Current backend endpoint:

```text
GET /health
```

All other API routes currently return `404`.

The blog frontend still calls `VITE_API_URL/posts`; until the backend is rebuilt, the blog shows a friendly unavailable message when that endpoint is missing.

## CORS

Configure allowed frontend origins with `CORS_ORIGIN`.

Examples:

```text
CORS_ORIGIN=http://localhost:5173
CORS_ORIGIN=https://www.mylifeblike.com
CORS_ORIGIN=http://localhost:5173,https://www.mylifeblike.com
```

The backend does not default to `*`.

## Frontend Deploy on Vercel

Recommended Vercel project settings:

```text
Root Directory: apps/web
Install Command: cd ../.. && npm install
Build Command: cd ../.. && npm run build:web
Output Directory: dist
```

Required frontend variables:

```text
VITE_API_URL=<production backend URL>
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Serverless variables used by `apps/web/api/eadcnwapi.mjs`:

```text
verificationCode=
endpoint=
```

`apps/web/vercel.json` keeps the React Router SPA fallback and the `/api/*` rewrite for Vercel functions.

## Backend Deploy

The backend can be deployed separately on any Node.js 22 environment.

Production variables:

```text
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://www.mylifeblike.com
```

Typical VPS start:

```bash
npm install --omit=dev
npm run start:api
```

The server handles `SIGINT` and `SIGTERM` by closing the HTTP server cleanly.

## Migration from `Ho3pLi/MyPlaceBackend`

`Ho3pLi/MyPlaceBackend` was analyzed, but the backend is now intentionally reduced to a health-check service because the API will be rebuilt.

Do not delete or archive `MyPlaceBackend` until the new backend has been implemented, tested, and deployed.

If you later want to preserve backend history in this monorepo, import it with `git subtree` before archiving the old repository:

```bash
git subtree add --prefix=apps/api git@github.com:Ho3pLi/MyPlaceBackend.git main
```

## Notes

- Do not deploy automatically from this migration.
- Do not commit real secrets.
- Do not commit SQLite databases or other local runtime data.
