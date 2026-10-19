---
title: Better Cache
description: 'Why I built Better Cache, a static cache for Craft CMS that reuses Craft’s own cache tags instead of tracking every element query, and why that makes it twice as fast on large sites.'
datePublished: 2026-10-18
readingTime: 5min
---

In the recent article ([Optimizing a Craft CMS Project with 127 Sites](/blogs/craft-optimize-a-large-site)) I already spoilered about a new plugin. It is called Better Cache, and in this article I will explain how it works, why I built it and what it changes on a large site. Maybe it will work for you too!

## Introducing Better Cache

Better Cache adds smart static file caching to your Craft CMS project. Smart means that it tracks down changes. If you edit news article A, it also refreshes the news overview. It comes with helpers for dynamic content and scales well.

But why build another static cache? The reason is simple: scalability.

It started from a simple idea: Craft already knows which content a template depends on. What if the cache just used that, instead of tracking everything a second time?

## Scale from the ground up

Storing a rendered page as an HTML file is the easy part. Every static cache does that, and the web server serves the file without ever booting Craft. The hard part is the moment an editor hits save. Then the cache has to answer two questions:

1. **Which cached pages show this entry?** The article itself, but also the news overview, the homepage teaser, the tag page and the sidebar on 300 other articles.
2. **How fast are they fresh again?** Every one of these pages has to be rendered again, and on a large site that can be thousands of pages for a single save.

To answer the first question, a static cache writes down what a page depends on while it renders. What it writes down, and how much that costs on every render, decides how well it scales.

## Two ways to track changes

The common approach is to build a separate dependency tracking: listen to every element query while a page renders, serialize it with all its parameters, store it in its own tables and, when an entry is saved, **run the stored queries again** to see whether the entry is in the result now. This is very precise, but every render pays for the tracking, and so does every re-render after a save.

Better Cache goes another way.

### Craft's cache tags

Craft already tracks dependencies. It's how the [`{% cache %}`](https://craftcms.com/docs/5.x/reference/twig/tags.html#cache) tag knows when to clear itself. While a template renders, every element query adds a few short **cache tags** to a list in memory, like `element::42` for an entry or `section:5` for a query on the news section. When an entry is saved, Craft announces the same kind of tags.

Better Cache simply reuses this:

- While the page renders, Craft collects the tags anyway. Better Cache adds no extra queries.
- When the page is stored, the tags go into one table with an index on the tag, in a single transaction. The lock is per page, so parallel renders don't wait for each other.
- When an entry is saved, Better Cache collects the tags Craft announces and looks up the affected pages with **one indexed query**. Then it re-renders them in the queue.

![Flowchart: what Better Cache does when an entry is saved](/images/bitmap/better-cache-entry-saved-light.png){class="dark:hidden"}
![Flowchart: what Better Cache does when an entry is saved](/images/bitmap/better-cache-entry-saved-dark.png){class="hidden dark:block"}

### The trade-off

Tags are less precise than replayed queries. A query on the news section is tagged with the section, no matter how it is filtered. So a new article also refreshes a teaser that only shows another category.

To keep this in check, Better Cache optimizes some of Craft's tags, so they aren't quite as coarse. A related entries field is tagged with the IDs of the related entries, and a structure query like `entry.children` with its section, instead of a wildcard that matches every entry save. Tags of a query on one site only match saves on that site.

In practice, the difference is tiny, as the benchmark below shows.

## Why it matters

On a small site with one editor you won't notice any of this. A refresh that takes a few minutes doesn't matter if the next save comes tomorrow.

With many editors it does. If saves come in faster than the queue can finish their refresh jobs, the jobs pile up. Editors wait longer until their change is live, the queue keeps the database busy while they keep working, and every save adds more to the pile.

The costs add up in three places:

- **Rendering**: every page that gets cached pays for tracking, and so does every page that gets re-rendered after a save. This is where almost all of the time goes.
- **Storage**: the more tracking rows per page, the more data every save has to search through.
- **Parallelism**: if every render waits for the same lock to store its result, adding workers doesn't help.

Better Cache keeps all three small. Finding the affected pages is not the expensive part, re-rendering them is. And that is exactly where Better Cache saves the most time.

## Benchmark

I ran Better Cache against a local copy of the diocese project in DDEV, with Craft 5.10.13, and compared it with the plugin we used before, [Blitz](https://plugins.craftcms.com/blitz) 5.14.1. Blitz is an incredible piece of software and served us well for many years. These numbers just show what changes when tracking is built on Craft's own tags.

Each run starts with an empty cache, warms a set of pages and then edits one article. The page sets have 10, 100, 1,000 and 10,000 pages, sampled from 14 of the 127 sites. Both plugins render 3 pages in parallel, in their matching "refresh" modes.

The table shows the times with Better Cache and how much faster that is than our previous setup:

| Pages | Warm the cache | Refresh after one save |
|---|---|---|
| 10 | 3.9 s · **2.6× faster** | 6.3 s · **1.2× faster** |
| 100 | 23.6 s · **1.8× faster** | 11.2 s · **1.6× faster** |
| 1,000 | 225.9 s · **1.8× faster** | 50.4 s · **2.1× faster** |
| 10,000 | 2,362.9 s · **1.8× faster** | 475.2 s · **2.2× faster** |

With 10,000 pages, one article edit keeps the queue busy for **8 minutes instead of 17**, and warming the cache takes **39 minutes instead of 69**.

### Where the time goes

Part of a render is Craft itself, and no cache plugin can make that faster. To see how much the cache adds on top, I rendered the same 300 pages with and without a static cache:

| Setup | Time per page |
|---|---|
| Craft without a static cache | 227 ms |
| Better Cache | 239 ms |

Better Cache adds about **5%** to a render. The tracking practically comes for free, because Craft does it anyway.

### Precision and storage

Coarser tags could mean many unnecessary re-renders. They don't. With 10,000 pages, Better Cache re-rendered 2,569 pages after the edit, only 9 more than query-based tracking, and still finished in half the time. With 1,000 pages or fewer, both re-rendered exactly the same pages.

The tracking data stays small, too: 136 rows per page, or 1.4 million rows for 10,000 pages, less than half of what query-based tracking stored.

## Conclusion

Better Cache doesn't try to know more than Craft. It uses what Craft already knows, and that makes it about **twice as fast** to warm and to refresh once your site grows. If your queue can't keep up with your editors, give it a try.
