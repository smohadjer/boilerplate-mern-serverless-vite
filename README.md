# MERN serverless Vite boilerplate

[Express version on Render](https://boilerplate-mern-2pt9.onrender.com/)

[Serverless version on Vercel](https://boilerplate-react-serverless-vite.vercel.app/)

A React and TypeScript single-page app built with Vite, backed by one shared
Express application. The same API runs as Vercel Functions or as a traditional
Node.js process on services such as Render.

## Requirements

- Node.js 24.x
- A MongoDB connection string for the database-backed example

## Local development

```sh
npm install
cp .env.example .env
npm run dev
```

Vite serves the frontend at `http://localhost:5173` and proxies `/api` requests
to Express at `http://localhost:3000`.

Set `DB_URI` in `.env` to enable MongoDB:

```dotenv
DB_URI=mongodb+srv://username:password@example.mongodb.net/?retryWrites=true&w=majority
```

Without `DB_URI`, the MongoDB route returns a clear `503` response. The static
JSON example and the rest of the application remain available.

`.env.example` is committed documentation containing placeholder values only;
the application does not load it. The real `.env` file is ignored by Git and is
only needed when running the standalone Express server with `npm run dev` or
`npm start` outside a hosting platform.

### Environment files

| File | Purpose |
| --- | --- |
| `.env.example` | Committed template showing the variables the app supports. It contains no real credentials. |
| `.env` | Local configuration for the standalone Express server, including `DB_URI`. It is loaded by `dotenv` and ignored by Git. |

To configure standalone Express for the first time:

```sh
cp .env.example .env
```

Replace the placeholder `DB_URI` in `.env` with the real MongoDB connection
string. Do not commit `.env` or copy the Vercel OIDC token into it.

This project does not require `.env.local`. Vercel CLI may create one containing
a short-lived `VERCEL_OIDC_TOKEN`; it can be removed unless the application is
intentionally using Vercel OIDC federation.

## API routes

- `GET /api/health` checks the Express service.
- `GET /api/json-server` reads the example data from `data/data.json`.
- `GET /api/users` reads the example users from `data/users.json`.
- `GET /api/index` and `GET /api/fruits` read up to 100 fruits from MongoDB.

## Checks and production build

```sh
npm run lint
npm run typecheck
npm run build
```

`npm run build` creates the Vite client in `dist/` and compiles the Node server
to `dist-server/`. Run the production Node build with:

```sh
NODE_ENV=production npm start
```

The server honors the platform-provided `PORT` environment variable and serves
both the API and the compiled SPA.

## Vercel

Vercel discovers `api/index.ts` as the function entry point. `vercel.json`
routes all `/api/*` requests into the shared Express app and sends the configured
client-side routes to the SPA entry point.

The `engines.node` setting in `package.json` pins builds and functions to the
latest available Node.js 24 release.

Add `DB_URI` in the Vercel project environment and select the environments that
need it: Development, Preview, and/or Production. Vercel injects the value into
`process.env.DB_URI` when it runs the function, so the database URI does not need
to exist in a committed file or in the root `.env`.

### Test locally with Vercel

Use `vercel dev` when you want to test the Vercel Function and the rewrites in
`vercel.json`, rather than the standalone Express development server. Stop any
existing `npm run dev` process first so port 3000 is available.

```sh
npx vercel login
npx vercel link
npx vercel pull --environment=development
npx vercel dev --listen 3000
```

Set `DB_URI` for the Development environment in the linked Vercel project
before running `vercel pull`. The command stores project settings and
Development variables in Vercel's ignored `.vercel/` cache. `vercel dev` then
injects them into the function process; it does not need to copy `DB_URI` into
the root `.env` or `.env.local` file.

You can confirm that the variable is configured without displaying its value:

```sh
npx vercel env ls development
```

`DB_URI` is supplied to `vercel dev` from the linked project's Development
environment. A local `.env.local` file is not required.

You can then open:

- App: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`
- Static JSON API: `http://localhost:3000/api/json-server`
- Users API: `http://localhost:3000/api/users`
- MongoDB API: `http://localhost:3000/api/index`

Use `npm run dev` for everyday Vite and standalone Express development. Use
`vercel dev` when you specifically need to reproduce Vercel's local routing and
function environment.

## Render or another Node host

Use these service settings:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment: `NODE_ENV=production` and `DB_URI=<your MongoDB URI>`
- Runtime: Node.js 24.x

Any Node host that provides a `PORT` variable can use the same commands.
