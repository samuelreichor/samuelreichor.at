import { sql } from './db'

type ReactionKey = 'thumbsUp' | 'thumbsDown' | 'thinking' | 'rocket'

type ReactionState = {
  thumbsUp: number
  thumbsDown: number
  thinking: number
  rocket: number
}

const DEFAULT_STATE: ReactionState = {
  thumbsUp: 0,
  thumbsDown: 0,
  thinking: 0,
  rocket: 0
}

const columnMap: Record<ReactionKey, string> = {
  thumbsUp: 'thumbs_up',
  thumbsDown: 'thumbs_down',
  thinking: 'thinking',
  rocket: 'rocket'
}

export async function getReactionsFor(slug: string) {
  const rows = await sql`
    SELECT thumbs_up, thumbs_down, thinking, rocket
    FROM reactions
    WHERE slug = ${slug}
  `
  const row = rows[0]
  if (!row) {
    return { slug, reactions: { ...DEFAULT_STATE } }
  }
  return {
    slug,
    reactions: {
      thumbsUp: row.thumbs_up,
      thumbsDown: row.thumbs_down,
      thinking: row.thinking,
      rocket: row.rocket
    }
  }
}

export async function addReaction(slug: string, reaction: ReactionKey) {
  const col = columnMap[reaction]
  if (!col) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown reaction' })
  }

  await sql`
    INSERT INTO reactions (slug)
    VALUES (${slug})
    ON CONFLICT (slug) DO NOTHING
  `

  const updateQuery = `
    UPDATE reactions
    SET ${col} = ${col} + 1,
        updated_at = NOW()
    WHERE slug = $1
    RETURNING thumbs_up, thumbs_down, thinking, rocket
  `

    const rows = await sql(updateQuery, [slug])
  const updated = rows[0]

  return {
    slug,
    reactions: {
      thumbsUp: updated.thumbs_up,
      thumbsDown: updated.thumbs_down,
      thinking: updated.thinking,
      rocket: updated.rocket
    }
  }
}
