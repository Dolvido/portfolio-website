# Luke Payne — Portfolio

Portfolio and engineering case studies for AI, backend, and full-stack roles.

- **Website:** [https://lukepayne.web.app/](https://lukepayne.web.app/)
- **GitHub:** [https://github.com/Dolvido](https://github.com/Dolvido)
- **LinkedIn:** [https://www.linkedin.com/in/lukepaynesci/](https://www.linkedin.com/in/lukepaynesci/)

## Selected work

The homepage features LLM Tool Calling Lab alongside the existing selected work: Brain in Computer (BiC), NASA CMR AI Agent, AutoAgent, Smart Image Insights, Fuguely, and PRIM. Featured entries are maintained in `app/data/portfolio.ts`.

| Project | Focus | Source availability |
| --- | --- | --- |
| [LLM Tool Calling Lab](https://lukepayne.web.app/projects/llm-tool-calling-lab/) | Controlled comparison of generic tool calling and added planning, with frozen synthetic evidence and negative findings | Public experimental v0.1.0 |
| [Brain in Computer (BiC)](https://github.com/Dolvido/BiC) | Verified English curricula, local tutor experiments, and measured learning limits | Public research prototype |
| [AutoAgent](https://github.com/Dolvido/AutoAgent) | Local code review, structured findings, feedback, and example retrieval | Public experimental prototype |
| [Fuguely](https://lukepayne.web.app/projects/fuguely/) | Music-teacher scheduling, booking, communication, and billing workflows | Private source; public case study |
| [PRIM](https://lukepayne.web.app/projects/prim/) | Deterministic simulation, experiment comparison, replay, and inspection tools | Private source; public case study |
| [NASA CMR AI Agent](https://github.com/Dolvido/NASA_CMR_AGENT) | Independent assessment project using public NASA CMR APIs | Public repository |
| [Smart Image Insights](https://github.com/Dolvido/smart-image-insights) | Detection and captioning interface with a separate inference service | Public prototype |
| [Document Q&A Search](https://github.com/Dolvido/document_qa_sample) | PDF extraction and keyword-matched snippets with filename references | Public prototype |

Project descriptions distinguish implemented behavior from future work. Private-project case studies summarize design decisions without publishing their source. Prototype deployment links are retained, but do not imply a current availability guarantee.

## Stack

This website uses Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, and lucide-react. It builds a static export for Firebase Hosting. Project case-study stacks describe those separate projects, not the portfolio application.

## Local development

Use the committed lockfile to install dependencies:

```bash
npm ci
npm run dev
```

Build and validate the static export:

```bash
npm run validate:lab
npm run lint
npm run build
npm run validate:lab:build
```

The exported site is written to `out/`.

## Content and routes

- `app/data/portfolio.ts`: profile links, project descriptions, case studies, resume content, and selected ideas.
- `app/page.tsx`: homepage; displays every project marked `featured`, in data order, with links to its case study.
- `app/projects/page.tsx`: full project index.
- `app/projects/[id]/page.tsx`: static case-study routes generated from project IDs.
- `content/lab/`: structured OpenClaw Lab publication artifacts.

See [the Lab content guide](content/lab/README.md) for its schema, publication workflow, and disclosure boundaries.

## Deployment and assets

Firebase Hosting workflows are configured in `.github/workflows/`. The existing manual deployment command is:

```bash
npm run deploy
```

It builds the site and invokes the Firebase CLI; deployment requires an authenticated Firebase environment.

Regenerate icon assets with `npm run generate-icons`.
