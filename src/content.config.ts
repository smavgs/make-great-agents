import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './lib/constants';

const httpsUrl = z.string().url().refine((value) => value.startsWith('https://'), 'Must use HTTPS');

const agents = defineCollection({
  loader: glob({ pattern: '*.md', base: './agents' }),
  schema: z.object({
    name: z.string().min(1),
    category: z.enum(CATEGORIES),
    /** UTC timestamp when the listing was added to the directory. */
    added_at: z.string().datetime(),
    /** Whose setup this is. Optional — some sources are anonymous. */
    contributor: z.string().min(1).optional(),
    /** Where the contributor handle links. Defaults to github.com/<contributor>. */
    contributor_url: z.string().url().optional(),
    /** X handle of whoever tagged/submitted someone else's setup. */
    scouted_by: z.string().min(1).optional(),
    integrations: z.array(z.string().min(1)).min(1),
    /** Official integration homepages, used only to retrieve favicons at deploy time. */
    integration_urls: z.record(z.string().min(1), httpsUrl).optional(),
    /** Optional canonical homepage/GitHub of the agent (dedupe key). */
    url: z.string().url().optional(),
    /** Optional source tweet URL when added by the X mention agent. */
    added_via: z.string().url().optional(),
  }).superRefine((agent, ctx) => {
    for (const name of Object.keys(agent.integration_urls ?? {})) {
      if (!agent.integrations.includes(name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['integration_urls', name],
          message: 'Must match a name in integrations',
        });
      }
    }
  }),
});

export const collections = { agents };
