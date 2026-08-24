import { SITE } from '../../config';
import { getAgents } from '../../lib/data';

/** Public, machine-readable directory feed. Listings are newest first. */
export async function GET() {
  const agents = [...(await getAgents())].sort(
    (a, b) => b.addedAt.localeCompare(a.addedAt) || a.name.localeCompare(b.name),
  );

  return new Response(
    JSON.stringify({
      version: 1,
      agents: agents.map((agent) => ({
        slug: agent.slug,
        name: agent.name,
        category: agent.category,
        addedAt: agent.addedAt,
        integrations: agent.integrations,
        prompt: agent.prompt,
        contributor: agent.contributor ?? null,
        sourceUrl: agent.url ?? null,
        detailUrl: `${SITE.url}/agents/${agent.slug}/`,
      })),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    },
  );
}
