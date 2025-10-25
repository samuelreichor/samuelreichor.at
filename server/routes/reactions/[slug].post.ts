import { addReaction } from '~~/server/utils/reactionsStore'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const body = await readBody<{ reaction: 'thumbsUp' | 'thumbsDown' | 'heart' | 'rocket' }>(event)

  if (!body?.reaction) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing reaction'
    })
  }

  const updated = await addReaction(slug, body.reaction)
  return updated
})
