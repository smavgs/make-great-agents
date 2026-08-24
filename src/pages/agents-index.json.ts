import { getAgents } from '../lib/data';

/**
 * Machine-readable dedupe index for the X mention agent: one request replaces
 * per-file GitHub reads. Regenerated on every deploy.
 */
export async function GET() {
  const agents = await getAgents();
  return new Response(
    JSON.stringify({ agents: agents.map((b) => ({ slug: b.slug, url: b.url ?? null })) }),
    { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' } },
  );
}
