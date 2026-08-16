# Portfolio Website

Personal portfolio for Luke Payne, built to highlight selected full-stack products, AI systems, local-first tooling, and reproducible engineering case studies.

## Stack

- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- lucide-react
- Firebase deploy script

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the static export:

```bash
npm run build
```

Validate the Lab artifact contract and the completed static export:

```bash
npm run validate:lab
npm run validate:lab:build
```

Run the configured lint command:

```bash
npm run lint
```

Deploy with Firebase:

```bash
npm run deploy
```

Generate icon assets:

```bash
npm run generate-icons
```

## Content

Project content is curated from selected personal projects and case studies. The strongest current project emphasis is maintained in `app/data/portfolio.ts`, then rendered across the homepage and projects page.

OpenClaw Lab publications are structured JSON artifacts in `content/lab`. See
[`content/lab/README.md`](content/lab/README.md) for the schema, manual publishing workflow, static route generation,
public-disclosure rules, and the intended future candidate-review boundary.
