---
title: Better Cache
description: 'Why I built Better Cache, a static cache for Craft CMS that reuses Craft’s own cache tags instead of tracking every element query, and how it compares to Blitz.'
datePublished: 2026-10-18
readingTime: 6min
---

In the recent article ([Optimizing a Craft CMS Project with 127 Sites](/blogs/craft-optimize-a-large-site)) I already spoilered about a new plugin. It is called Better Cache and it's a [Blitz](https://plugins.craftcms.com/blitz) alternative. In this article I will explain the fundamentals of Blitz and Better Cache and how they compare. Maybe Better Cache will work for you too!

Before I start digging into, I want to say that Blitz is an incredible piece of software and it served us many years. I don't want to blame someone and I truly think that Better Cache is just another option and not the only true option for everyone.

## Introducing Better Cache

Better Cache adds smart static file caching to your Craft CMS Project. Smart means, that it tracks down changes. If you edit news article A it also refreshes the news overview. It comes with helper for dynamic content and scales well.

But why create another one? The reason is simple - Scalability.

It started from a simple idea: Craft already knows which content a template depends on. What if the cache just used that, instead of tracking everything a second time?

Let's walk through how both plugins work under the hood, and why that matters once your site grows.

## Scale from the ground up

Storing a rendered page as an HTML file is the easy part. Every static cache does that, and the web server serves the file without ever booting Craft. The hard part is the moment an editor hits save. Then the cache has to answer two questions:

1. **Which cached pages show this entry?** The article itself, but also the news overview, the homepage teaser, the tag page and the sidebar on 300 other articles.
2. **How fast are they fresh again?** Every one of these pages has to be rendered again, and on a large site that can be thousands of pages for a single save.

Both plugins answer the first question in a similar way. While a page renders, they write down what the page depends on. The difference is what they write down, and how much that costs on every render.

## How They Track Changes

![Flowchart: what Better Cache and Blitz do when a page is rendered and stored](/images/bitmap/better-cache-render-and-store-light.png){class="dark:hidden"}
![Flowchart: what Better Cache and Blitz do when a page is rendered and stored](/images/bitmap/better-cache-render-and-store-dark.png){class="hidden dark:block"}

### Blitz

Blitz builds its own dependency tracking. While a page renders, it listens to every element query and every loaded element:

- **Every element** that gets loaded is stored, together with the fields the template reads from it.
- **Every element query** is serialized with all its parameters and stored in its own tables, the first time it runs together with a backtrace of the template that ran it. Eager loading even triggers an extra query, just for tracking.
- When the page is stored, Blitz writes the page, its elements and its queries into its tables and writes the HTML file, inside a **global lock**. Only one page can be stored at a time, no matter how many workers render in parallel.

When an editor saves an entry, Blitz looks up the pages that contain the entry directly. Then it loads the stored queries that could include the entry and **runs each of them again** against the database, to check whether the entry is in the result now.

This is very precise. Blitz knows exactly which list an entry appears in. But every page render pays for the tracking, and so does every re-render after a save.

### Better Cache

Craft already tracks dependencies. It's how the [`{% cache %}`](https://craftcms.com/docs/5.x/reference/twig/tags.html#cache) tag knows when to clear itself. While a template renders, every element query adds a few short **cache tags** to a list in memory, like `element::42` for an entry or `section:5` for a query on the news section. When an entry is saved, Craft announces the same kind of tags.

Better Cache simply reuses this:

- While the page renders, Craft collects the tags anyway. Better Cache adds no extra queries.
- When the page is stored, the tags go into one table with an index on the tag, in a single transaction. The lock is per page, so parallel renders don't wait for each other.
- When an entry is saved, Better Cache collects the tags Craft announces and looks up the affected pages with one indexed query. Then it re-renders them in the queue.

This is what happens when an editor saves an entry:

![Flowchart: what Better Cache and Blitz do when an entry is saved](/images/bitmap/better-cache-entry-saved-light.png){class="dark:hidden"}
![Flowchart: what Better Cache and Blitz do when an entry is saved](/images/bitmap/better-cache-entry-saved-dark.png){class="hidden dark:block"}

The trade-off: tags are less precise than replayed queries. A query on the news section is tagged with the section, no matter how it is filtered. So a new article also refreshes a teaser that only shows another category, where Blitz would replay the query and see that the article isn't in it.

To keep this in check, Better Cache optimizes some of Craft's tags, so they aren't quite as coarse. A related entries field is tagged with the IDs of the related entries, and a structure query like `entry.children` with its section, instead of a wildcard that matches every entry save. Tags of a query on one site only match saves on that site.

## Why it matters

On a small site with one editor you won't notice any of this. A refresh that takes a few minutes doesn't matter if the next save comes tomorrow.

With many editors it does. If saves come in faster than the queue can finish their refresh jobs, the jobs pile up. Editors wait longer until their change is live, the queue keeps the database busy while they keep working, and every save adds more to the pile. In our benchmark with 10,000 cached pages, a single article edit kept the queue busy for **1,046 seconds with Blitz** and **511 seconds with Better Cache**. That is about 17 and 8.5 minutes for one save.

The costs add up in three places:

- **Rendering**: every page that gets cached pays for tracking, and so does every page that gets re-rendered after a save. In the benchmark with 10,000 pages, re-rendering a page after the edit took 399 ms with Blitz and 189 ms with Better Cache. This is where almost all of the difference comes from.
- **Storage**: with 10,000 pages, Blitz stored 325 tracking rows per page and Better Cache 136. That is 3.2 million rows against 1.4 million.
- **Parallelism**: Blitz stores one page at a time, because every render waits for the same lock to store its result.

Finding the affected pages is not the expensive part. Even with 10,000 pages, Blitz needed 1.3 seconds for it and Better Cache 1.0 seconds.

![Flowchart: how Better Cache and Blitz re-render invalidated pages](/images/bitmap/better-cache-re-render-light.png){class="dark:hidden"}
![Flowchart: how Better Cache and Blitz re-render invalidated pages](/images/bitmap/better-cache-re-render-dark.png){class="hidden dark:block"}

## Benchmark

I ran both plugins against a local copy of the diocese project in DDEV, with Craft 5.10.13 and Blitz 5.14.1. Each run starts with an empty cache, warms a set of pages and then edits one article. The page sets have 10, 100, 1,000 and 10,000 pages, sampled from 14 of the 127 sites. Every set contains the smaller ones, so the 1,000 pages include the 100 pages from the run before.

Both plugins render 3 pages in parallel. Blitz runs in "clear and generate" mode, Better Cache in the matching "refresh" mode.

### Warming the cache

How long it takes to render and store every page, starting with an empty cache.

| Pages | Better Cache | Blitz | Difference |
|---|---|---|---|
| 10 | 3.9 s | 10.2 s | 2.6× |
| 100 | 23.6 s | 43.2 s | 1.8× |
| 1,000 | 225.9 s | 402.8 s | 1.8× |
| 10,000 | 2,362.9 s | 4,147.8 s | 1.8× |

With 10,000 pages, that is 39 minutes against 69 minutes.

Part of a render is Craft itself, and no cache plugin can make that faster. To see how much each plugin adds, I rendered the same 300 pages without a static cache and with each plugin:

| Setup | Time per page |
|---|---|
| Craft without a static cache | 227 ms |
| Better Cache | 239 ms |
| Blitz | 425 ms |

Better Cache adds about 5% to a render, Blitz about 87%.

### Saving an article

How long it takes after one article edit until the queue is done and every affected page is rendered again. This is the number that decides whether the queue keeps up with your editors. The save itself took about the same time with both plugins, between 0.7 and 0.9 seconds.

| Pages | Better Cache | Blitz | Difference |
|---|---|---|---|
| 10 | 6.3 s | 7.6 s | 1.2× |
| 100 | 11.2 s | 18.4 s | 1.6× |
| 1,000 | 50.4 s | 105.8 s | 2.1× |
| 10,000 | 475.2 s | 1,045.6 s | 2.2× |

To find the affected pages, Better Cache always runs one query. Blitz replays the stored queries that could contain the article:

| Pages | Queries replayed by Blitz |
|---|---|
| 10 | 1 |
| 100 | 5 |
| 1,000 | 61 |
| 10,000 | 685 |

### Precision

Better Cache's tags are coarser, so a save can re-render more pages than necessary. These are the pages each plugin rendered again after the article edit:

| Pages | Better Cache | Blitz | Only Better Cache |
|---|---|---|---|
| 10 | 4 | 4 | 0 |
| 100 | 37 | 37 | 0 |
| 1,000 | 269 | 269 | 0 |
| 10,000 | 2,569 | 2,560 | 9 |

Every page Blitz rendered again, Better Cache did too. With 10,000 pages, Better Cache rendered 9 pages more and still finished in half the time.

### Tracking data

Both plugins store what each page depends on. This is the data a save has to search through.

| Pages | Better Cache | Blitz |
|---|---|---|
| 10 | 1,761 rows | 4,954 rows |
| 100 | 14,068 rows | 30,922 rows |
| 1,000 | 135,092 rows | 314,906 rows |
| 10,000 | 1,354,180 rows | 3,247,060 rows |

The biggest Blitz table is `blitz_elementcaches`, with 1,656,286 rows, one per page and element. Better Cache stores one row per page and tag.
