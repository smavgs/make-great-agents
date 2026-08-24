/**
 * Every branded string, URL and knob for the site lives here — nowhere else.
 * Change the repo URL / handles in this one file.
 */

export const SITE = {
  /** Wordmark shown in the header, footer and `<title>` suffix. */
  wordmark: 'Make Great Agents',
  /** Canonical origin (no trailing slash). TODO: set the real domain when chosen. */
  url: 'https://makegreatagents.com',
  /** Default meta description / footer blurb. */
  tagline: 'Ready-to-use prompts for Codex agents — and any agent you already use. Copy one, connect your tools, done.',
  /** Site name for structured data. */
  shortName: 'Make Great Agents',

  /** Public GitHub repo. TODO: set the real owner/repo once created. */
  repoUrl: 'https://github.com/makegreatagents/make-great-agents',
  contributingUrl: 'https://github.com/makegreatagents/make-great-agents/blob/main/CONTRIBUTING.md',

  /** Products linked from the header / footer / copy — Codex first. */
  codexUrl: 'https://openai.com/codex',
  codexCliUrl: 'https://developers.openai.com/codex/cli/',
  codexGithubUrl: 'https://github.com/openai/codex',

  copyrightHolder: 'Make Great Agents',
  copyrightYear: 2026,
} as const;

export const COPIES_API = {
  /**
   * When true, every prompt copy also fires a fire-and-forget
   * POST { slug } to `endpoint` so counts aggregate globally.
   * Disabled until a backend exists; set `endpoint` and flip on.
   */
  enabled: false,
  endpoint: '',
} as const;

export const FEATURES = {
  /**
   * Show copy counts (table column, card meta, bot-page badge) and the
   * "Most copied" sort. Needs the copies backend above — off for launch.
   */
  showCopies: false,
} as const;
