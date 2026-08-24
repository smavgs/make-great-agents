## What's in this PR

<!-- One line: which agent you're adding or what you're changing. -->

## Checklist (adding an agent)

- [ ] One markdown file in `bots/`, named after the slug of the agent's `name`
      (lowercase, non-alphanumerics → `-`, e.g. `SEO Improver` → `bots/seo-improver.md`)
- [ ] Frontmatter has `name`, `category`, `contributor`, `integrations` (see CONTRIBUTING.md)
- [ ] Integrations have an icon in `data/tool-icons.json` where possible (add + `pnpm icons`; see CONTRIBUTING)
- [ ] The prompt is the file body, tested end to end in Codex or another agent
- [ ] `pnpm validate` passes locally
- [ ] This is a real, working agent — not an ad
