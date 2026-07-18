# ask-agent — "Ask about my work"

A tiny FastAPI service that answers visitor questions about JP's portfolio,
grounded in `knowledge.json` (generated from the site's `projects.ts`).

## Where the API key goes

**Coolify → your service → Environment Variables → `ANTHROPIC_API_KEY`.**
Never in this repo, never in the frontend — anything shipped to GitHub Pages
is public.

## Deploy on Coolify (~5 minutes)

1. Coolify → **+ New Resource → Public Repository** →
   `https://github.com/jpwilson/gauntlet-portfolio`
2. Build pack: **Dockerfile** · Base directory: **/ask-agent** · Port: **8000**
3. **Environment Variables**:
   - `ANTHROPIC_API_KEY` = `sk-ant-...` (required)
   - `ANTHROPIC_MODEL` = optional override (defaults to `claude-opus-4-8`;
     set `claude-haiku-4-5` for the cheapest option)
   - `ASK_GLOBAL_DAILY_CAP` = optional, defaults to 400 questions/day
4. Deploy. Coolify assigns an HTTPS URL (e.g. `https://ask.<ip>.sslip.io`).
5. Verify: `curl https://<your-url>/healthz` → `{"ok":true,"projects":20}`
6. Put that URL into `frontend/src/data/askConfig.ts` (`ASK_ENDPOINT`) and
   redeploy the site — the 🔮 plaque appears automatically.

## Cost guards

- Per-IP: 6 questions/minute · Global: 400/day (hard 429s after that)
- Prompt caching: the ~10K-token knowledge base is cached, so repeat
  questions read it at ~0.1× price
- Question length capped at 500 chars, answers at 1024 tokens

## Regenerating knowledge.json

After editing `frontend/src/data/projects.ts`:

```sh
cd frontend
npx esbuild src/data/projects.ts --bundle --format=esm --outfile=/tmp/projects-dump.mjs
node -e "import('/tmp/projects-dump.mjs').then(m => require('fs').writeFileSync('../ask-agent/knowledge.json', JSON.stringify({projects: m.PROJECTS.map(p => ({id:p.id,name:p.name,company:p.company,category:p.category,week:p.week,description:p.description,longDescription:p.longDescription,techStack:p.techStack,highlights:p.highlights,repoUrl:p.repoUrl,liveUrl:p.liveUrl,demoUrl:p.demoUrl,lastCommit:p.createdAt}))}, null, 1)))"
```

Then redeploy the service in Coolify.
