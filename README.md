# Creditt

Creditt is a web application built with React and TypeScript.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (via @supabase/supabase-js)

## Getting started

### Prerequisites

- Node.js 18+ (recommended)
- npm (or your preferred package manager)

### Install

```bash
git clone https://github.com/h55n/Creditt.git
cd Creditt
npm install
```

### Run locally

```bash
npm run dev
```

Then open the URL printed by Vite (typically http://localhost:5173).

### Build

```bash
npm run build
```

### Preview a production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration

This project may require environment variables for Supabase and other services.

- Prefer using a local `.env` file for development.
- If a `.env.example` file exists, copy it and fill in values.
- Search the codebase for `import.meta.env` to see what variables are read by the app.

> Security note: Never commit secrets (API keys, service role keys, etc.) to the repository.

## Project structure (high level)

- `src/` — application code
- `public/` — static assets
- `supabase/` — Supabase configuration/migrations (if applicable)

## Contributing

1. Create a feature branch
2. Make changes
3. Run lint/build
4. Open a pull request

## License

Add a LICENSE file if you plan to distribute this project.