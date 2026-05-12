# Welcome Assignment - URL Shortener

A simple URL shortener built with Next.js 15 App Router, TypeScript, Tailwind CSS, and SQLite via `better-sqlite3`.

## Features

- Create short links from long URLs.
- Visit a short link at `/{code}` and redirect to the original URL.
- Track click counts for each short link.
- Update click counts in the dashboard without refreshing the page.

## Requirements

- Node.js `22.12.0`
- npm `11.7.0`

This project includes a Volta pin in `package.json`, so if you use Volta the correct Node and npm versions will be selected automatically.

## Setup

Install dependencies:

```bash
npm install
```

If `better-sqlite3` was installed with a different Node version, rebuild it:

```bash
npm rebuild better-sqlite3
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Database

The app uses SQLite. On startup, the server database module creates:

```text
data/app.db
```

The database includes a `links` table with:

- `id`
- `code`
- `original_url`
- `click_count`
- `created_at`

The `data/` directory is runtime data and should not be committed.

## Scripts

Run linting:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npx tsc --noEmit
```

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## Notes

Please disable client validation on forms for the server testing.
