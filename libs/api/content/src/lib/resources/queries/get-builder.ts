import { sql } from '@sovereign-university/database';
import { JoinedBuilder } from '@sovereign-university/types';

export const getBuilderQuery = (id: number, language?: string) => {
  return sql<JoinedBuilder[]>`
    SELECT 
      r.id, r.path, bl.language, b.name, b.category, b.website_url, b.twitter_url, 
      b.github_url, b.nostr, bl.description, r.last_updated, r.last_commit,
      ARRAY_AGG(t.name) AS tags
    FROM content.builders b
    JOIN content.resources r ON r.id = b.resource_id
    JOIN content.builders_localized bl ON bl.builder_id = b.resource_id
    LEFT JOIN content.resource_tags rt ON rt.resource_id = r.id
    LEFT JOIN content.tags t ON t.id = rt.tag_id
    WHERE r.id = ${id}
    ${language ? sql`AND bl.language = ${language}` : sql``}
    GROUP BY r.id, bl.language, b.name, b.category, b.website_url, b.twitter_url,
    b.github_url, b.nostr, bl.description
  `;
};
