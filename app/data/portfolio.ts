export const profile = {
  name: "Luke Payne",
  role: "AI / Full-Stack Software Engineer",
  location: "Virginia, United States",
  email: "lukecello@gmail.com",
  phone: "(540) 322-6547",
  phoneHref: "tel:+15403226547",
  portfolio: "https://lukepayne.web.app/",
  portfolioLabel: "lukepayne.web.app",
  github: "https://github.com/Dolvido",
  githubLabel: "@Dolvido",
  linkedin: "https://www.linkedin.com/in/lukepaynesci/",
  linkedinLabel: "in/lukepaynesci",
  status: "Open to work",
};

export const navItems = [
  { href: "/", label: "Index" },
  { href: "/projects", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/resume", label: "Resume" },
];

export const overviewRows = [
  { label: "Role", value: profile.role },
  { label: "Focus", value: "Agentic workflows / Local-first tools / Retrieval systems / Product APIs" },
  { label: "Quality", value: "Vitest / pytest / Playwright / Docker / Deployment checks" },
  { label: "Experience", value: "Full-stack products / AI systems / Simulation / Developer automation" },
];

export type PortfolioProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  highlights: string[];
  status?: string;
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl: string;
  disclaimer?: string;
  caseStudy: {
    source: string;
    problem: string;
    approach: string[];
    example: string;
    insights: string[];
  };
};

export const projects: PortfolioProject[] = [
  {
    id: "fuguely",
    category: "Full-Stack Product",
    title: "Fuguely",
    status: "Private beta",
    featured: true,
    caseStudyUrl: "/projects/fuguely",
    description: "Music lesson scheduling platform for private teachers and students, connecting studio onboarding, teacher availability, student bookings, messaging, billing workflows, and email confirmations.",
    tags: [
      "TypeScript",
      "Scheduling",
      "Stripe",
      "Messaging"
    ],
    highlights: [
      "Teacher onboarding, student rosters, and invitation flows.",
      "Teacher availability and student lesson booking.",
      "Messaging and confirmation emails around the lesson workflow.",
      "Billing, cancellations, refunds, and lesson-credit workflows."
    ],
    caseStudy: {
      source: "Private product workflow case study",
      problem: "Independent music teachers need to coordinate lesson times, student bookings, messages, and payment state. A useful studio tool must keep those workflows connected while preserving clear rules for availability, cancellations, and credits.",
      approach: [
        "Separate teacher and student workflows so each role can find its next action quickly.",
        "Model availability, booking, cancellation, and lesson credits as explicit state transitions.",
        "Keep scheduling, billing, and email responsibilities separate so a provider change or delivery failure does not obscure the lesson state."
      ],
      example: "A teacher publishes available lesson windows and a student reserves a slot. The surrounding workflow coordinates confirmations, messages, and billing state; cancellation handling distinguishes a lesson credit from a payment-method refund.",
      insights: [
        "Scheduling products depend on consistent state across the calendar, communications, and billing.",
        "Complete teacher and student journeys are useful units for product validation.",
        "Clear cancellation and credit rules matter as much as the booking form."
      ]
    }
  },
  {
    id: "prim",
    category: "Simulation / Experiment Tools",
    title: "PRIM",
    status: "Local simulation prototype",
    featured: true,
    caseStudyUrl: "/projects/prim",
    disclaimer:
      "Deterministic simulation with pluggable predictors; this prototype does not train a reinforcement-learning model.",
    description:
      "Deterministic local-first React/TypeScript simulation for studying a prediction-driven digital organism, with seeded runs, compare mode, batch experiments, ablation workbench, evidence packets, and Vitest coverage.",
    tags: ["React", "TypeScript", "Vite", "Zustand", "Vitest", "Simulation"],
    highlights: [
      "Seeded deterministic runs for reproducible simulation behavior.",
      "Compare mode, batch experiments, and ablation workbench.",
      "Evidence packets for inspecting state transitions and outcomes.",
      "Vitest coverage around simulation logic and invariants.",
    ],
    caseStudy: {
      source: "Local research brief",
      problem:
        "Exploratory simulation work can produce interesting behavior that is difficult to reproduce or compare. PRIM was framed around the opposite constraint: if a prediction-driven digital organism changes behavior, the system should make the run, seed, configuration, and evidence inspectable.",
      approach: [
        "Make seeded runs the default unit of study so experiments can be replayed instead of only observed once.",
        "Add compare mode, batch experiments, and an ablation workbench to compare predictor and policy behavior under controlled configurations.",
        "Use evidence packets and Vitest coverage to make state transitions and simulation invariants visible.",
      ],
      example:
        "A researcher can run the same seed across two configurations, compare the resulting behavior, then remove one mechanism in the ablation workbench to see whether the outcome depends on that mechanism or on incidental setup.",
      insights: [
        "Reproducibility is a feature, not a cleanup task, in simulation tooling.",
        "Ablations are easier to trust when the UI and test suite share the same deterministic assumptions.",
        "Evidence packets turn surprising behavior into something that can be reviewed and discussed.",
      ],
    },
  },
  {
    id: "nasa-cmr-agent",
    category: "AI / Data Search",
    title: "NASA CMR AI Agent",
    status: "Public repository",
    featured: true,
    githubUrl: "https://github.com/Dolvido/NASA_CMR_AGENT",
    caseStudyUrl: "/projects/nasa-cmr-agent",
    disclaimer:
      "Independent interview/assessment project using public NASA CMR APIs. Not an official NASA or Earthdata product.",
    description:
      "Interview assessment project: async multi-agent LangGraph pipeline that interprets natural-language Earth science queries, infers spatial/temporal bounds, queries NASA CMR collections/granules/variables, streams graph events, and synthesizes results through FastAPI.",
    tags: ["Python", "FastAPI", "LangGraph", "NASA CMR", "Chroma", "pytest"],
    highlights: [
      "Natural-language Earth science query interpretation with spatial and temporal inference.",
      "Async LangGraph pipeline for collection, granule, and variable search.",
      "FastAPI surface that streams graph events and synthesizes results.",
      "pytest coverage around agent behavior and API integration boundaries.",
    ],
    caseStudy: {
      source: "GitHub README: Dolvido/NASA_CMR_AGENT",
      problem:
        "NASA CMR is powerful, but natural-language Earth science questions need to be converted into precise search parameters before collection, granule, and variable search becomes useful. The README calls out that CMR reliability depends on good parameterization, so the project centers on planning and validation before synthesis.",
      approach: [
        "Build an async LangGraph pipeline with separate intent, validation, CMR search, analysis, synthesis, retrieval, and provider-routing modules.",
        "Infer temporal and spatial bounds, then search collections, granules, and variables through the CMR API instead of treating the agent response as a single prompt.",
        "Expose both `/query` for final JSON state and `/stream` for text/event-stream progress so intermediate graph behavior is inspectable.",
        "Use local Chroma persistence for semantic context while keeping NASA CMR as the authoritative data-search surface.",
      ],
      example:
        "A query such as \"Compare precipitation datasets in Sub-Saharan Africa 2015-2023\" can be planned into geography, date range, and science-topic constraints, routed through collection and granule search, and streamed back as graph events before a synthesized answer is returned.",
      insights: [
        "Agent quality improves when search parameterization is treated as a first-class planning step.",
        "Streaming graph events are useful for debugging because they reveal where intent, retrieval, or synthesis decisions happen.",
        "A local vector store is best used as supporting context, not as a replacement for the structured CMR API.",
      ],
    },
  },
  {
    id: "ai-companion",
    category: "Local-First AI",
    title: "AI Companion",
    status: "Private local system",
    featured: true,
    caseStudyUrl: "/projects/ai-companion",
    description:
      "Local-first modular conversational system with single-writer routing, explicit workspace state, draft-vs-commit streaming, interrupt handling, event logs, replay, modular LLM backends, and SQLite memory provenance.",
    tags: ["Python", "Ollama", "Pydantic", "SQLite", "Local LLMs", "CLI"],
    highlights: [
      "Single-writer routing and explicit workspace state boundaries.",
      "Draft-vs-commit streaming with interrupt handling.",
      "Event logs and replay for inspectable local behavior.",
      "SQLite memory provenance and modular LLM backend support.",
    ],
    caseStudy: {
      source: "Private local-system brief",
      problem:
        "A local AI companion needs to feel responsive while still protecting workspace state from accidental or conflicting writes. The core design issue is not only which model responds, but which component is allowed to commit state and how those commits can be inspected later.",
      approach: [
        "Use single-writer routing so one path owns committed workspace changes.",
        "Separate draft-vs-commit streaming, allowing partial responses to be interrupted without pretending they are durable state.",
        "Persist event logs, replay data, and SQLite-backed memory provenance so behavior remains inspectable across sessions.",
        "Keep LLM backends modular, including local Ollama-style backends, so the system is not coupled to one provider.",
      ],
      example:
        "A conversation can stream a draft response, accept an interrupt, then commit only the chosen state transition while preserving an event trail that explains which memory records or workspace changes were touched.",
      insights: [
        "Local-first agents need state discipline more than they need a larger prompt.",
        "Draft and committed output should be visibly different concepts in any system that can write to a workspace.",
        "Memory provenance makes long-running assistants easier to trust and debug.",
      ],
    },
  },
  {
    id: "smart-image-insights",
    category: "Computer Vision",
    title: "Smart Image Insights",
    status: "Inference prototype",
    demoUrl: "https://smart-image-insights.vercel.app",
    githubUrl: "https://github.com/Dolvido/smart-image-insights",
    caseStudyUrl: "/projects/smart-image-insights",
    description: "Multi-image analysis prototype with a Next.js interface and a separate FastAPI inference service. The upload workflow displays YOLOv5 object detections and BLIP scene captions; the backend also includes CLIP/FAISS image retrieval.",
    tags: [
      "Next.js",
      "FastAPI",
      "YOLOv5",
      "BLIP",
      "CLIP",
      "FAISS"
    ],
    highlights: [
      "Multi-image upload with per-image analysis and result state.",
      "YOLOv5 object detections and BLIP-generated scene captions.",
      "Separate frontend and model-serving API.",
      "Supporting CLIP embeddings and FAISS retrieval in the backend."
    ],
    disclaimer: "Prototype deployment link; availability depends on the hosted inference service. The main upload interface presents detection and captioning results.",
    caseStudy: {
      source: "Public frontend and inference-service implementation",
      problem: "Image-analysis tools need to connect image upload, model execution, and result presentation. Smart Image Insights explores that workflow with detection and captioning while keeping model-serving responsibilities separate from the web interface.",
      approach: [
        "Use Next.js and Tailwind for multi-image upload and per-image result presentation.",
        "Send analysis requests to a separate FastAPI inference service that runs YOLOv5 detection and BLIP captioning.",
        "Keep the backend's CLIP/FAISS retrieval capability distinct from the detection-and-caption upload interface.",
        "Present inference failures as retryable errors and keep generated captions distinct from classification results."
      ],
      example: "A user uploads several images and analyzes them individually. Successful responses show detected objects and a generated caption; a failed request remains an error that the user can retry.",
      insights: [
        "Per-image state helps a batch workflow stay understandable when one request fails.",
        "Detection, captioning, and retrieval are different capabilities and should be labeled separately.",
        "Separating model serving from the frontend makes deployment boundaries easier to maintain."
      ]
    }
  },
  {
    id: "document-qa-chatbot",
    category: "Document Search",
    title: "Document Q&A Search",
    status: "Keyword-search prototype",
    demoUrl: "https://document-qa-lukepayne.vercel.app/",
    githubUrl: "https://github.com/Dolvido/document_qa_sample",
    caseStudyUrl: "/projects/document-qa-chatbot",
    description: "Next.js and TypeScript document-search prototype that extracts PDF text and answers queries with keyword-matched snippets and filename references. File limits, bounded parsing, timeout handling, and clear errors support the upload workflow.",
    tags: [
      "Next.js",
      "TypeScript",
      "PDF.js",
      "Keyword Search",
      "Document Parsing"
    ],
    highlights: [
      "PDF text extraction with bounded processing.",
      "Keyword-based query matching against document text.",
      "Matched snippets accompanied by source filenames.",
      "Upload limits, timeout handling, and visible error states."
    ],
    disclaimer: "The current query path returns matching text snippets. It does not call an LLM or generate embeddings. The deployment link is retained as a prototype demo.",
    caseStudy: {
      source: "Public PDF and chat API routes",
      problem: "A small document-search tool must make uploaded text usable without letting large files or slow parsing leave the interface stuck. This prototype focuses on bounded PDF processing and a transparent keyword-based retrieval path.",
      approach: [
        "Extract PDF text with PDF.js in a Node.js API route, with bounded page processing and a limited fallback parser.",
        "Process questions through keyword matching and return relevant document snippets with filename references.",
        "Apply upload limits and client/server timeout handling so failures become visible states.",
        "Keep storage access defensive and distinguish retrieved source text from a generated answer."
      ],
      example: "A user uploads a PDF and asks about a term in the document. The query route returns matching passages and their filenames when it finds relevant text; upload and parsing failures produce an explanation in the interface.",
      insights: [
        "Simple retrieval is useful when its limits and source text remain visible.",
        "File-size and parsing limits define the experience just as much as the search logic.",
        "Calling a response a retrieved snippet makes the system's behavior clearer than implying model-generated reasoning."
      ]
    }
  },
  {
    id: "autopycode",
    category: "Developer Tools",
    title: "AutoPyCode",
    status: "Private local tool",
    caseStudyUrl: "/projects/autopycode",
    description:
      "Local-only Python coding engine that runs against a target repo, applies task constraints, executes quality gates, and writes run artifacts including patches, gate results, logs, and reports.",
    tags: ["Python", "pytest", "CLI", "Code Automation", "Local-First"],
    highlights: [
      "Runs locally against target repositories without external code upload.",
      "Applies task constraints and executes configured quality gates.",
      "Writes reproducible run artifacts: patches, gate results, logs, and reports.",
      "Designed for inspectable automation rather than opaque code generation.",
    ],
    caseStudy: {
      source: "Private local-tool brief",
      problem:
        "Automated coding tools become risky when they hide what changed or skip the same quality gates a developer would run manually. AutoPyCode is framed as a local-only engine that works against a target repository while leaving an auditable trail.",
      approach: [
        "Run locally against target repositories so source code does not need to be uploaded to an external service.",
        "Apply task constraints before execution so the automation has explicit boundaries.",
        "Run configured quality gates and write artifacts such as patches, gate results, logs, and reports for review.",
      ],
      example:
        "A task can be pointed at a repository, constrained to a narrow change, executed with tests or checks, and then reviewed through the generated patch and gate report before anything is accepted.",
      insights: [
        "Useful code automation should produce reviewable evidence, not just edited files.",
        "Quality gates work best when they are part of the automation contract rather than an afterthought.",
        "Local execution makes the tool more practical for private repositories and sensitive codebases.",
      ],
    },
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export const capabilities = [
  {
    code: "A",
    title: "Full-Stack Product Engineering",
    body: "React / Vite / Next.js / Node / FastAPI / Postgres / API design / booking and billing workflows",
  },
  {
    code: "B",
    title: "AI Systems & Agents",
    body: "LangGraph / RAG / NASA CMR search / retrieval workflows / streaming events / bounded agent state",
  },
  {
    code: "C",
    title: "Local-First Tooling",
    body: "Ollama / SQLite provenance / CLI workflows / deterministic simulation / local-only code automation",
  },
  {
    code: "D",
    title: "Reproducible Engineering",
    body: "Vitest / pytest / Playwright / Docker / seeded runs / release checks / artifacted quality gates",
  },
];

export const resumeSummary =
  "AI / Full-Stack Software Engineer with experience building production-oriented LLM applications, backend platforms, observability systems, automated test infrastructure, and applied AI tools. Recent work includes AI application engineering for a federal science program through ADNET Systems, contributing across Python/FastAPI services, TypeScript/Next.js interfaces, Dockerized development environments, Playwright E2E testing, and multi-service observability. Strong fit for AI software engineering, backend AI platforms, LLM application development, and applied AI product engineering roles.";

export const resumeSkillGroups = [
  {
    title: "AI / LLM Systems",
    body: "LLM application development / prompt engineering / agent workflows / RAG / vector databases / OpenAI API / Claude / Ollama / LangChain / MCP / LiteLLM / Instructor / evaluation workflows",
  },
  {
    title: "Backend",
    body: "Python / FastAPI / REST APIs / Pydantic / Alembic / PostgreSQL / Redis / Docker",
  },
  {
    title: "Frontend",
    body: "TypeScript / JavaScript / React / Next.js / Node.js",
  },
  {
    title: "Testing / Observability",
    body: "Playwright / GitHub Actions / Logfire / Loguru / structured tracing / token usage tracking / CI workflows",
  },
  {
    title: "Modeling / Data",
    body: "TensorFlow / YOLOv5 / data pipelines / model training datasets / experimentation",
  },
  {
    title: "Tools",
    body: "Git / GitHub / Linux and Windows development environments / agile development / code review / technical documentation",
  },
];

export const experience = [
  {
    dates: "Sep 2025 - Jun 2026",
    title: "ADNET Systems Inc.",
    detail: "Software Engineer, AI Applications / Federal Science Program, Remote",
    bullets: [
      "Supported backend services, developer tooling, and prototype AI application workflows for a federal science program.",
      "Built observability and usage-reporting patterns for multi-service LLM applications using common Python and TypeScript tooling.",
      "Developed CI-ready end-to-end testing workflows to improve authentication, API, database, and UI reliability.",
      "Contributed backend API, persistence, migration, local development, and containerized workflow improvements.",
      "Worked across Python, FastAPI, TypeScript, Next.js, PostgreSQL, Redis, Docker, GitHub Actions, and Playwright.",
      "Improved developer visibility, repeatability, and operational traceability without exposing project-specific implementation details.",
    ],
  },
  {
    dates: "Sep 2023 - Present",
    title: "Freelance AI Developer",
    detail: "LLMs & Chatbot Systems, Remote",
    bullets: [
      "Delivered conversational AI tools using GPT-4, Claude, and Ollama to automate complex user interactions and prototype AI-first workflows.",
      "Engineered multi-agent prompt chains and memory-aware workflows using LangChain, Chroma, FAISS, and embedding-based retrieval patterns.",
      "Designed rubric-based LLM response assessment workflows with human-in-the-loop review, expert evaluation, and iterative tuning cycles.",
      "Coordinated evaluation and feedback workflows through platforms including Amazon Mechanical Turk and Mercor.",
      "Built full-stack AI prototypes using Python, Docker, vector databases, and OpenAI API integrations.",
      "Used rapid prototyping and AI-assisted development workflows to reduce iteration time and improve system quality.",
    ],
  },
  {
    dates: "Dec 2023 - Nov 2024",
    title: "Verint",
    detail: "Software Engineer, Remote",
    bullets: [
      "Contributed to B2B SaaS feature development using TypeScript, Node.js, and modern web application patterns.",
      "Participated in agile sprint planning, peer code review, debugging, and continuous delivery workflows.",
      "Collaborated with product and engineering teams to ship stable, user-facing functionality.",
      "Supported backend and frontend implementation work with an emphasis on reliability, maintainability, and delivery speed.",
    ],
  },
  {
    dates: "Jun 2021 - May 2022",
    title: "NSWC Dahlgren",
    detail: "Computer Scientist, Dahlgren, VA",
    bullets: [
      "Built data pipelines for training TensorFlow and YOLOv5 models in Python.",
      "Delivered AI-enabled software and computer-vision support for defense R&D teams.",
      "Collaborated with cross-functional teams to support model experimentation, training workflows, and technical validation.",
      "Worked in secure engineering environments with rigorous testing, documentation, and review expectations.",
    ],
  },
  {
    dates: "Jun 2020 - Jun 2021",
    title: "Peraton",
    detail: "Software Engineer",
    bullets: [
      "Maintained and extended defense simulation systems using C++.",
      "Supported software integration testing, defect resolution, and user-facing technical support.",
      "Helped deliver stable simulation software through debugging, documentation, and coordination with technical stakeholders.",
    ],
  },
  {
    dates: "May 2018 - Jun 2020",
    title: "Northrop Grumman",
    detail: "Software Engineer",
    bullets: [
      "Developed data-processing pipelines and Python tools for large-scale simulation environments.",
      "Supported defect resolution, client-focused enhancements, and system optimization.",
      "Collaborated with engineering teams to improve software reliability, maintainability, and test readiness.",
    ],
  },
  {
    dates: "May 2022 - Present",
    title: "Academic CS Tutor",
    detail: "Remote",
    bullets: [
      "Mentored students in AI concepts, algorithms, debugging, Python, and computer science fundamentals.",
      "Simplified complex AI and software engineering topics into practical examples and step-by-step learning modules.",
      "Used GitHub, Zoom, Python notebooks, and real-world debugging exercises to support student learning.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "PRIM - Procedural Reinforcement Intelligence Machine",
    bullets: [
      "Built a deterministic research simulation exploring adaptive behavior, graph traversal, agent decision loops, and local-first experimentation.",
      "Developed a React/TypeScript/Vite frontend with deterministic seed control, testable simulation behavior, and repeatable run capsules.",
      "Designed audit workflows for behavior analysis, ablation testing, and model comparison.",
    ],
  },
  {
    title: "Fuguely - Private Music Teacher Scheduling Platform",
    bullets: [
      "Built and iterated on a full-stack scheduling platform for private music instruction workflows.",
      "Implemented teacher onboarding, student roster management, invite flows, scheduling logic, billing-adjacent workflows, and automated test coverage.",
      "Used modern web application patterns with a focus on usability, reliability, and production-readiness.",
    ],
  },
  {
    title: "AI / LLM Application Prototypes",
    bullets: [
      "Built prototypes involving RAG, vector search, chatbot memory, agent workflows, prompt evaluation, and local LLM experimentation.",
      "Used Python, Docker, OpenAI API, Claude, Ollama, LangChain, Chroma, FAISS, and web application frameworks to validate AI product concepts.",
    ],
  },
];

export const education = [
  {
    degree: "B.S. Computer Science",
    school: "University of Mary Washington",
    location: "Fredericksburg, VA",
    dates: "2014-2018",
  },
  {
    degree: "B.A. Music",
    school: "University of Mary Washington",
    location: "Fredericksburg, VA",
    dates: "2014-2018",
  },
];

export const ideas = [
  {
    id: "OBS-001",
    type: "Systems",
    theme: "Observability",
    title: "Agents Need Flight Recorders",
    description:
      "Why autonomous systems need logs, traces, replay, and human-readable decision trails before they need more autonomy.",
    href: "/ideas/agents-need-flight-recorders",
  },
  {
    id: "EVAL-001",
    type: "Practice",
    theme: "Evaluation",
    title: "Rubrics Beat Vibes: Evaluating LLM Output",
    description:
      "A short note on why LLM evaluation should be structured, repeatable, and boring enough to trust.",
    href: "/ideas/rubrics-beat-vibes",
  },
  {
    id: "SEC-001",
    type: "Safety",
    theme: "Security",
    title: "Poisoned Context Is the New Supply Chain Risk",
    description:
      "As models read from the web, repos, docs, and tickets, prompt injection and data poisoning become engineering problems, not just security trivia.",
    href: "/ideas/poisoned-context-supply-chain-risk",
  },
  {
    id: "NTE-001",
    type: "Blueprint",
    theme: "Safety",
    title: "Nanotech Safety Blueprint",
    description:
      "Principles for responsible self-replicating nanomachine development with multi-layered safety systems, applying AI-alignment thinking to a physical autonomous domain.",
    href: "/ideas/nanotech-safety",
  },
  {
    id: "NTE-002",
    type: "Thought Exp.",
    theme: "Speculative",
    title: "What If: A Real Unconscious Nanodrone Swarm?",
    description:
      "A thought experiment exploring the plausibility of self-replicating microbots within the next decade, and what guardrails would need to exist first.",
    href: "/ideas/unconscious-nanodrone-swarm",
  },
];
