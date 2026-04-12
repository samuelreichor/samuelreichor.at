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
Instead of converting HTML to Markdown on every request, LLMify does the work upfront. Your Markdown is stored and ready before any bot shows up.
Combined with Craft Commerce compatibility, granular control over your Markdowns and user permissions, LLMify gives you everything you need to make your entire site AI-ready.

## Features

### Content Generation
- **Pre-Generated Markdown**: Async batch processing stores Markdown in a dedicated database table for instant delivery at any scale.
- **On-Demand Fallback**: Automatically generates Markdown on first request if not yet pre-generated.
- **Template-Level Control**: Use `{% llmify %}` and `{% excludellmify %}` Twig tags for precise control over what content is included.
- **CSS Class Exclusion**: Define classes to exclude entire sections from the HTML-to-Markdown conversion.
- **YAML Front Matter**: Configurable metadata with hierarchical inheritance (Site > Section > Entry).
- **Console Commands**: `llmify/markdown/generate` and `llmify/markdown/clear` for CI/CD and deployment workflows.

### AI Content Delivery
- **Auto-Serve Markdown**: Content negotiation via `Accept: text/markdown` header.
- **AI Crawler Detection**: Automatically serve Markdown to known AI bots (GPTBot, ClaudeBot, ChatGPT-User, and more).
- **LLM-Ready Text Files**: Generates `llms.txt`, `llms-full.txt`, and `/.well-known/llms.txt`.
- **Discovery Tag**: Injects `<link rel="alternate" type="text/markdown">` into your HTML head.
- **Industry Standard Response Headers**: Sets `Vary: Accept`, `X-Robots-Tag: noindex, nofollow`, and `Link: rel="canonical"` on all Markdown responses.

### Content Management
- **Hierarchical Settings**: Site-wide, section, and entry-level configuration with inheritance.
- **Per-Entry Control**: Include or exclude individual entries via the LLMify Settings Field.
- **Permission System**: Granular user permissions for dashboard, content settings, site settings, generate, and clear actions.
- **Preview Targets**: Preview Markdown output directly from the entry editor.
- **Dashboard**: Site setup scores and section-level content statistics at a glance.

### Integrations
- **SEOmatic Integration**: Automatically populate front matter from SEOmatic fields.
- **Craft Commerce Support**: Full support for Commerce Products alongside Entries.

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
