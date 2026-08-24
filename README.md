<p align="center">
  <img src="./public/images/brand/wizard-logo-v2.jpg" alt="Make Great Agents wizard logo" width="150" />
</p>

# Make Great Agents

A community-maintained directory of ready-to-use agent prompts for
[OpenAI Codex](https://openai.com/codex) — and any agent you already use.
Copy a prompt, paste it into your agent, and it sets itself up as a scheduled
worker: email triage, daily briefings, SEO fixes, churn warnings, and more.

## Add your agent in 2 minutes

An agent is one markdown file in [`agents/`](agents/):

```markdown
---
name: SEO Improver
category: Marketing
added_at: "2026-08-18T12:00:00.000Z"
contributor: your-handle
integrations: [GitHub, DataForSEO, Search Console]
---

Set up a new agent for me. Walk me through connecting GitHub, DataForSEO and
Google Search Console, then schedule it every 2 weeks: find pages losing
impressions or sitting on page two, rewrite titles and metadata, fix internal
links, and open a PR I review before merge.
```

1. Fork this repo and add `agents/<slug>.md` (slug = name, lowercased,
   non-alphanumerics → `-`).
2. Open a pull request. CI validates the file; once merged it's live.

Full contract, category list, and quality bar: [CONTRIBUTING.md](CONTRIBUTING.md).

## Public feed

`GET https://makegreatagents.com/api/agents.json` returns every listing — slug,
name, category, integrations, contributor, and the full prompt — as one static
JSON file rebuilt on every merge. Full contract on the
[API page](https://makegreatagents.com/api/).

## Local dev

Astro static site, TypeScript, pnpm, no UI framework.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static build in dist/
pnpm validate   # check every file in agents/
pnpm check      # astro check (types)
```

`[Donate](https://donatr.ee/aegiswizard?utm_source=copy&utm_medium=share) - Aegis Wizard 🧙‍♂️`
