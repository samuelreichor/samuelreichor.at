---
title: 'Better Cache'
description: 'Easy scalable static caching for Craft CMS.'
type: 'craft'
icon: 'craft-better-cache'
---

Better Cache stores the rendered HTML of your Craft pages and serves it straight from the web server. When content changes, only the affected pages are refreshed in the background.

## Features

- **Static HTML Caching**: Pages are served by nginx or Apache without booting Craft
- **Fast Refreshes**: Reuses Craft's cache tags instead of tracking every query, so refresh work finishes about twice as fast as with Blitz
- **Refresh Strategies**: Clear, expire or refresh pages when content changes
- **Dynamic Content**: CSRF tokens and dynamic includes are filled in per visitor
- **Query Strings**: Cache query params as separate pages or ignore them per site
- **CDN Ready**: `Cache-Control` and cache tag headers plus a purger interface
- **Scheduled Entries**: Pages refresh when entries reach their post or expiry date
- **Switch from Blitz**: Translate your Blitz config with a single command

## Why Better Cache?

Craft already knows which content a template depends on. Better Cache reuses Craft's own cache tags instead of tracking every element query a second time. That keeps the tracking data small and makes refreshes fast, even on sites with many cached pages.

Read the full story, how it works under the hood and how it compares to Blitz in [Why Better Cache](/blogs/why-better-cache).

## Better Cache vs. Blitz

Measured on a Craft 5 site with 14 sites and 10,000 cached pages, against Blitz 5.14.1 in "clear and generate" mode. Both plugins render 3 pages in parallel.

| Scenario | Better Cache | Blitz | |
|---|---|---|---|
| Edit article | 510.8 s | 1,045.6 s | 2.0× faster |
| Warm cache | 2,362.9 s | 4,147.8 s | 1.8× faster |

Better Cache stored 1.4 million tracking rows, Blitz 3.2 million. Every page Blitz re-rendered after the edit, Better Cache re-rendered too. The [blog post](/blogs/why-better-cache#benchmark) has all the numbers.

## Getting Started

::card-group
  ::card{title="Installation" to="/libraries/craft-better-cache/get-started/installation"}
  Install via Composer and cache your first pages.
  ::
  ::card{title="Configuration" to="/libraries/craft-better-cache/get-started/configuration"}
  All available settings in `config/better-cache.php`.
  ::
  ::card{title="Server Configuration" to="/libraries/craft-better-cache/usage/server-configuration"}
  Let nginx or Apache serve cached pages directly.
  ::
::
