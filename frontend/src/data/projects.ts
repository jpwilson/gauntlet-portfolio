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
    description: 'Real-time collaborative whiteboard with AI-powered content generation. Teams brainstorm simultaneously while an AI agent creates and arranges sticky notes, shapes, and connectors through natural language commands.',
    longDescription:
      'A full-featured collaborative whiteboard platform where teams can brainstorm and run workshops in real time. Features an AI agent that creates and arranges board content through natural language commands, with support for 6+ distinct command types. Includes Google/GitHub OAuth, email auth, and last-write-wins conflict resolution for real-time sync across multiple clients.',
    category: 'gauntlet',
    week: 1,
    techStack: ['Python', 'TypeScript', 'Anthropic Claude', 'FastAPI', 'Konva.js', 'LangChain', 'Langfuse', 'Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Docker', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/colabboard',
    liveUrl: 'https://claudeorim.vercel.app/',
    icon: 'folder',
    createdAt: '2026-02-23',
    featured: true,
    challenges:
      'Real-time synchronization across multiple clients, handling conflict resolution for concurrent edits, integrating AI agent with canvas rendering.',
    learnings:
      'WebSocket management, Supabase real-time subscriptions, optimistic UI updates, LangChain agent architecture.',
  },
  {
    id: 'week2-agentfolio',
    name: 'Agent-Folio',
    company: 'Gauntlet',
    description: 'AI-powered portfolio analysis assistant that connects to wealth management tools. Users ask natural language questions about their portfolio and get verified answers with hallucination detection.',
    longDescription:
      'An AI portfolio analysis assistant connecting to Ghostfolio (stocks/ETFs) and Rotki (crypto). Users ask questions in natural language and the system calls the right financial APIs to return verified answers. Features a verification layer with deterministic checks, guardrails for prompt injection defense, and an admin panel for model switching. Includes 75 eval test cases and supports 4 SDK adapters plus OpenRouter.',
    category: 'gauntlet',
    week: 2,
    techStack: ['Python', 'Anthropic Claude', 'FastAPI', 'LangChain', 'Langfuse', 'LiteLLM', 'OpenAI', 'PostgreSQL', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson/agent-folio',
    liveUrl: 'https://agent-folio-production.up.railway.app/',
    icon: 'folder',
    createdAt: '2026-03-02',
    featured: false,
    challenges:
      'Building a reliable verification layer without LLM-as-judge, supporting multiple financial API adapters, prompt injection defense.',
    learnings:
      'Multi-model orchestration with LiteLLM, deterministic hallucination detection, financial API integration patterns.',
  },
  {
    id: 'week3-legacylens',
    name: 'LegacyLens',
    company: 'Gauntlet',
    description: 'RAG system that makes legacy Fortran codebases queryable through natural language. Achieves 92% precision with exact file and line citations from 2,376 indexed chunks.',
    longDescription:
      'A Retrieval-Augmented Generation system that helps developers query large legacy codebases using natural language. Built for the LAPACK Fortran codebase (116 MB, 1,750+ files, 2,376 indexed chunks). Users ask plain English questions and receive precise answers with exact file and line citations. Achieves 92% precision@5, 94% term coverage, and 96% citation rate.',
    category: 'gauntlet',
    week: 3,
    techStack: ['CSS', 'HTML', 'JavaScript', 'Python', 'Anthropic Claude', 'D3.js', 'FastAPI', 'Pinecone', 'Voyage AI', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson',
    liveUrl: 'https://legacylens-production-e04c.up.railway.app/',
    vizUrl: 'https://legacylens-production-e04c.up.railway.app/graph.html',
    icon: 'folder',
    createdAt: '2026-03-02',
    featured: true,
    challenges:
      'Indexing and chunking a massive Fortran codebase effectively, tuning retrieval precision, balancing latency with answer quality.',
    learnings:
      'RAG pipeline architecture, vector embeddings for code, Pinecone vector database operations, prompt engineering for code Q&A.',
  },
  {
    id: 'week4-nerdy-live',
    name: 'Nerdy Live Session Analysis',
    company: 'Nerdy',
    demoUrl: 'https://loom.com/share/folder/6c9cf7a8be0249d2a36b66831e5215d3',
    description: 'Real-time AI-powered tutoring session analysis using face mesh detection. Tracks student engagement metrics like eye contact, speaking time, and attention drift with live coaching nudges.',
    longDescription:
      'Built for Nerdy/Varsity Tutors, this app analyzes student engagement during live tutoring sessions using MediaPipe face mesh detection. Tracks metrics like eye contact, speaking time, energy, and attention drift, then provides real-time coaching nudges and post-session AI summaries. Includes a force-directed session graph visualization, per-student engagement trends, and a companion iOS app.',
    category: 'gauntlet',
    week: 4,
    techStack: ['CSS', 'HTML', 'Swift', 'TypeScript', 'LiveKit', 'MediaPipe', 'Supabase', 'Web Speech API', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson',
    liveUrl: 'https://student-call.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-16',
    featured: false,
    challenges: 'Sub-second face mesh processing on GPU, correlating multiple engagement signals into a single score, building a native iOS companion.',
    learnings: 'MediaPipe Face Landmarker, LiveKit WebRTC integration, real-time metric aggregation, native iOS development with Swift.',
  },
  {
    id: 'week4-nerdy-tutor',
    name: 'Nerdy AI Video Tutor',
    company: 'Nerdy',
    description: 'Real-time AI video avatar tutor for grades 6-12 using the Socratic method. Streams through an STT → LLM → TTS → Avatar pipeline with sub-second end-to-end latency.',
    longDescription:
      'A real-time AI video avatar tutor that teaches grades 6-12 using the Socratic method. Streams through an STT → LLM → TTS → Avatar pipeline to create an interactive video tutoring experience with sub-second latency. Supports both full video avatar mode via Anam AI and a degraded SVG avatar + text chat mode for development.',
    category: 'gauntlet',
    week: 4,
    techStack: ['TypeScript', 'Anam AI SDK', 'Anthropic Claude', 'Groq', 'React', 'React Router', 'Supabase', 'Turborepo', 'Vite', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson',
    liveUrl: 'https://vidtutv1.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-16',
    featured: false,
    challenges: 'Achieving sub-second end-to-end latency across STT/LLM/TTS/Avatar pipeline, graceful degradation without API keys.',
    learnings: 'Real-time audio/video pipelines, Anam AI avatar SDK, Groq for low-latency inference, pnpm monorepo with Turborepo.',
  },
  {
    id: 'week4-gofundme',
    name: 'AI Enhanced GoFundMe',
    company: 'GoFundMe',
    description: 'High-fidelity GoFundMe reconstruction with an AI Giving Agent for automated, values-aligned monthly donations. Includes Metrics Lab analytics dashboard and 175 tests.',
    longDescription:
      'A pixel-level GoFundMe clone built with Next.js 16 that reconstructs core pages and adds original features including a Metrics Lab analytics dashboard and an AI Giving Agent for automated, values-aligned monthly donations. Features search, fundraiser creation wizard, community pages, and full donation flow. Includes 175 tests with Vitest and Testing Library.',
    category: 'gauntlet',
    week: 4,
    techStack: ['TypeScript', 'Next.js', 'React', 'React Hook Form', 'React Query', 'Tailwind CSS', 'Vitest', 'Zod', 'Zustand', 'GitHub Actions', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/gfm-v1',
    liveUrl: 'https://gfmv1.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-06',
    featured: false,
    challenges: 'Pixel-perfect recreation of a complex production UI, building a testable AI agent for donation automation.',
    learnings: 'Next.js 16 App Router, Turbopack, comprehensive testing strategies, form validation with Zod + React Hook Form.',
  },
  {
    id: 'week5-zapier-triggers',
    name: 'Triggers API',
    company: 'Zapier',
    description: 'Unified RESTful interface for event ingestion, persistence, and delivery — the foundation for event-driven automation. Supports push delivery with exponential backoff and pull-based inbox retrieval.',
    longDescription:
      'A unified RESTful interface for event ingestion, persistence, and delivery. Accepts events from any external source, stores them durably, and delivers via push (with exponential backoff retry) or pull (inbox-style with cursor pagination). Features subscription-based filtering by event type/source, real-time monitoring stats, and auto-generated OpenAPI docs.',
    category: 'gauntlet',
    week: 5,
    techStack: ['JavaScript', 'Python', 'FastAPI', 'Jinja2', 'Langfuse', 'OpenAI', 'SQLite', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson/triggers-api',
    liveUrl: 'https://triggers-api-production-aa41.up.railway.app/',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    challenges: 'Designing a reliable push delivery system with exponential backoff, cursor-based pagination for inbox retrieval.',
    learnings: 'Event-driven architecture patterns, subscription filtering, background task processing with FastAPI.',
  },
  {
    id: 'week5-skyfi',
    name: 'SkyFi MCP Server',
    company: 'SkyFi',
    description: 'Production-ready MCP server for SkyFi\'s satellite imagery API. Provides 20 tools for AI agents to search 150+ satellites from 12+ providers, compare pricing, and order imagery through natural language.',
    longDescription:
      'A production-ready Model Context Protocol server for SkyFi\'s satellite imagery Platform API. Provides 20 tools that let AI agents search 150+ satellites from 12+ providers (Planet, ICEYE, Umbra, Satellogic, etc.), compare pricing, and order archive or tasking imagery through natural language. Compatible with Claude Desktop, GPT, Gemini, LangChain, and any MCP-compatible agent. Pip-installable as skyfi-mcp.',
    category: 'gauntlet',
    week: 5,
    techStack: ['Python', 'httpx', 'MCP Protocol', 'Pydantic', 'pytest', 'Shapely', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson',
    liveUrl: '',
    icon: 'folder',
    createdAt: '2026-03-21',
    featured: false,
    challenges: 'Mapping 20 API endpoints to MCP tools, geospatial query normalization with Shapely, supporting both HTTP and stdio transport.',
    learnings: 'Model Context Protocol specification, geospatial data handling, building pip-installable Python packages.',
  },
  {
    id: 'week6-upstream-community',
    name: 'Upstream Literacy Community',
    company: 'Upstream Literacy',
    description: 'Multi-level community platform connecting literacy leaders and school district administrators. Matches members based on demographic data and shared problem statements with built-in messaging.',
    longDescription:
      'A community platform connecting literacy leaders and school district administrators. Matches members based on demographic data (district size, FRL%, ESL%) and shared problem statements, with built-in direct messaging and admin moderation. Features computed match scores for peer-finding, content flagging, and staff can enter conversations as moderators.',
    category: 'gauntlet',
    week: 6,
    techStack: ['JavaScript', 'Python', 'Axios', 'Django', 'Django REST Framework', 'React', 'React Router', 'PostgreSQL', 'Docker', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/literacy-community',
    liveUrl: 'https://frontend-plum-iota-35.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    challenges: 'Designing a matching algorithm based on multiple demographic dimensions, real-time messaging with Django Channels.',
    learnings: 'Django REST Framework, computed match scoring, WebSocket integration with Django Channels.',
  },
  {
    id: 'week6-upstream-ecommerce',
    name: 'Upstream e-Commerce',
    company: 'Upstream Literacy',
    description: 'Full-stack e-commerce platform for children\'s literacy products. Features product catalog, session-persistent cart, guest and registered checkout, and payment processing.',
    longDescription:
      'A full-stack e-commerce platform for children\'s literacy products with product catalog and categories, shopping cart with session persistence, checkout for guest and registered users, and payment processing stubs for Stripe and PayPal. Features inventory management with stock levels, order status tracking, email confirmations, and session-based cart that merges on login.',
    category: 'gauntlet',
    week: 6,
    techStack: ['JavaScript', 'Python', 'Django', 'Django REST Framework', 'React', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Railway'],
    repoUrl: 'https://github.com/jpwilson/Upstream-e-Commerce',
    liveUrl: 'https://loving-exploration-production-976f.up.railway.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    challenges: 'Session-based cart that merges on login, inventory management with concurrent stock updates.',
    learnings: 'Django e-commerce patterns, Stripe/PayPal integration stubs, session management across guest and authenticated users.',
  },
  {
    id: 'week6-servicecore',
    name: 'ServiceCore',
    company: 'ServiceCore',
    description: 'Employee time tracking and payroll dashboard for field service companies. Features AI-powered assistant, automatic overtime calculation, manager approval workflows, and real-time labor cost visibility.',
    longDescription:
      'A full-featured employee time tracking and payroll dashboard built for field service companies. Replaces manual spreadsheets with digital time clock in/out, automatic overtime calculation based on 40-hour weeks, manager approval workflows, real-time dashboards, and automated email reminders. Includes an AI agent with guardrails and evals, 108 tests, and comprehensive CI/CD pipeline.',
    category: 'gauntlet',
    week: 6,
    techStack: ['TypeScript', 'Next.js', 'Playwright', 'React', 'Supabase', 'Tailwind CSS', 'Turborepo', 'Vitest', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/service_core',
    liveUrl: 'https://servicecore-six.vercel.app/',
    icon: 'folder',
    createdAt: '2026-03-23',
    featured: false,
    challenges: 'Automatic overtime calculation with edge cases, manager approval state machine, AI agent guardrails for payroll data.',
    learnings: 'pnpm monorepo with Turborepo, Supabase row-level security for multi-tenant data, AI agent evals and tracing.',
  },
  {
    id: 'week6-equinox',
    name: 'Equinox',
    company: 'Peak6',
    description: 'Cross-venue prediction market aggregation and routing simulation engine. Detects equivalent markets across platforms and simulates trade routing decisions with explanations.',
    longDescription:
      'A cross-venue prediction market aggregation and routing simulation engine built in Go. Connects to multiple prediction market platform APIs, detects equivalent markets across venues using normalization and matching logic, and simulates routing decisions for hypothetical trades with explanations. Built as an infrastructure prototype focusing on market equivalence detection and venue-agnostic routing.',
    category: 'gauntlet',
    week: 6,
    techStack: ['Go', 'HTML', 'Docker', 'GCP Cloud Run'],
    repoUrl: 'https://github.com/jpwilson/equinox',
    liveUrl: 'https://equinox-117180154446.us-central1.run.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    challenges: 'Market equivalence detection across different naming conventions, venue-agnostic routing logic.',
    learnings: 'Go web development, prediction market APIs, rule-based and heuristic matching algorithms, GCP Cloud Run deployment.',
  },
  {
    id: 'week6-st6',
    name: 'Weekly Commit Module',
    company: 'ST6',
    description: 'Micro-frontend module for RCDO-linked weekly planning, designed to replace 15-Five. Features weekly commit tracking with analytics visualizations and Supabase-backed persistence.',
    longDescription:
      'A production-ready micro-frontend module designed to replace 15-Five with RCDO-linked weekly planning. Provides weekly commit tracking and planning functionality with analytics visualizations via Recharts. Built with Supabase for auth and data persistence, with comprehensive E2E testing via Playwright.',
    category: 'gauntlet',
    week: 6,
    techStack: ['TypeScript', 'Next.js', 'Playwright', 'React', 'Recharts', 'Supabase', 'Tailwind CSS', 'Vitest', 'Zustand', 'Vercel'],
    repoUrl: 'https://github.com/jpwilson/weekly-commit-module',
    liveUrl: 'https://st6.vercel.app',
    icon: 'folder',
    createdAt: '2026-03-24',
    featured: false,
    challenges: 'Designing a micro-frontend that integrates with a larger platform, week-boundary date logic.',
    learnings: 'Micro-frontend architecture, Recharts for analytics, Playwright E2E testing, Supabase row-level security.',
  },

  // ---- OTHER PROJECTS ----
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
