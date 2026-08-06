# MyPlace

Personal website and blog monorepo.

## Architecture

This repository contains two independent applications managed with npm workspaces:

```text
MyPlace/
├── apps/
│   ├── web/   # React 18 + Vite frontend, Vercel serverless functions
│   └── api/   # Express + SQLite blog API
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

The frontend reads the backend URL from `VITE_API_URL`. No production API URL is hardcoded.

## Requirements

- Node.js 22+
- npm
- SQLite-compatible filesystem storage for the backend database

## Install

Install every workspace dependency from the repository root:

```bash
npm install
```

There should be one lockfile only: `package-lock.json` in the root.

## Local Environment

Create local env files from the examples:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
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
DATABASE_PATH=./data/myplace.sqlite
CORS_ORIGIN=http://localhost:5173
ADMIN_USER=admin
ADMIN_TOTP_SECRET=
ADMIN_SESSION_SECRET=
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

The default local URLs are:

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

The backend currently has no automated test suite; it is validated with runtime/API checks.

## API

Public endpoints:

```text
GET /health
GET /posts
GET /posts/:slug
```

Protected mutation endpoints:

```text
POST /posts
PATCH /posts/:id
DELETE /posts/:id
```

Compatibility admin endpoints are also available behind the same authentication middleware:

```text
GET /admin/posts
GET /admin/posts/id/:id
GET /admin/posts/slug/:slug
POST /admin/posts
PATCH /admin/posts/:id
DELETE /admin/posts/:id
```

## Backend Authentication

The backend is designed for one administrator, not a full user system.

Login endpoint:

```text
POST /auth/login
```

Request body:

```json
{
  "username": "admin",
  "code": "123456"
}
```

`code` is a 6-digit TOTP generated from `ADMIN_TOTP_SECRET`. A successful login returns a signed bearer token with a 2-hour expiry. Protected routes require:

```text
Authorization: Bearer <token>
```

Production must define both:

```text
ADMIN_TOTP_SECRET
ADMIN_SESSION_SECRET
```

No admin secret is hardcoded in the repository.

## CORS

Configure allowed frontend origins with `CORS_ORIGIN`.

Examples:

```text
CORS_ORIGIN=http://localhost:5173
CORS_ORIGIN=https://www.mylifeblike.com
CORS_ORIGIN=http://localhost:5173,https://www.mylifeblike.com
```

The backend does not default to `*`.

## SQLite

The backend uses `better-sqlite3`.

Local default:

```text
apps/api/data/myplace.sqlite
```

The actual location is controlled by:

```text
DATABASE_PATH
```

Database files are ignored by git:

```text
*.sqlite
*.sqlite-*
*.db
apps/api/data/
```

### Migrating an Existing SQLite Database

Before moving or deploying an existing database, stop the old backend process and make a backup:

```bash
sqlite3 path/to/data.sqlite ".backup 'backup-before-migration.sqlite'"
```

Copy the database, WAL, and SHM files if they exist:

```text
data.sqlite
data.sqlite-wal
data.sqlite-shm
```

Then set `DATABASE_PATH` in the new backend environment to the copied database path.

For production, place the database on persistent storage, for example:

```text
DATABASE_PATH=/var/lib/myplace/myplace.sqlite
```

If using a VPS, ensure the process user can read and write that directory. Back up the database before every deploy that changes schema or backend persistence behavior.

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

The backend is deployable separately on any Node.js 22 environment.

Typical VPS setup:

```bash
cd /opt/myplace
npm install --omit=dev
npm run start:api
```

Required production variables:

```text
NODE_ENV=production
PORT=4000
DATABASE_PATH=/var/lib/myplace/myplace.sqlite
CORS_ORIGIN=https://www.mylifeblike.com
ADMIN_USER=admin
ADMIN_TOTP_SECRET=<totp secret>
ADMIN_SESSION_SECRET=<long random signing secret>
```

Use a process manager such as systemd or PM2. The server handles `SIGINT` and `SIGTERM` by closing the HTTP server and SQLite connection.

Minimal systemd shape:

```ini
[Service]
WorkingDirectory=/opt/myplace
ExecStart=/usr/bin/npm run start:api
Restart=always
Environment=NODE_ENV=production
Environment=PORT=4000
Environment=DATABASE_PATH=/var/lib/myplace/myplace.sqlite
Environment=CORS_ORIGIN=https://www.mylifeblike.com
Environment=ADMIN_USER=admin
Environment=ADMIN_TOTP_SECRET=replace-me
Environment=ADMIN_SESSION_SECRET=replace-me
```

## Migration from `Ho3pLi/MyPlaceBackend`

The backend source was imported into `apps/api`. The old repository should not be deleted automatically.

Recommended manual process:

1. Verify local monorepo development.
2. Deploy the new backend and frontend configuration.
3. Confirm blog reads and protected writes work.
4. Back up any existing SQLite database.
5. Update documentation or GitHub repository description for `Ho3pLi/MyPlaceBackend`.
6. Archive `Ho3pLi/MyPlaceBackend` only after production has been stable.

If preserving backend git history becomes important, import it with `git subtree` before archiving the old repository:

```bash
git subtree add --prefix=apps/api git@github.com:Ho3pLi/MyPlaceBackend.git main
```

This migration did not use subtree, so the existing `Ho3pLi/MyPlace` history remains intact and backend source appears as newly added files.

## Notes

- Do not deploy from this migration automatically.
- Do not commit real secrets or SQLite databases.
- The old `MyPlaceBackend/data/data.sqlite` was not copied into this repository.
