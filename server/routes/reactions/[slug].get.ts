import { getReactionsFor } from '~~/server/utils/reactionsStore'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const data = await getReactionsFor(slug)
  return data
})
