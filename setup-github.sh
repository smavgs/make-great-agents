#!/usr/bin/env bash
#
# setup-github.sh — wire this folder to a GitHub repo you create yourself.
#
# Usage:   ./setup-github.sh <your-github-username>
# Example: ./setup-github.sh roman
#
# What it does:
#   1. Points the git remote `origin` at github.com/<you>/make-great-agents
#   2. Replaces the placeholder repo URLs in src/config.ts with the real ones
#   3. Commits the change so the site's GitHub links are correct before push
#
# After running it, create the repo on github.com (see printed steps),
# then:  git push -u origin main

set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: ./setup-github.sh <your-github-username>" >&2
  exit 1
fi

USERNAME="$1"
REPO="make-great-agents"
URL="https://github.com/${USERNAME}/${REPO}.git"

# Basic sanity: GitHub usernames are alphanumeric, may contain single hyphens.
if ! [[ "$USERNAME" =~ ^[A-Za-z0-9](-?[A-Za-z0-9])*$ ]]; then
  echo "error: '$USERNAME' doesn't look like a GitHub username" >&2
  exit 1
fi

cd "$(dirname "$0")"

# 1. Remote (replace if one already exists)
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$URL"
  echo "✓ updated remote origin → $URL"
else
  git remote add origin "$URL"
  echo "✓ added remote origin → $URL"
fi

# 2. Real repo URLs in the site config
if grep -q "github.com/makegreatagents" src/config.ts; then
  sed -i '' "s#github.com/makegreatagents#github.com/${USERNAME}#g" src/config.ts
  git add src/config.ts
  git commit -q -m "Point site repo URLs at github.com/${USERNAME}/${REPO}

Co-Authored-By: Claude <noreply@anthropic.com>"
  echo "✓ src/config.ts now links to github.com/${USERNAME}/${REPO} (committed)"
else
  echo "• src/config.ts already looks wired — left untouched"
fi

cat <<EOF

—————————————————————————————————————————————————————————————
Now create the repo on GitHub (the empty way):

  1. Go to https://github.com/new
  2. Repository name:  ${REPO}
  3. Public (a prompt directory only works open-source)
  4. IMPORTANT: leave README / .gitignore / license UNCHECKED —
     the repo must start empty or the first push will be rejected.
  5. Click "Create repository".

Then push from this folder:

  git push -u origin main

If you have not authenticated git with GitHub on this Mac yet,
pick one before pushing:

  gh auth login                     # easiest — browser login, then push
  # or: add ~/.ssh/codex_i7_peer_ed25519.pub under
  #      GitHub → Settings → SSH and GPG keys, then run:
  git remote set-url origin git@github.com:${USERNAME}/${REPO}.git

If GitHub auto-created a README anyway and the push is rejected:

  git pull origin main --rebase --allow-unrelated-histories
  git push -u origin main

After the push: the Validate workflow builds the site on every PR,
and Deploy publishes to Cloudflare once you add a CLOUDFLARE_API_TOKEN
secret (until then deploy is skipped and the build stays green).
—————————————————————————————————————————————————————————————
EOF
