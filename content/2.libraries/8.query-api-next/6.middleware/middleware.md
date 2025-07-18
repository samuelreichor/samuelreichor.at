---
title: 'Middleware'
description: 'Learn how you can use all middleware functions.'
---

```ts [middleware.ts]
import { createQueryApiMiddleware } from '@query-api/next/server'

export default createQueryApiMiddleware()

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
```

The middleware intercepts every incoming page request before it reaches your Server Components. Its primary job is to:

1.  **Read the Request URL:** It extracts key information from the URL, such as the page path (e.g., `/about-us`, `/news/my-article`) and any Craft CMS preview parameters (e.g., `?token=...`, `?x-craft-preview=...`).
2.  **Write to Headers:** It copies this information into the response headers. For example, it might set a header like `craft-path: /news/my-article`.

## Why It's Necessary:

The middleware is essential because of a core design principle in the Next.js App Router:

**Server Components cannot directly access the incoming request object.**

This means a Server Component has no way of knowing the URL path or its query parameters. However, Server Components *can* read request headers.

The middleware solves this problem by acting as a **bridge**. It translates the request URL information into headers, making that data accessible to Server Components so they know which content to fetch and render.

## How Helper Functions Work

Functions like `getCraftUri()`, `getCraftCurrentSite()`, and `getCraftEntry()` are designed to work with the middleware automatically.

The connection is the **`headers()`** function provided by `next/headers`.

Here’s the simple workflow:

1.  **Middleware (The Writer):** The middleware intercepts a request and writes the URL path to a header. Think of it like putting a sticky note on a file.
2.  **Helper Function (The Reader):** When you call a function like `getCraftUri()` in a Server Component, it uses the Next.js `headers()` function to find and read that "sticky note." It knows exactly which header to look for.

This provides a clean and simple developer experience. You don't need to manage headers manually; you just call a function, and it automatically gets the context it needs from the headers set by the middleware.

## Middleware examples

Here is the most straight forward example. The `createQueryApiMiddleware` function creates a middleware and sets all headers that are needed.

```ts [middleware.ts]
import { createQueryApiMiddleware } from '@query-api/next/server'

export default createQueryApiMiddleware()

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
```

If you need more control you can use the `setCraftHeaders` function. 
This function will return a response that you can use to modify further.

```ts [middleware.ts]
import { setCraftHeaders } from '@query-api/next/server'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  let res = NextResponse.next()
  res = setCraftHeaders(res, req)
  return res
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
```

## Matcher Config

The middleware is intended to run only on pages, not on static files like /favicon.ico.

A popular strategy is to match all routes that don’t start with certain segments (e.g. /_next) and also none that include a dot (.) since these typically indicate static files. However, if you have some routes where a dot is expected (e.g. /users/jane.doe), you should explicitly provide a matcher for these.

```ts [middleware.ts]
export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
 
    // However, match all pathnames within `/users`, optionally with a locale prefix
    '/([\\w-]+)?/users/(.+)'
  ]
};
```

## Get Craft Headers

If you ever need to access some of the headers that the Query API SDK sets, you can use the following functions: 

### `getCraftSiteHeaders()`

This will return an object with all relevant request context data. 

```tsx [rsc.tsx]
import { getCraftSiteHeaders } from '@query-api/next/server'

export default async function News() {
  const siteHeaders = await getCraftSiteHeaders()
  return <p>{JSON.stringify(siteHeaders)}</p>
}
```

#### Type
```ts
export async function getCraftSiteHeaders(): Promise<{
    origin: string | null;
    path: string | null;
    url: string | null;
}>
```

### `getCraftPreviewHeaders()`

This will return an object with all preview parameters in the current request context.

```tsx [rsc.tsx]
import { getCraftPreviewHeaders } from '@query-api/next/server'

export default async function News() {
  const previewHeaders = await getCraftPreviewHeaders()
  return <p>{JSON.stringify(previewHeaders)}</p>
}
```

#### Type
```ts
// key is always one of the PREVIEW_PARAMS and value is the actual query param value
// const PREVIEW_PARAMS = ['token', 'x-craft-preview', 'x-craft-live-preview']

export async function getCraftPreviewHeaders(): Promise<Record<string, string>>
```