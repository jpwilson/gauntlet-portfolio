import { Project, Category } from '../types/project';

// ============================================================
// PROJECT DATA
// techStack convention: Languages (alpha), then Frameworks/Tools/Platforms (alpha)
// descriptions: 2-3 sentences, concise
// ============================================================

export const PROJECTS: Project[] = [
  // ---- GAUNTLET PROJECTS ----
  {
    id: 'week1-colabboard',
    name: 'CollabBoard (Orim)',
    company: 'Gauntlet',
    demoUrl: 'https://drive.google.com/file/d/1KWSRsMKgtZ4lb-110k5t6UvIfnTyVRTe/view?usp=drive_link',
    description: 'Collaborative whiteboard with a tool-calling agent. Zod schemas bound every tool argument. Ten regression evals run per release with LLM-as-judge scoring, results post to Langfuse. Two agent backends (Vercel AI SDK and LangChain/FastAPI) sit behind one tool schema and write to the same Langfuse project for direct trace comparison.',
    longDescription:
      'Real-time collaborative whiteboard. Users talk to a tool-calling agent that drives the Konva canvas: sticky notes, frames, 3D model imports from Sketchfab, kanban layouts, color changes. Every tool call goes through a Zod schema before it touches the board. A ten-case regression eval runs on release, scored by LLM-as-judge across correctness, efficiency, safety, and helpfulness. Scores upload to Langfuse alongside the OpenTelemetry spans. Admin analytics pulls Langfuse data to render cost per model and drill down to individual traces. Two agent backends sit behind the same tool schema: a Next.js path on Vercel AI SDK v6, and a Python path on LangChain plus FastAPI. Both post to the same Langfuse project so traces diff cleanly across the TypeScript and Python agent stacks.',
    category: 'gauntlet',
    week: 1,
    techStack: ['TypeScript', 'Python(FastAPI)', 'Konva.js', 'LangChain', 'Next.js', 'React', 'Langfuse', 'Supabase', 'Zod', 'OpenRouter', 'Sketchfab API', 'model-viewer (GLTF)', 'Docker', 'Vercel', 'Hetzner', 'Coolify'],
    repoUrl: 'https://github.com/jpwilson/colabboard',
    liveUrl: 'https://orim.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-02-23',
    featured: true,
    highlights: [
      'Tool-calling agent on Vercel AI SDK v6. Zod schemas gate every tool argument. Model routing through OpenRouter.',
      'Regression eval harness: 10 cases per release, LLM-as-judge rubric across correctness, efficiency, safety, helpfulness. Scores post to Langfuse.',
      'OpenTelemetry instrumentation via @langfuse/tracing and @langfuse/otel span processor. Admin analytics reads Langfuse and renders cost per model.',
      'Two agent backends behind one tool schema: TypeScript on Vercel AI SDK, Python on LangChain plus FastAPI. Same Langfuse project, comparable traces.',
      '3D asset pipeline: Sketchfab search, GLTF fetch, upload to Supabase Storage, render with <model-viewer> on the Konva canvas.',
      'Konva board at 60fps with 500+ objects. Realtime presence through Supabase Realtime. Last-write-wins on updated_at.',
      'Self-hosted Supabase (Auth, Postgres, Storage) on a €6.49/mo Hetzner box via Coolify. Migrated off Vercel and Supabase Cloud.',
    ],
    challenges:
      'Jailbreak resistance through three layers. Zod schemas bound every tool argument structurally so a compromised prompt cannot write malformed board state. A constrained system prompt governs semantics. LLM-as-judge on an adversarial eval dataset scores safety per release. Each layer catches a different failure class. Realtime collaboration on the Konva canvas needs 60fps at 500+ objects with sub-100ms sync across clients. Last-write-wins on updated_at handles concurrent edits. The 3D pipeline fails closed at every stage so a broken upload never renders a stale model. Observability sits on @langfuse/tracing. Every agent step and score upload lands in Langfuse next to the OpenTelemetry span.',
    learnings:
      'Three-tier agent guardrails (structural Zod, semantic system prompt, evaluative LLM-as-judge) and how each tier fails. Vercel AI SDK v6 tool-calling with stepCountIs multi-step loops and streamText with OpenTelemetry spans. @langfuse/tracing plus @langfuse/otel wired into Next.js 16 App Router. LLM-as-judge prompt design for repeatable four-dimension scoring. Sketchfab API plus GLTF plus <model-viewer> end-to-end with RLS-protected storage. Self-hosted Supabase on Hetzner plus Coolify preserves every feature of Supabase Cloud at €6.49/mo.',
  },
  {
    id: 'week2-agentfolio',
    name: 'Agent-Folio',
    company: 'Gauntlet',
    demoUrl: 'https://drive.google.com/file/d/1y_m7R6aAAE0bMCUdeu8aXHWugeOCxnIr/view?usp=sharing',
    description: 'Agentic portfolio assistant over Ghostfolio (stocks/ETFs) and Rotki (crypto). Replaces LLM-as-judge with deterministic verification: mathematical checks on allocation sums, price validity, and tool-call argument shapes bound what the agent can hallucinate past the filter. 75-case adversarial eval suite covers jailbreak attempts, tool-selection stress, edge cases, and multi-step reasoning.',
    longDescription:
      'A sidecar that lets users interrogate their existing wealth-management tools in plain English. Wraps 11 financial tools (portfolio summary, risk assessment, tax estimates, dividend tracking, X-Ray health check, transactions, and more) behind a unified provider interface so one query can pull from Ghostfolio and Rotki at once. The interesting engineering choice: replace LLM-as-judge with deterministic verification. Every response passes allocation-sum checks, price-validity filters, hallucination detection, and confidence scoring before it leaves the server. Swappable LLM layer via a 4-SDK adapter abstraction (LiteLLM, LangChain, and two direct frontier-lab SDKs) plus OpenRouter BYO-key for 100+ models. Admin panel runs evals, swaps models at runtime, and renders Langfuse analytics live.',
    category: 'gauntlet',
    week: 2,
    techStack: ['Python(FastAPI)', 'LangChain', 'Langfuse', 'LiteLLM', 'OpenRouter', 'Pydantic', 'Ghostfolio API', 'Rotki API', 'PostgreSQL', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson/agent-folio',
    liveUrl: 'https://agent-folio-production.up.railway.app/',
    icon: 'folder',
    createdAt: '2026-03-02',
    featured: false,
    highlights: [
      'Agentic assistant with 11 financial tools across Ghostfolio and Rotki. Unified provider interface lets one query span both backends.',
      'Deterministic verification replaces LLM-as-judge at the gate. Allocation totals sum to 100%, prices fall in sanity bounds, tool-call arguments match tool output shape.',
      '4-SDK adapter abstraction: LiteLLM, LangChain, and two direct frontier-lab SDKs behind one interface. Runtime-swappable from the admin panel.',
      'OpenRouter BYO-key path for 100+ models without writing per-provider glue.',
      '75-case eval suite: happy path, tool-selection stress, edge cases, jailbreak attempts, multi-step reasoning. Runs on every release, scores post to Langfuse.',
      'Defence-in-depth guardrails. Pre-filter for topic enforcement and prompt-injection patterns. Post-filter for credential leakage and tone.',
      'Langfuse cost and latency traces. Admin panel runs evals and swaps models live.',
      'CSV/JSON portfolio import with idempotent duplicate detection and parse-error rollback.',
    ],
    challenges:
      'Deterministic verification as a stronger gate than LLM-as-judge for financial output. Allocation totals are checked with exact math, prices cross-reference the provider, and tool-call argument shapes match the observed tool output. Nothing the agent says bypasses the filter. The 4-SDK adapter unifies LiteLLM, LangChain, and two direct frontier-lab SDKs behind one tool-calling loop so the admin can swap the model at runtime without a code deploy. Guardrails run pre and post: topic enforcement and injection-pattern screening before the prompt, credential-leak and tone filters after generation. The 75-case eval dataset covers adversarial prompts and jailbreak attempts and runs with Langfuse score uploads on every release.',
    learnings:
      'Deterministic verification versus LLM-as-judge. Deterministic catches what eval-time scoring misses for numerics. Evals catch what math cannot. Use both. 4-SDK unification via a BaseLLMAdapter keeps the tool-calling loop identical regardless of underlying SDK. Pre and post filter pipelines for injection, credential leakage, and tone. OpenRouter BYO-key as a cheap path to 100+ models without per-provider glue. Langfuse plus LiteLLM cost tracking when the caller can swap models freely. CSV/JSON portfolio import with idempotent duplicate detection and rollback on parse error.',
  },
  {
    id: 'week3-legacylens',
    name: 'LegacyLens',
    company: 'Gauntlet',
    demoUrl: 'https://loom.com/share/folder/f73a7042dcbb40d39c2895a7f845b90a',
    description: 'Production RAG for Fortran and COBOL. Syntax-aware chunker scans backward from each SUBROUTINE to include the LAPACK-style `*>` doc block that sits above the code. Naive chunkers drop those blocks and tank semantic recall. 92% precision@5 on 2,376 chunks across 1,400 routines. Admin dashboard reads Langfuse and projects infra cost out to 100,000 users.',
    longDescription:
      'Open-source RAG system for querying legacy COBOL and Fortran codebases. These codebases still run banking, insurance, and scientific-computing infrastructure. Documentation is sparse. Original authors are gone. The headline engineering move is context engineering: Fortran and COBOL docs sit above the SUBROUTINE keyword, so a naive chunker discards the description and cripples semantic recall. LegacyLens scans backward from each routine keyword and pulls the preceding comment block into the chunk. Dual embedding providers sit behind a switch for A/B on code-specific retrieval (text-embedding-3-large versus Voyage AI voyage-code-3). LangChain drives the retrieval chain, Langfuse traces every query with token counts and cost. Admin panel renders per-model cost tables, cost projections to 100k users, and infrastructure cost breakdowns.',
    category: 'gauntlet',
    week: 3,
    techStack: ['JavaScript', 'Python(FastAPI)', 'LangChain', 'Langfuse', 'Voyage AI', 'Pinecone (RAG)', 'tiktoken', 'D3.js', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson',
    liveUrl: 'https://legacylens-production-e04c.up.railway.app/',
    vizUrl: 'https://legacylens-production-e04c.up.railway.app/graph.html',
    icon: 'folder',
    createdAt: '2026-03-02',
    featured: true,
    highlights: [
      'Syntax-aware chunker with backward scan captures LAPACK-style `*>` doc headers above SUBROUTINE. The doc-above-code pattern breaks naive RAG.',
      '92% precision@5, 94% term coverage, 96% citation rate on 2,376 chunks across 1,400 routines (116MB codebase).',
      'Dual embedding providers in an A/B harness. text-embedding-3-large versus Voyage AI voyage-code-3. Code corpora reward the eval.',
      'LangChain retrieval chains. Langfuse traces every query with token counts and per-call cost.',
      'tiktoken truncation before embedding calls so no chunk exceeds the model token limit.',
      'Content-hash dedupe cache keeps incremental re-ingestion cheap on multi-hundred-MB codebases.',
      'Multi-language chunker (Fortran + COBOL) with language-specific boundary heuristics.',
      'D3 dependency graph rendered from parsed CALL relationships.',
      'Admin cost dashboard projects from $156/mo (1k users) to $1.9M/yr (100k users).',
      'Every answer cites file:line tuples. Operators audit responses against the source file directly.',
    ],
    challenges:
      'Context engineering dominates retrieval quality for code corpora. _chunk_fortran() detects SUBROUTINE, FUNCTION, MODULE, and PROGRAM boundaries, then scans backward to pull LAPACK-style `*>` doc blocks into the chunk. Without the backward scan, answers to "what does DGEMM do" miss the actual description. Deduplication via content-hash cache makes incremental re-ingestion cheap so a 116MB codebase re-runs without re-embedding unchanged files. Multi-language support requires language-specific boundary heuristics for Fortran versus COBOL versus PL/I. Dual embedding providers (text-embedding-3-large versus Voyage AI voyage-code-3) run side by side so the team can A/B on code-specific retrieval quality. Langfuse traces plus live admin cost analytics at per-query, per-day, per-month, and per-year granularity let users project infrastructure needs before committing.',
    learnings:
      'Language-aware chunking matters more than vector DB choice for code corpora. Backward comment scan for Fortran and COBOL is a one-line-of-thinking fix that moves precision measurably. Content-hash dedupe keeps incremental ingestion viable on multi-hundred-MB codebases. Embedding-model choice affects code retrieval. A/B the providers rather than defaulting. LangChain retrieval chains plus Langfuse observability give cost-per-query visibility that RAG products need for scale projection. tiktoken truncation so embedding calls never fail on oversized chunks. Prompt engineering for code Q&A: cite file:line tuples so answers audit against source.',
  },
  {
    id: 'week4-nerdy-live',
    name: 'Nerdy Live Session Analysis',
    company: 'Nerdy',
    demoUrl: 'https://loom.com/share/folder/6c9cf7a8be0249d2a36b66831e5215d3',
    description: 'Real-time session analysis for live tutoring calls. MediaPipe Face Landmarker runs on-device so raw video never leaves the browser. Eye-contact, talk-balance, energy, and attention-drift metrics at ~20fps. LiveKit handles WebRTC. Post-session summaries routed through OpenRouter and written back to Supabase. Native iOS companion in Swift/SwiftUI reads the same API.',
    longDescription:
      'Built for Nerdy and Varsity Tutors. Analyzes student engagement during live tutoring calls. MediaPipe Face Landmarker runs entirely on-device at around 20fps. No raw video leaves the browser, which means no server-side GPU and no privacy concerns around piping tutoring video through a cloud API. LiveKit handles the WebRTC call transport plus server-side data channels for live coaching nudges. Post-session summaries generate through OpenRouter and write back to Supabase. A force-directed D3 session graph renders from aggregated metric time-series. Native iOS companion in Swift plus SwiftUI consumes the same Supabase session API, and a separate tutor-dashboard app surfaces per-student engagement trends. Role-separated demo logins: 5 student accounts and 2 tutor accounts (Kim and Nick).',
    category: 'gauntlet',
    week: 4,
    techStack: ['Swift', 'SwiftUI', 'TypeScript', 'LiveKit', 'MediaPipe', 'OpenRouter', 'Supabase', 'Web Speech API', 'D3.js', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/nerdy-live-v1',
    liveUrl: 'https://student-call.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-16',
    featured: false,
    highlights: [
      'On-device MediaPipe Face Landmarker at ~20fps. No video leaves the browser, no server GPU needed.',
      'LiveKit WebRTC SFU plus server-side data channels for live coaching nudges.',
      'Composite engagement score from eye contact, talk balance, energy, attention drift. Weighted aggregation tuned per tutor preference.',
      'Force-directed D3 session graph rendered from aggregated metric time-series.',
      'Post-session summaries routed through OpenRouter and persisted in Supabase.',
      'Native iOS companion in Swift plus SwiftUI on the same Supabase session API.',
      'Web Speech API fallback for browser-native transcription when paid ASR is off.',
      'Multi-tenant demo: 5 student accounts, 2 tutor accounts, role-separated dashboards.',
      'Supabase Realtime broadcasts live nudges between the tutor dashboard and the student call.',
    ],
    challenges:
      'MediaPipe Face Landmarker has to hit ~20fps on the student machine without a server GPU. Running inference on-device means no video stream leaves the browser, which removes the privacy problem but puts the compute budget on the client. Composite engagement score aggregates four noisy signals (eye contact, talk balance, energy, attention drift) into a single number that has to reflect actual session quality. Native iOS companion in Swift plus SwiftUI hits the same Supabase session API as the web app so tutors can monitor students from a phone without duplicated backend logic. Role-separated auth surfaces (student call app, tutor dashboard, admin) sit on a shared Supabase schema with RLS-enforced boundaries.',
    learnings:
      'MediaPipe Face Landmarker tuning for on-device real-time tracking at consumer-laptop spec. LiveKit WebRTC SFU plus data-channel patterns for live coaching nudges. Composite engagement-score design from multiple time-series signals. Native iOS development in Swift plus SwiftUI against a Supabase backend. Force-directed D3 session graph rendering from aggregated metric time-series. OpenRouter-backed post-session summaries so the model is swappable without code changes.',
  },
  {
    id: 'week4-nerdy-tutor',
    name: 'Nerdy AI Video Tutor',
    company: 'Nerdy',
    demoUrl: 'https://www.loom.com/share/414c1a2e1406402ca75204f811059a6a',
    description: 'Sub-second AI video tutor for grades 6 through 12. Voice in, STT, LLM, TTS, video avatar out. Anam AI SDK drives photorealistic avatar rendering with lip sync. Groq LPU inference handles the language layer at sub-100ms first-token. Graceful SVG-avatar plus text-chat fallback when paid API keys are missing.',
    longDescription:
      'Real-time AI video tutor for grades 6 through 12 built around the Socratic method. Audio in, streaming STT, LLM reasoning, TTS, photorealistic video avatar out. Sub-second end-to-end latency is the hard target. Anam AI SDK handles avatar rendering with lip sync. Groq LPU inference drives the language layer with sub-100ms first-token latency. The app degrades gracefully to an SVG talking head plus text chat when Anam or ASR keys are missing, so the UX is the same whether iterating locally or showing a live demo. Built as a pnpm Turborepo monorepo with a shared `core` package and a Vite SPA.',
    category: 'gauntlet',
    week: 4,
    techStack: ['TypeScript', 'React', 'Anam AI SDK', 'Groq', 'Supabase', 'pnpm', 'Turborepo', 'Vite', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/nerdy-vid-tutor',
    liveUrl: 'https://vidtutv1.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-16',
    featured: false,
    highlights: [
      'Streaming STT -> LLM -> TTS -> video-avatar pipeline. Sub-second end-to-end latency target.',
      'Anam AI SDK for photorealistic video avatars with lip sync.',
      'Groq LPU inference for sub-100ms first-token responses.',
      'Graceful degradation path. When Anam or ASR keys are missing the UI swaps to SVG avatar plus text chat with no UX regression.',
      'Socratic-method system prompt tuned for grades 6 through 12 math and science.',
      'pnpm Turborepo monorepo with shared `core` package and Vite SPA.',
    ],
    challenges:
      'Sub-second end-to-end latency across four sequential hops (STT, LLM, TTS, avatar render) when every hop has its own network round-trip. Groq over cloud APIs for the LLM leg because LPU inference cuts first-token variance. Graceful degradation so the app demos without paid API keys. Anam avatar mode swaps cleanly to an SVG talking head plus text chat with no UX regression. pnpm Turborepo monorepo layout with a shared `core` package of reusable hooks and types consumed by multiple apps.',
    learnings:
      'Real-time audio and video pipeline budgeting when every hop adds 100 to 200ms. Anam AI avatar SDK integration with lip sync driven by TTS output. Groq LPU inference as a practical alternative to cloud LLM APIs for latency-sensitive paths. pnpm plus Turborepo monorepo ergonomics: shared packages, filtered builds, cached task graphs. Socratic-method prompt design: open-ended questions that surface student reasoning without giving answers away.',
  },
  {
    id: 'week4-gofundme',
    name: 'AI Enhanced GoFundMe',
    company: 'GoFundMe',
    description: 'Pixel-level GoFundMe clone plus three original modules. An AI Giving Agent allocates monthly donations based on a values questionnaire, every decision traces to Langfuse. A fraud-detection module scores fundraisers against heuristics before publish. A Three.js impact-feed renders donation flows in 3D. 175 tests cover agent behavior end-to-end.',
    longDescription:
      'Pixel-perfect GoFundMe reconstruction on Next.js 16 with App Router and Turbopack, plus three features GoFundMe itself does not have. The AI Giving Agent takes a values questionnaire and autonomously allocates monthly donations across aligned campaigns. Every decision emits a Langfuse trace so the choice is explainable. The fraud-detection module scores fundraisers against a set of heuristic rules before they can be published. The Three.js plus react-three-fiber impact-feed renders donation flows in 3D so contributors can see their money moving. 175 tests (Vitest plus Testing Library) cover agent behavior and form-flow regression. CI on GitHub Actions with Vercel preview URLs per PR.',
    category: 'gauntlet',
    week: 4,
    techStack: ['TypeScript', 'Next.js', 'React', 'Langfuse', 'Three.js', 'react-three-fiber', 'React Hook Form', 'React Query', 'Vitest', 'Zod', 'Zustand', 'GitHub Actions', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/gfm-v1',
    liveUrl: 'https://gfm.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-03-06',
    featured: false,
    highlights: [
      'AI Giving Agent. Values questionnaire in, autonomous monthly donation allocation out. Every decision writes a Langfuse trace so the allocation is auditable.',
      'Fraud-detection scoring pipeline runs pre-publish against heuristic rules.',
      'Three.js plus react-three-fiber 3D impact-feed visualizes donation flows.',
      'Pixel-perfect Next.js 16 App Router reconstruction on Turbopack.',
      '175 tests. Vitest plus Testing Library covering agent behavior and form regression.',
      'Zustand for client state, React Query for server cache, Zod plus React Hook Form for validation.',
      'GitHub Actions CI with Vercel preview URLs per PR.',
    ],
    challenges:
      'Testable AI agent where behavior must be auditable (Langfuse traces per decision) and deterministic enough for regression tests. Fraud-detection pipeline runs pre-publish without blocking legit fundraisers. Three.js plus react-three-fiber impact-feed renders donation flows without dropping frames on low-end devices. Pixel-level reconstruction of a production UI across search, fundraiser creation wizard, community pages, and full donation flow.',
    learnings:
      'Next.js 16 App Router plus Turbopack workflow in a test-heavy codebase. Langfuse tracing discipline for an agent where every decision needs to be explainable. react-three-fiber plus drei patterns for a scroll-driven 3D scene that stays performant. Zod schemas plus React Hook Form plus zod resolver for type-safe client and server validation. Zustand versus React Query: when to use which for state.',
  },
  {
    id: 'week5-zapier-triggers',
    name: 'Triggers API',
    company: 'Zapier',
    description: 'REST interface for event-driven automation. Ingest any JSON payload, persist to SQLite with WAL, deliver via push with exponential backoff or pull via cursor-paginated inbox. Subscription filtering by event type and source. Langfuse spans on every ingestion and delivery path so distributed flows are debuggable end-to-end.',
    longDescription:
      'Public, reliable, developer-friendly front door for any system to send events into an automation platform. Abstracts the low-level infrastructure (Kafka, SQS) behind a clean REST interface. Handles delivery semantics with exponential-backoff retry. Provides inbox-style pull retrieval for consumers that cannot accept webhooks. Subscription-based filtering by event type and source lets subscribers opt into narrow slices without the Kafka operational overhead. Real-time monitoring stats expose event counts, delivery rates, and per-subscription health. Every ingestion and delivery path is traced in Langfuse so distributed flows are debuggable end-to-end. Langfuse instrumentation is not limited to LLM code paths.',
    category: 'gauntlet',
    week: 5,
    techStack: ['JavaScript', 'Python(FastAPI)', 'Jinja2', 'Langfuse', 'SQLite', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson/triggers-api',
    liveUrl: 'https://triggers-api-production-aa41.up.railway.app/',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    highlights: [
      'Event ingestion via POST /api/v1/events accepts arbitrary structured JSON.',
      'Push delivery with exponential-backoff retry to registered subscriber endpoints.',
      'Pull-based inbox retrieval with cursor pagination and explicit ACK semantics.',
      'Subscription filtering by event type and source at the DB layer. O(subscribers-that-care), not O(all).',
      'SQLite with WAL mode for lightweight durability. Swappable to Postgres for scale.',
      'FastAPI async request handling with auto-generated OpenAPI docs.',
      'Langfuse traces on every ingestion and delivery path, not just LLM calls.',
      'Real-time monitoring: event counts, delivery rates, per-subscription health.',
    ],
    challenges:
      'Push-delivery retry semantics that are reliable without amplifying failures. Exponential backoff plus a bounded retry ceiling so a flaky subscriber never backs up the ingestion queue. Cursor-based pagination for the inbox API so consumers resume mid-stream without polling-induced duplicates. Subscription filtering at the DB layer so push fan-out stays O(subscribers-that-care). SQLite WAL mode keeps the single-binary deployment story viable while supporting concurrent reads during writes.',
    learnings:
      'Event-driven architecture patterns without the ops cost of Kafka or SQS. Push versus pull tradeoffs: why some consumers need inbox-style, why retries need bounded backoff. FastAPI background-task processing for delivery workers that share the app event loop. Langfuse instrumentation on non-LLM code paths. The observability value of spans is not limited to AI.',
  },
  {
    id: 'week5-skyfi',
    name: 'SkyFi Verification Intelligence',
    company: 'SkyFi',
    description: 'Enterprise KYB verification platform. Agentic 7-dimension verification flow over entity registries, DNS/email signals, WHOIS, address cross-check, OFAC sanctions, digital footprint, and data consistency. Weighted composite scoring with hard-fail overrides for sanctions matches and FATF-blacklisted jurisdictions. AI compliance chatbot routed through OpenRouter.',
    longDescription:
      'Internal operator tool that gates SkyFi Enterprise self-signups behind a real compliance check. Company data comes in (name, domain, billing email, phone, address, tax ID) and runs through seven independent verification dimensions: entity registry lookup (OpenCorporates plus GLEIF), domain and DNS validation (MX, SPF, DMARC, NS, HTTPS), WHOIS plus domain age, address and contact cross-check, OFAC SDN plus PEP sanctions screening with fuzzy matching, digital-footprint scoring (website content, SSL, Safe Browsing), and data-consistency cross-check. Each dimension runs async. Results aggregate into a weighted 0 to 100 composite with three decision thresholds: 70 and above auto-approves, 40 to 69 queues for manual review, below 40 rejects. Hard-fail overrides short-circuit the composite on exact sanctions matches, FATF-blacklisted jurisdictions, dissolved entities, and domains under 30 days old. An AI compliance chatbot routed through OpenRouter lets operators query verification reports in natural language. Every LLM call and verification dimension traces to Langfuse.',
    category: 'gauntlet',
    week: 5,
    techStack: ['Python', 'FastAPI', 'SQLAlchemy', 'asyncpg', 'PostgreSQL', 'Jinja2', 'Tailwind CSS', 'OpenRouter', 'Langfuse', 'dnspython', 'httpx', 'Pydantic', 'bcrypt', 'Ruff', 'pytest', 'Docker', 'Railway', 'GitHub Actions'],
    repoUrl: 'https://github.com/jpwilson/skyfi-verif-int',
    liveUrl: 'https://verif-app-production.up.railway.app/',
    icon: 'folder',
    createdAt: '2026-03-21',
    featured: false,
    highlights: [
      '7 independent verification dimensions. Entity registry (OpenCorporates + GLEIF), DNS and email (MX/SPF/DMARC), WHOIS plus domain age, address cross-check, OFAC SDN plus PEP sanctions, digital footprint, data consistency.',
      'Weighted composite scoring. 25/15/10/15/20/10/5. Three decision tiers: auto-approve, manual review, reject.',
      'Hard-fail overrides. Exact sanctions match. FATF blacklist jurisdiction. Dissolved or struck-off entity. Domain under 30 days old.',
      'KYB compliance chatbot over verification reports. Model routing through OpenRouter for operator-driven A/B.',
      'Async FastAPI plus SQLAlchemy with asyncpg. Each dimension is a separate coroutine. Results aggregate with weighted math.',
      'Langfuse observability on every dimension call and every LLM turn. Dimension spans double as regression fixtures.',
      'Server-rendered Jinja2 plus Tailwind operator UI. No SPA overhead for internal tooling.',
      'bcrypt session auth with signed cookies. Every operator action audited with ID and timestamp.',
      'CI: Ruff plus pytest on GitHub Actions. Railway deploy with managed Postgres.',
    ],
    challenges:
      'Multi-dimension verification flow where each dimension is independent, failure-isolated, and contributes a weighted score to a composite decision. Hard-fail overrides short-circuit the composite when sanctions or jurisdiction facts demand it. Fuzzy matching against OFAC SDN without false positives on common names (entity aliases, phonetic spellings). DNS-level checks (MX, SPF, DMARC, DNSSEC) as a legitimacy signal with dnspython async lookups. WHOIS plus RDAP for domain age given uneven TLD coverage. Operator auditability: every action (verification run, manual decision, chatbot query) logged with operator ID, timestamp, and action type for compliance review.',
    learnings:
      'KYB verification as a multi-signal weighted-aggregation problem rather than a single-vendor black box. Sanctions screening tradeoffs: exact-match ceiling versus fuzzy-match floor, and why hard-fail overrides exist outside the score. Async SQLAlchemy with asyncpg at scale. Transaction boundaries for multi-dimension result writes. Langfuse for non-AI traces. Dimension calls benefit from the same observability discipline as LLM calls. Session-based bcrypt auth when Supabase is overkill for an internal tool.',
  },
  {
    id: 'week6-upstream-community',
    name: 'Upstream Literacy Community',
    company: 'Upstream Literacy',
    description: 'Community platform for literacy leaders and school district administrators. Computed peer-matching across demographic dimensions (district size, FRL%, ESL%, district type) and self-selected problem statements. Direct messaging on Django Channels. Admin moderation with audit log.',
    longDescription:
      'Community platform that connects literacy leaders and school district administrators using computed similarity. Members join with a district profile (size, Free-Reduced-Lunch percent, ESL percent, district type) and self-select from a curated list of literacy challenges they are facing. A match-scoring engine pairs each member with the most similar peers across demographic dimensions plus shared challenges. Direct messaging built on Django Channels, WebSocket-ready. Admin moderation lets staff flag content or enter conversations as moderators. React plus Vite plus Axios frontend talks to a Django REST Framework backend.',
    category: 'gauntlet',
    week: 6,
    techStack: ['JavaScript', 'Python(Django)', 'Django REST Framework', 'Django Channels', 'React', 'Vite', 'Axios', 'PostgreSQL', 'Docker', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/literacy-community',
    liveUrl: 'https://frontend-plum-iota-35.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    highlights: [
      'Demographic profile ingestion. District size, FRL percent, ESL percent, district type.',
      'Self-selected problem-statement taxonomy surfaces shared challenges.',
      'Computed match-scoring engine. Ranks peers by demographic and challenge similarity.',
      'Direct messaging on Django Channels. WebSocket-ready.',
      'Admin moderation. Flag content, enter conversations as moderator, audit log.',
      'Django REST Framework backend, React with Vite and Axios frontend.',
      'PostgreSQL in production, SQLite in dev.',
    ],
    challenges:
      'Match-scoring algorithm weighs multiple demographic dimensions (size, FRL percent, ESL percent, district type) against a self-selected challenge list. Ranking surfaces genuinely similar peers, not just popular ones. Django Channels for a messaging surface that is WebSocket-ready without forcing a full rewrite. Admin moderation paths that let staff inject into conversations without breaking the 1:1 UX for regular members. Frontend and backend split with CORS plus Axios interceptors for auth refresh.',
    learnings:
      'Django REST Framework patterns for a real community app (serializers, viewsets, permissions). Computed similarity scoring across categorical and numeric dimensions. Django Channels WebSocket integration. When it is worth it versus when polling suffices. Monorepo with Django backend plus React/Vite frontend deployed separately.',
  },
  {
    id: 'week6-upstream-ecommerce',
    name: 'Upstream e-Commerce (Kid Palace)',
    company: 'Upstream Literacy',
    description: 'Full-stack storefront for children\'s literacy products. Session-persistent cart that merges on login. Guest plus registered checkout with Stripe and PayPal payment stubs. Inventory with concurrent-safe stock decrements. Order status with email confirmations.',
    longDescription:
      'ShopHub (Kid Palace) is a full-stack storefront for children\'s literacy products. Product catalog with categories, images, search, and filtering. Shopping cart with session-based persistence that merges cleanly with the user cart on login. Checkout supports both guest and registered users with payment processing stubs for Stripe and PayPal. Inventory module tracks stock levels with concurrent-safe decrements and out-of-stock handling. Orders carry status, email confirmations, and full history per account. Django REST Framework backend, React plus Vite frontend, PostgreSQL, Docker, Railway.',
    category: 'gauntlet',
    week: 6,
    techStack: ['JavaScript', 'Python(Django)', 'Django REST Framework', 'React', 'Vite', 'PostgreSQL', 'Stripe (stub)', 'PayPal (stub)', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson/Upstream-e-Commerce',
    liveUrl: 'https://loving-exploration-production-976f.up.railway.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    highlights: [
      'Product catalog with categories, images, search, filtering.',
      'Session-based cart that merges with the user cart on login. No lost items.',
      'Checkout for both guest and registered users with email confirmations.',
      'Payment-processor stubs. Stripe and PayPal integration points ready for keys.',
      'Inventory with concurrent-safe stock decrements and out-of-stock handling.',
      'Order management: status tracking, per-account history, email notifications.',
      'Django REST Framework API plus React (Vite) storefront.',
    ],
    challenges:
      'Session-persistent cart that merges when an anonymous user logs in. The cart schema supports both cookie-session and user-owned modes without losing items or double-counting. Concurrent-safe stock decrements so two simultaneous "buy the last one" requests do not both succeed. Payment-processor abstraction that is stub-first but swap-in-ready for real Stripe and PayPal keys. Order state machine with status transitions plus email hooks at each transition.',
    learnings:
      'Django e-commerce modeling: cart, order, product, inventory boundaries. Session merge patterns for anonymous-to-authenticated transitions. Payment processor integration stubs that let the flow be designed before signing up for API keys. Inventory concurrency via row-level locks in Postgres.',
  },
  {
    id: 'week6-servicecore',
    name: 'ServiceCore',
    company: 'ServiceCore',
    description: 'Employee time tracking and payroll for field-service companies. Hardened chatbot with multi-layer agent guardrails. Langfuse-traced regression evals run on every release. Automatic overtime calculation with edge cases. Manager approval state machine. Multi-tenant via Supabase row-level security. 108 tests across Vitest plus Playwright.',
    longDescription:
      'Replaces the manual spreadsheet payroll workflow field-service companies actually run on. Digital time clock, automatic overtime calculation on the 40-hour-week rule plus edge cases, manager-approval state machine, live labor-cost dashboards, automated email reminders. The AI assistant is hardened: multi-layer guardrail system prompt, scoped tool access to payroll queries only, Langfuse-traced regression evals run on every release to catch agent regressions before prod. 108 tests across Vitest and Playwright. Full CI/CD on GitHub Actions. Multi-tenant architecture with Supabase row-level security. Every row query is scoped to the caller\'s company automatically.',
    category: 'gauntlet',
    week: 6,
    techStack: ['TypeScript', 'Next.js', 'React', 'Langfuse', 'Playwright', 'Supabase', 'Vitest', 'pnpm', 'Turborepo', 'Vercel', 'GitHub Actions'],
    repoUrl: 'https://github.com/jpwilson/service_core',
    liveUrl: 'https://servicecore-six.vercel.app/',
    icon: 'folder',
    createdAt: '2026-03-23',
    featured: false,
    highlights: [
      'Hardened chatbot with multi-layer agent guardrails. System-prompt defense, scoped tool access, output filtering.',
      'Langfuse-traced regression evals run on every release. Catch agent regressions before prod.',
      'Automatic overtime calculation with edge cases. Split weeks, holidays, salaried versus hourly, mid-week role changes.',
      'Manager approval state machine for timesheet submit, review, approve, reject, paid.',
      'Multi-tenant by construction. Supabase row-level security scopes every query to the caller\'s company.',
      'Real-time labor cost dashboard with live aggregates by role, location, project.',
      '108 tests across Vitest and Playwright. Component, integration, and E2E coverage.',
      'pnpm Turborepo monorepo. apps/web, apps/mobile, apps/desktop over a shared core.',
      'GitHub Actions CI with typecheck, lint, test, build gates before merge.',
    ],
    challenges:
      'Multi-layer agent guardrails for an app that reads sensitive payroll data. System prompt defines topic and tone. Tool access is scoped to payroll queries only. Output is filtered for credential and PII leak patterns. Overtime calculation edge cases: weeks that split across a pay period, holiday multipliers, salaried versus hourly branching, mid-week role changes. Manager approval as a first-class state machine, not a boolean flag, so timesheets can move back to Edit when a manager rejects. Supabase RLS policies for multi-tenant isolation that do not require explicit company_id filters in every query.',
    learnings:
      'pnpm Turborepo monorepo layout across three apps (web, mobile, desktop) with a shared core package and filtered CI builds. Supabase row-level security as the primary multi-tenant boundary (over app-layer filtering). Agent evals that run as part of CI. Langfuse traces double as regression diffs. Playwright E2E patterns for auth-gated payroll flows.',
  },
  {
    id: 'week6-equinox',
    name: 'Equinox',
    company: 'Peak6',
    description: 'Cross-venue prediction-market aggregation plus routing simulator in Go. Detects equivalent markets across venues via name normalization and structural matching. Routing simulator picks the best venue to fill from considering spread, depth, fees, and resolution risk. Emits a human-readable explanation per routing decision.',
    longDescription:
      'Go microservices prototype for a venue-agnostic prediction-market execution layer. Connects to multiple prediction-market platform APIs (Kalshi-style binary markets). Normalizes contract descriptions across naming conventions and resolution rules. Detects equivalent markets across venues via structural matching. Given a hypothetical trade, the routing simulator picks the best venue(s) to fill from. Considers spread, depth, fees, and resolution risk. Emits a human-readable explanation of the decision. Three Go services (market-aggregator plus route-simulator plus API gateway) deployed on GCP Cloud Run with Docker.',
    category: 'gauntlet',
    week: 6,
    techStack: ['Go', 'Docker', 'GCP Cloud Run'],
    repoUrl: 'https://github.com/jpwilson/equinox',
    liveUrl: 'https://equinox-117180154446.us-central1.run.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    highlights: [
      'Go microservices: market-aggregator, route-simulator, API gateway.',
      'Multi-venue prediction-market aggregation across heterogeneous APIs.',
      'Market-equivalence detection via name normalization plus structural matching on resolution rule, expiry, unit.',
      'Routing simulator chooses optimal venue(s) from spread, depth, fees, resolution risk.',
      'Per-decision explanations. Routing choice is auditable, not a black box.',
      'Containerized deploy on GCP Cloud Run. Scales to zero when idle.',
    ],
    challenges:
      'Market-equivalence detection across venues with different naming conventions ("Will X happen by date Y" versus "X by Y: YES/NO" versus "PROB(X by Y) above 50%"). Normalizing both the prose and the resolution rules before two markets can be called equivalent. Routing decision balances spread, depth, fees, and resolution-risk variance across venues and still emits a human-readable explanation. Go microservice boundaries that do not create more coordination overhead than they save.',
    learnings:
      'Go as a better fit than Python for latency-sensitive market aggregation. Rule-based and heuristic matching when ML is overkill and adversarial. GCP Cloud Run deployment patterns: Dockerfile, service-to-service auth, env-var management. Prediction-market domain modeling: contracts, venues, liquidity, resolution rules as first-class types.',
  },
  {
    id: 'week6-st6',
    name: 'Weekly Commit Module',
    company: 'ST6',
    description: 'Production micro-frontend replacing 15-Five for RCDO-linked weekly planning. Commit tracking with Recharts analytics. Supabase row-level security for multi-tenant teams. Playwright E2E coverage. Week-boundary date engine handles timezone plus DST edge cases teams actually hit.',
    longDescription:
      'Production-ready micro-frontend module designed to replace 15-Five inside a larger RCDO (Results, Commitments, Doing, Outcomes) platform. Team members submit weekly commits, rate last week progress, and see aggregate analytics via Recharts. Multi-tenant team boundaries enforced by Supabase row-level security. Every query is scoped to the caller\'s team automatically. Drop-in module: Next.js 16 App Router, Zustand for client state, Playwright E2E suite, Vitest for component tests, deployed to Vercel (and self-hosted on Hetzner plus Coolify).',
    category: 'gauntlet',
    week: 6,
    techStack: ['TypeScript', 'Next.js', 'React', 'Playwright', 'Recharts', 'Supabase', 'Vitest', 'Zustand', 'Vercel', 'Hetzner', 'Coolify'],
    repoUrl: 'https://github.com/jpwilson/weekly-commit-module',
    liveUrl: 'https://st6.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    highlights: [
      'Micro-frontend architecture. Drops into the host RCDO platform without coupling.',
      'Weekly commit tracking with self-rating on previous-week progress.',
      'Recharts analytics: commit-completion rates, individual and team trends.',
      'Supabase row-level security scopes every query to the caller\'s team.',
      'Week-boundary date engine handles DST plus timezone edge cases.',
      'Playwright E2E coverage for submit, review, aggregate flows.',
      'Self-hosted on Hetzner plus Coolify (migrated off Vercel) for zero infra delta.',
    ],
    challenges:
      'Week-boundary date logic that does not silently shift commits into the wrong week for users in different timezones, during DST transitions, or when the week starts Monday for one team and Sunday for another. Micro-frontend boundaries that let the module drop into a larger RCDO platform without importing the host\'s global state. Supabase RLS policies for team-scoped data that are correct by default. No ambient team_id filter in every query.',
    learnings:
      'Micro-frontend shipping patterns (runtime module federation versus build-time embedding). Recharts composition for multi-series trend lines without fighting the default layout. Playwright E2E for auth-gated multi-week flows with database seeding hooks. Timezone-aware week-boundary math. Luxon or Temporal beats raw Date.',
  },

  {
    id: 'week7-pilotbase',
    name: 'PilotBase',
    company: 'Pilotbase',
    description: 'Scheduling automation for flight schools. Watches the Flight Schedule Pro calendar and runs four automation engines (Waitlist, Reschedule, Discovery Flight, Next Lesson) that propose slot assignments. Nothing touches FSP until a scheduler approves it. Multi-tenant Supabase row-level security. Twilio SMS stubbed. Vercel cron drives engine runs.',
    longDescription:
      'Automates the busywork in flight-school scheduling without removing humans from the loop. Watches the Flight Schedule Pro (FSP) calendar and runs four automation engines: a Waitlist engine that ranks waitlisted students when a slot opens, a Reschedule engine that finds alternative slots for cancellations, a Discovery Flight engine that finds daylight-only slots for trial flights, and a Next Lesson engine that suggests the next logical training event. Every suggestion lands in an Approval Queue. Nothing writes back to FSP until a scheduler clicks approve. Multi-tenant Supabase RLS isolates flight schools from each other. Vercel cron jobs drive the periodic triggers. Twilio SMS stubs are wired for notification send-out when the schools are ready.',
    category: 'gauntlet',
    week: 7,
    techStack: ['TypeScript', 'Next.js', 'Supabase', 'Tailwind CSS', 'Flight Schedule Pro API', 'Twilio (stub)', 'Vitest', 'Zod', 'Vercel', 'Hetzner', 'Coolify'],
    repoUrl: 'https://github.com/jpwilson/pilotbase',
    liveUrl: 'https://pilotbase.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-03-31',
    featured: false,
    highlights: [
      'Four automation engines: Waitlist, Reschedule, Discovery Flight, Next Lesson.',
      'Approval Queue gate. Nothing writes to FSP without a human click.',
      'Flight Schedule Pro API client in src/lib/fsp for read and write.',
      'Multi-tenant isolation via Supabase row-level security per flight school.',
      'Vercel cron-triggered API routes drive the periodic engine runs.',
      'Twilio SMS integration stubbed and ready. Flip a flag to enable.',
      'Zod schemas for every inbound FSP payload and every DB write.',
      'Role-separated demo logins. Admin (Capt. Miller). Student (Alex Rivera).',
    ],
    challenges:
      'Modeling flight-school scheduling constraints: instructor availability, aircraft maintenance windows, daylight-only discovery flights, student progression gates. Approval-queue state machine so suggestions can be approved, modified, or rejected without touching FSP directly. Every FSP write goes through a single gated code path. FSP API integration with a custom client that retries on rate limits without double-writing. Vercel cron timing so the four engines do not stampede each other when they all want to look at the calendar at minute zero.',
    learnings:
      'Next.js 15 App Router plus cron patterns when periodic work is needed without a real job queue. Supabase row-level security for multi-tenant boundaries. Policies beat ambient filters. Zod schema discipline for third-party API payloads where the shape is not under your control. Human-in-the-loop as a design pattern. The approval queue is a feature, not a limitation.',
  },

  {
    id: 'automattic',
    name: 'WP Block Theme Generator',
    company: 'Automattic',
    description: 'Generates installable WordPress block themes from natural language. Zero Custom HTML blocks, only native core blocks, enforced by a block allowlist. Three-layer validation pipeline: Zod schema plus block allowlist plus WordPress parser round-trip. 4-step LLM generation. Live in-browser preview via WordPress Playground (WASM).',
    longDescription:
      'Turns "I want a dark minimalist portfolio theme for a photographer" into a downloadable, WP-6.4+-compatible block theme. Generated via a 4-step LLM pipeline, validated through three hard gates, previewable in-browser before download. The validation pipeline refuses to emit a theme unless it passes: (1) Zod schema checks on every block tree, (2) a block allowlist that rejects anything not in the native WordPress core set, and (3) a WordPress parser round-trip so the output is byte-identical after a parse and serialize cycle. Generates 4 templates, 2 patterns, a full design-token system, and up to 8 pages. Multi-turn chat lets users iterate without losing prior decisions. Live in-browser preview runs real WordPress via WordPress Playground (WASM). No backend server needed to see the theme working. Multi-provider LLM routing via OpenRouter.',
    category: 'gauntlet',
    week: 8,
    techStack: ['TypeScript', 'JSZip', 'Next.js', 'OpenRouter', 'React', 'shadcn/ui', 'Tailwind CSS', 'Vercel', 'Hetzner', 'Coolify', 'WordPress Playground', 'Zod'],
    repoUrl: 'https://github.com/jpwilson/wp-ai-block-theme-generator',
    liveUrl: 'https://wp-theme.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-04-02',
    featured: false,
    highlights: [
      'Natural language to installable WordPress block theme (WP 6.4+ compatible).',
      'Zero Custom HTML. Only native core blocks, enforced by a block allowlist.',
      'Three-layer validation: Zod schema, block allowlist, WordPress parser round-trip.',
      '4-step LLM pipeline for theme generation. Spec, design tokens, blocks, review.',
      'Live in-browser preview via WordPress Playground (WASM). No server needed.',
      'Multi-turn chat for iterative refinement without losing prior decisions.',
      '8 preset starting points (portfolio, magazine, SaaS landing, etc.).',
      'Multi-provider LLM routing via OpenRouter. Swap models without code changes.',
      'JSZip packaging. Output is a single downloadable .zip ready to install.',
    ],
    challenges:
      'Deterministic block serialization. The generator emits block markup that survives a WordPress parser round-trip byte-identical because any drift is a real render bug downstream. Zero-Custom-HTML constraint forces the model to express every layout in native core blocks only. Required a block allowlist gate that rejects generations outside the set. WordPress Playground (WASM) integration for in-browser preview. Running real WordPress in the browser means the preview is trustworthy but it is a meaningful bundle. 4-step LLM pipeline with state handoffs (spec, design tokens, block trees, review) where each step output validates before the next step runs.',
    learnings:
      'WordPress block theme architecture. Templates, parts, patterns, theme.json design tokens as a tree rather than a flat config. WordPress Playground WASM runtime as a legit preview primitive. JSZip for client-side zip assembly with correct file structure and manifest. Multi-step LLM pipelines where each step output is schema-validated before the next step sees it. The pipeline becomes debuggable instead of a black box.',
  },
  {
    id: 'week9-terrafirma',
    name: 'Terra Firma: Fleet Command Center',
    company: 'Gauntlet',
    description: 'Native Qt/OpenGL HUD that ingests binary UDP telemetry from a rover emulator at 10Hz. Reconstructs the environment from LiDAR point clouds into a tiled heightfield on a background worker thread. 49ms measured click-to-ack round trip via a pending-commands state machine. Five quests auto-complete from real telemetry. No scripted triggers.',
    longDescription:
      'Note: the hosted rendering is a mockup. The original project belongs to a partner I do not have permission to share, so this is my own alternate self-made version of the HUD. Native Qt/OpenGL HUD that ingests binary UDP telemetry from a rover emulator at 10Hz. Reconstructs the environment from LiDAR point clouds into a tiled heightfield on a background worker thread. Features a screen-space scene overlay (rover labels, selection rings, rotating LiDAR sweep arcs) drawn with QPainter on top of the GL viewport. Click-to-ack command pipeline with pending-commands state machine (49ms measured round trip). Live FPS/CPU frame graph (F3). Terrain coverage heatmap (V) tinted by actual LiDAR sample density. Five quests auto-complete from real telemetry. No scripted triggers.',
    category: 'gauntlet',
    week: 9,
    techStack: ['C++', 'Assimp', 'CMake', 'Docker', 'GLM', 'GLSL', 'OpenGL', 'Qt 6'],
    repoUrl: 'https://github.com/jpwilson/terrafirm-HUD',
    liveUrl: 'https://terrafirma.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-04-11',
    featured: true,
    highlights: [
      'Native Qt/OpenGL HUD ingesting binary UDP telemetry from a rover emulator at 10Hz.',
      'LiDAR point-cloud to tiled heightfield reconstruction on a background worker thread.',
      '49ms measured click-to-ack round trip with a pending-commands state machine.',
      'Screen-space scene overlay. Rover labels, selection rings, rotating LiDAR sweep arcs via QPainter.',
      'Terrain coverage heatmap (V) tinted by actual LiDAR sample density.',
      'Live FPS/CPU frame graph (F3) with per-frame budget breakdown.',
      'Five quests auto-complete from real telemetry. No scripted triggers.',
      'Wire-format verification with C++ static_asserts so protocol drift is a compile error.',
      'AUTORCC-bundled shaders. No hardcoded paths. Portable build.',
    ],
    challenges:
      'Reconstructing terrain from raw LiDAR point clouds in real time without blocking the render thread. A tiled-heightfield worker fans the point-cloud updates off the main loop. Measuring actual command round-trip latency instead of guessing it. The pending-commands state machine timestamps every send and ack. Keeping the GL viewport and the QPainter screen-space overlay in sync across resolutions. Wire-format verification with static_asserts so protocol drift fails the build instead of silently rendering garbage.',
    learnings:
      'Qt6 plus OpenGL 3.3 core-profile integration. Worker-thread tile grid updates that never touch GL state from the wrong thread. Wire-format verification via static_asserts (C++ compile-time struct size and offset checks). Bundling shaders via AUTORCC so the binary has no path dependencies. LiDAR point-cloud density as a useful signal for terrain coverage heatmaps.',
  },

  // ---- OTHER PROJECTS ----
  {
    id: 'other-tradeup',
    name: 'TradeUp: Skilled Trades Career Platform',
    company: 'Personal',
    description: 'Career discovery platform for skilled trades. State-by-state salary data (2,000+ rows), certification roadmaps (200+ certs), startup cost breakdowns, and a business-launch checklist. Guide pages are SSG-rendered from Postgres at build time.',
    longDescription:
      'Modern platform for discovering, qualifying for, and building a business in the skilled trades. Users explore state-by-state salary data (2,000+ rows across 50 states times 10 trades times 4 experience levels), certification requirements and costs (200+ certifications), startup cost breakdowns, and a business-launch checklist. Guide pages (per-trade and per-state) are SSG-rendered from Postgres at build time. Each landing page loads as static HTML while still reflecting real DB data. Built with Next.js 15 App Router, Supabase with row-level security, Radix UI plus Tailwind for the design system, Zod for form validation. Self-hosted on Hetzner plus Coolify after migrating off Vercel.',
    category: 'other',
    techStack: ['TypeScript', 'Next.js', 'React', 'Radix UI', 'Supabase', 'Tailwind', 'Zod', 'Hetzner', 'Coolify'],
    repoUrl: 'https://github.com/jpwilson/tradeup',
    liveUrl: 'https://tradeup.46-225-235-124.sslip.io',
    icon: 'folder',
    createdAt: '2026-03-17',
    featured: false,
    highlights: [
      '12 tables of real data. 50 states times 10 trades times 4 experience levels on salary bands. 200+ certifications. 60+ startup-cost rows. 2,000+ salary_data rows.',
      'SSG-rendered guide pages pre-built from Postgres at build time. Static HTML performance with DB-driven content.',
      'Multi-dimensional filter UI. State, trade, experience level.',
      'Next.js 15 App Router plus Supabase RLS for user-saved-trades and progress tracking.',
      'Radix UI plus Tailwind design system. Zod for form validation.',
      'Self-hosted Supabase on Hetzner plus Coolify after migrating off Vercel.',
    ],
  },
  {
    id: 'other-family-socials',
    name: 'Our Family Socials',
    company: 'Personal',
    description: 'Private family social media platform for sharing photos, events, and memories. Built for families who want a private space away from public social networks.',
    longDescription: 'A private social platform for families to connect and share photos, events, and memories in a safe, ad-free environment. Personal project started before Gauntlet.',
    category: 'other',
    techStack: [],
    repoUrl: 'https://github.com/jpwilson/OFS_Sept25',
    liveUrl: 'https://ourfamilysocials.com',
    icon: 'internet',
    createdAt: '2026-03-21',
    featured: false,
  },
  {
    id: 'other-ev-lineup',
    name: 'EV Lineup',
    company: 'Personal',
    description: 'Comprehensive electric vehicle comparison platform. Compare specs, pricing, range, and ratings across every EV on the market in one place.',
    longDescription: 'A comprehensive electric vehicle lineup and comparison platform where users can compare specs, pricing, range, and ratings across every EV on the market. Personal project started before Gauntlet.',
    category: 'other',
    techStack: [],
    repoUrl: 'https://github.com/jpwilson/eeveecars',
    liveUrl: 'https://www.evlineup.org',
    icon: 'internet',
    createdAt: '2026-02-13',
    featured: false,
  },
  {
    id: 'other-news-platform',
    name: 'News Platform',
    company: 'Personal',
    description: 'News aggregation and publishing platform. Curates content from multiple sources into a clean, readable interface.',
    longDescription: 'A news platform for aggregating and publishing content from multiple sources into a clean, readable interface. Personal project started before Gauntlet.',
    category: 'other',
    techStack: [],
    repoUrl: 'https://github.com/jpwilson/NewsPlatformFTW',
    liveUrl: 'https://newsplatform.org',
    icon: 'internet',
    createdAt: '2026-02-11',
    featured: false,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'gauntlet',
    name: 'The Gauntlet',
    description: 'Projects built during The Gauntlet program',
    icon: 'folder',
  },
  {
    id: 'other',
    name: 'Other Projects',
    description: 'Personal and pre-Gauntlet projects',
    icon: 'folder',
  },
];

// Helper functions
export function getProjects(category?: string): Project[] {
  if (category) {
    return PROJECTS.filter((p) => p.category === category);
  }
  return PROJECTS;
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
