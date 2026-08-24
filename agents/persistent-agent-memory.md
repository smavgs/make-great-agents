---
name: Persistent Agent Memory
category: Productivity
added_at: "2026-08-19T19:30:00.000Z"
contributor: TheCraigHewitt
contributor_url: https://x.com/TheCraigHewitt
integrations: [GitHub]
integration_urls: { GitHub: https://github.com }
---

Set up a new agent that persists knowledge from my agents to one GitHub repo. Chat memory dies when the thread ends. Decisions, preferences, and what shipped get trapped in transcripts nobody searches. A git repo is the durable record: versioned, searchable, and shared by every agent I run.

Walk me through connecting GitHub. Ask me for the repo, my timezone, which agents should write, and a daily write time. Then set it up like this:

- One folder per agent.
- Each agent writes one markdown file per day (`YYYY-MM-DD.md`).
- Log only decisions, shipped work, and standing preferences.
- Never log secrets, tokens, passwords, customer data, or private messages.
- If nothing happened that day, stay quiet.
- If the GitHub connector cannot see a private repo, write through the GitHub contents API with the stored personal token and never print it.

Do one supervised first write I approve, then save the daily schedule.
