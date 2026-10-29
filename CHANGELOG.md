# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-29

### Added

- A shared Express 5 application for Vercel Functions and traditional Node.js
  hosting platforms such as Render.
- A single Vercel Function entry point that handles all `/api/*` routes.
- Modular API routes, middleware, JSON-file helpers, and MongoDB connection
  management.
- Health, static JSON, users, and MongoDB-backed fruit endpoints.
- Middleware that rejects POST requests to the API with a `405` response.
- A users JSON data source rendered by the React About page.
- Separate client and server TypeScript configurations and production builds.
- Environment variable documentation and a safe `.env.example` template.
- Local development workflows for standalone Express and `vercel dev`.

### Changed

- Rebuilt the frontend on the latest official Vite React and TypeScript
  template foundation.
- Upgraded React, React Router, Vite, TypeScript, MongoDB, and supporting
  dependencies.
- Replaced the previous lint configuration with Oxlint.
- Updated the homepage to explain that its markup is rendered from API JSON.
- Updated the About page to load and display users from `/api/users`.
- Added explicit loading, empty, and error states for frontend API requests.
- Updated the required runtime to Node.js 24.x.
- Expanded the README with development, build, Vercel, Render, MongoDB, and
  environment configuration instructions.
- Generalized Vercel SPA routing while preserving Vite development modules and
  API routing.

### Removed

- The previous collection of individual JavaScript Vercel Functions.
- The legacy ESLint configuration.

[1.0.0]: https://github.com/smohadjer/boilerplate-mern-serverless-vite/releases/tag/v1.0.0
