---
title: LLMify
description: 'LLMify makes your Craft CMS content instantly AI-ready.'
type: 'craft'
icon: 'craft-llmify'
---

AI models like ChatGPT struggle to read websites built for people. They see a wall of code, menus, ads, and sidebars. This "noise" makes it hard for them to find the real story - your valuable story.
LLMify solves this by converting your Twig templates into clean, structured Markdown.

::alert
  If you want to learn more about the broader landscape of Generative Engine Optimization, check out my blog post: [Current State of GEO](/blogs/current-geo-state).
::

## Why LLMify?

LLMify is built for production-scale AI content delivery.
It renders the Markdown of a page from your own templates on the first request and keeps it in Craft's data cache. The cache uses Craft's element cache tags, so a page's Markdown is invalidated as soon as the page or anything it shows changes.

Combined with Craft Commerce compatibility, granular control over your Markdowns and user permissions, LLMify gives you everything you need to make your entire site AI-ready.

## Features

### Content
- **Template-Level Control**: Use `{% llmify %}` and `{% excludeLlmify %}` Twig tags for precise control over what content is included.
- **CSS Class Exclusion**: Define classes to exclude entire sections from the HTML-to-Markdown conversion.
- **YAML Front Matter**: Configurable metadata with hierarchical inheritance (Site > Section > Entry).

### Caching
- **Rendered on Demand**: Markdown is rendered on the first request of a page and cached. There is no queue to run and no database table to keep in sync.
- **Always Up to Date**: Element cache tags invalidate a page's Markdown when the page, a related entry, an asset or a global set it shows changes, no matter where it is saved from.
- **Cache Warming**: `llmify/markdown/generate` or the LLMify utility cache every page that is not cached yet, e.g. after a deployment.
- **Clear Caches**: Clear the Markdown from the LLMify utility, from Utilities > Clear Caches or with `php craft clear-caches/llmify`.
- **Failure Reports**: Pages whose Markdown could not be rendered are listed on the dashboard, and the element sidebar shows the reason.

### AI Content Delivery
- **Auto-Serve Markdown**: Content negotiation via `Accept: text/markdown` header.
- **AI Crawler Detection**: Automatically serve Markdown to known AI bots (GPTBot, ClaudeBot, ChatGPT-User, and more).
- **LLM-Ready Text Files**: Generates `llms.txt` and `/.well-known/llms.txt`.
- **Discovery Tag**: Injects `<link rel="alternate" type="text/markdown">` and `<link rel="describedby" href="/llms.txt">` into your HTML head, as recommended by the [llms.txt spec](https://llmstxt.org/).
- **[WebMCP Tools](/libraries/craft-llmify/usage/webmcp)**: Opt-in support for the experimental WebMCP standard, giving in-browser AI agents (e.g. Gemini in Chrome) read-only search, page, and navigation tools over your enabled content.
- **[Twig Functions](/libraries/craft-llmify/usage/twig-functions)**: `mdUrl()`, `chatGptUrl()`, and `claudeUrl()` for "View as Markdown" links and buttons that open the current page in ChatGPT or Claude.
- **Industry Standard Response Headers**: Sets `Vary: Accept`, `X-Robots-Tag: noindex, nofollow`, and a `Link` header with `rel="describedby"` (pointing to `llms.txt`) on all Markdown responses, plus `rel="canonical"` on `.md` URLs.

### Headless
- **[Headless Support](/libraries/craft-llmify/usage/headless)**: Running a separate front end (Nuxt, Next, Astro, ...)? LLMify fetches your front-end URLs, converts and caches the result, and exposes API endpoints to serve `llms.txt` and individual `.md` pages from your own domain.

### Content Management
- **Hierarchical Settings**: Site-wide, section, and entry-level configuration with inheritance.
- **Per-Entry Control**: Include or exclude individual entries via the LLMify Settings Field.
- **Permission System**: Granular user permissions for dashboard, content settings, site settings, warming and clearing the cache.
- **Preview Targets**: Preview Markdown output directly from the entry editor.
- **Dashboard**: Site setup score, cache status, failed pages and section-level content statistics at a glance.

### Integrations
- **SEOmatic Integration**: Automatically populate front matter from SEOmatic fields.
- **Craft Commerce Support**: Full support for Commerce Products alongside Entries.
- **[Blitz](/libraries/craft-llmify/usage/auto-serve#blitz-integration)**: Markdown requests bypass the Blitz cache.
- **[AI Bot Analytics](/libraries/craft-llmify/usage/ai-bot-analytics)**: Install [Craft Insights](/libraries/craft-insights) to get a dedicated dashboard for AI bot traffic, crawler breakdowns, top visited Markdowns, and delivery splits across every Markdown response your site serves.

## Why it Matters

### Future-Proof Your Site

The way we find information is changing. Search is evolving from a list of links into a direct conversation with AI. 
By making your content perfectly readable for machines, you ensure your website remains a trusted, primary source for these new systems. 
You're not just optimizing for today; you're securing your relevance for tomorrow's web.

### Improve AI Accuracy

AI models are powerful, but they're only as good as the data they read. When they parse messy HTML, they have to guess what's important, often leading to incorrect summaries and unreliable answers. 
By feeding them clean, structured content, you eliminate the guesswork. This ensures that when an AI references your site, it represents your brand and information with the accuracy you can trust.

### Gain a Competitive Edge

Right now, most websites are only built for human eyes. This gives you a massive opportunity. By making your site "bilingual"—fluent in both human-centric design and machine-readable text—you put yourself 
far ahead of the competition. While their content is ignored or misinterpreted by AI, yours will be the clear, authoritative source, capturing a rapidly growing channel of traffic and influence.
