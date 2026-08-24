# Contributing

An agent is one markdown file in `agents/`. Add the file, open a pull request, and it
shows up on the site. No plugin API, no review board.

## The agent file contract

`agents/<slug>.md` — the slug is the `name` lowercased with every run of
non-alphanumerics replaced by `-` (e.g. `SEO Improver` → `seo-improver`).

```markdown
---
name: SEO Improver
category: Marketing
added_at: "2026-08-18T12:00:00.000Z"     # UTC time the listing is added
contributor: your-handle                 # optional — whose setup this is
contributor_url: https://github.com/you  # optional — where the handle links (default: GitHub)
scouted_by: someoneelse                  # optional — handle of whoever found/submitted it
integrations: [GitHub, DataForSEO, Search Console]
integration_urls:                       # optional; lets deploy fetch missing favicons
  DataForSEO: https://dataforseo.com
url: https://example.com/my-agent          # optional — canonical homepage (dedupe key)
---

<the prompt, verbatim, as the file body>
```

- **name** — what the agent is called on the shelf.
- **added_at** — the UTC time the listing is added, as an ISO 8601 timestamp.
- **category** — one of: `Productivity`, `Sales`, `Marketing`, `Ops`, `Success`,
  `Personal`. Pick the closest fit — this list is deliberately short and curated.
- **contributor** — whose setup/prompt this is (optional; omit for anonymous
  sources). Links to `contributor_url` if set, else `github.com/<contributor>`.
- **scouted_by** — if you're submitting someone *else's* setup, put the author in
  `contributor` and your own handle here — you get a "scouted by" credit on the
  page.
- **integrations** — the tools the prompt connects, as plain names
  (`[Gmail, Notion, Stripe]`). Any tool name is welcome — there's no fixed list.
  If the tool has an entry in [`data/tool-icons.json`](data/tool-icons.json)
  it shows its brand icon; otherwise the chip is just the name. Adding one for
  a new tool is appreciated but optional:

  ```json
  // an SVG from https://svgl.app or https://simpleicons.org (preferred)…
  "Stripe": "https://svgl.app/library/stripe.svg"
  // …a light/dark pair for mono logos so they stay visible in dark mode…
  "GitHub": { "light": "https://svgl.app/library/github_light.svg", "dark": "https://svgl.app/library/github_dark.svg" }
  // …or the tool's own favicon, pulled from its site
  "Gong": { "site": "https://www.gong.io" }
  ```

  Then run `pnpm icons` to download into `public/icons/` and commit the file
  alongside.

- **integration_urls** — optional official HTTPS homepages keyed by the exact
  names in `integrations`. On deploy, these are sent to Google's favicon proxy
  and mirrored into the site; the build runner never requests contributed
  hosts directly. Exact Simple Icons matches are discovered automatically, and
  every remaining integration gets a generated monogram rather than a blank.

- Copy counts are **not** part of the file.
- The **body is the prompt itself** — exactly what someone pastes into Codex
  or any other agent. No extra prose around it.

The value is the chip's dot color — pick the closest family color already in use.

## Quality bar

- **Real agent, working prompt.** You ran it end to end in Codex or another
  agent before opening the PR.
- **Self-contained.** The prompt should ask for what it needs (connections,
  schedules, context) and end by saving itself as an agent.
- **No pure ads.** A listing that exists to funnel people to your product will
  be closed.

## Checks

Every PR runs `pnpm validate` (schema, filename = slug, unique slug, known
category, non-empty prompt, unique `url`) plus `astro check` and a full
build. Run them locally:

```sh
pnpm install
pnpm validate
pnpm build
```

## Local dev

```sh
pnpm install
pnpm dev        # http://localhost:4321
```
