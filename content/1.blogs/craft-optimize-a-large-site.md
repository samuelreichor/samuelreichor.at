---
title: Optimizing a Craft CMS Project with 127 Sites
description: This post documents the process of optimizing a Craft CMS project with 127 sites, a 51 GB database and over 48k frontend pages.
datePublished: 2026-10-16
readingTime: 15min
---

This week I got a very interesting job at [Fredmansky](https://fredmansky.at): optimizing their largest site. It's the website of the [Diocese of Passau](https://www.bistum-passau.de), the Catholic diocese in Bavaria, with all of its parishes, churches, church services and events: a Craft CMS project with 127 [sites](https://craftcms.com/docs/5.x/system/sites.html), a 51 GB database and over 48k frontend pages.

::alert{variant="warning"}
Craft 5 has a [soft limit of 100 sites](https://craftcms.com/knowledge-base/how-much-content-can-a-craft-site-have#mind-your-site-count) per installation, and Pixel & Tonic recommends not getting anywhere close to it. With 127 sites, this project is well beyond it.
::

It grew over the years to an unmanageable size, and the frontend performance was only okay-ish thanks to [Blitz](https://putyourlightson.com/plugins/blitz) static caching. And Blitz only covers the main site, so the other 126 sites rendered every single request from scratch. In the control panel, every save took ages and the control panel search wasn't usable anymore.

## The Plan

The main goal was to make entry saves and the frontend noticeably faster. The improvements shouldn't come from removing functionality or adding shiny new hardware to the server. 

My rough plan was to first look at the query performance. Every site you add to an installation is generally a multiplier for the number of queries that need to be executed as stated [here](https://craftcms.com/knowledge-base/how-much-content-can-a-craft-site-have#mind-your-site-count). To know if changes work, I needed a good benchmark.

## Benchmarking

The benchmark is a script that runs after every improvement and collects the same data every time. If I saw a reasonable improvement, I kept the change and continued.

To define this, I needed to know where the pain points are. For me, these are:

- **14 slowest pages**: found by crawling one URL per section and site (~780 URLs) and re-measuring the top candidates under benchmark conditions
- **6 most important pages**: the homepage plus the pages the editors reported as slow
- **7 × Edit → Save → Rollback**: entries that represent the typical (and the worst) editor workflows

The save benchmark replays what the control panel does when an editor changes something: an autosave into a [provisional draft](https://craftcms.com/docs/5.x/reference/element-types/entries.html#drafts), applying that draft on save, and the Blitz refresh job that would run in the queue afterwards. Everything happens inside a single database transaction that gets rolled back at the end, so the database stays untouched and I can run it as often as I like.

Every URL is requested multiple times, so I can calculate the [median](https://en.wikipedia.org/wiki/Median). I used 5 runs, as the median then ignores up to two requests that are exceptionally slow or fast. And that happens more often than you'd think. (With 3 runs, only one outlier would be ignored.)

I also wanted the numbers to reflect the absolute worst case. Before every request, the data cache, the compiled Twig templates and the Blitz cache are wiped. Besides the time to first byte, the script counts the database queries of every request. The query count is way more stable than timings, which makes it perfect for spotting query optimizations.

I ran all the tests in [DDEV](https://ddev.com/) on an Apple M4 Pro MacBook with 24 GB RAM. The production server doesn't have such a high single-core performance, therefore the benchmark throttles the web and database containers to 0.75 CPUs using [`docker update --cpus`](https://docs.docker.com/reference/cli/docker/container/update/).

Now that the benchmark is set up, let's get started. 

## Analyze DB Tables

The size of a database doesn't really say much about query performance, at least up to a certain degree. A query on `entries` doesn't get slower just because there is a huge table next to it. What matters is how many rows the tables have that are actually touched during a request, and whether the frequently used data still fits into the database's memory (the [InnoDB buffer pool](https://mariadb.com/kb/en/innodb-buffer-pool/)). Everything that doesn't fit has to be read from disk.

So instead of looking at the total size, here is the table breakdown:

| Table | Rows | Size |
|---|---|---|
| Blitz tables (all) | ~270 million | 34.1 GB |
| `searchindex` | ~96 million | 8.6 GB |
| `elements_sites` | ~19 million | 6.6 GB |
| Everything else | | 2.3 GB |

Two thirds of the database belong to Blitz. For every cached page, Blitz stores which elements, which fields and which element queries were used to render it. That's how it knows which pages to refresh when an editor saves an entry.

### Blitz Tables

The main site has 162,614 cached pages. Turns out, 149,782 of them (92%) are the same page: the church services overview with its filter query strings, like `?startDate=…&endDate=…&church=…`. Every combination of date and church is a separate cached page with thousands of tracking rows. And almost nobody visits the same combination twice, so the cache barely ever gets hit. I also found cached pages for dates from 2024.

This amount of tracking data costs more than you think:

- **Memory:** Whenever Blitz reads or writes its tables, those rows get loaded into the buffer pool and push out the data everything else needs, like entries, fields and relations. The next unrelated query has to go to disk.
- **Saving in the control panel:** On every save, Blitz has to find out which cached pages are affected. It searches through 197 million rows in `blitz_elementcaches`, 72 million in `blitz_elementfieldcaches` and 520,000 stored element queries.
- **Queue:** Clearing and regenerating those pages means millions of deletes and inserts on tables with huge indexes (12 GB of index for `blitz_elementfieldcaches` alone). All of this runs while editors are working in the control panel.

And it keeps growing, because crawlers and visitors keep discovering new filter combinations every day. So we need to optimize this.

### Entries and Revisions

The `entries` table has 708,193 rows, but only 48,590 of them are "real" entries in a section. Since Craft 5, [Matrix blocks are entries](https://craftcms.com/docs/5.x/reference/field-types/matrix.html) too (445,514 of them), plus 209,227 revisions, drafts and trashed entries. Every one of them can have a row per site in `elements_sites`, which is how we end up with 19 million rows there.

My first thought was to limit the revisions, but `maxRevisions` was already set to 5, and on average an element has only 2.1 revisions. Not much we can do here.

### Search Index

Everything you want to find via the built-in search or filter system needs to be indexed in the `searchindex` table. A closer look shows that 96% of rows are from assets. Craft creates one row per field and attribute (filename, extension, kind, slug, title, …) per site. In our case, that's 6 rows (5 attributes + 1 translatable field) × 127 sites × ~140k assets, which is where most of the 96 million rows come from.

You might ask: assets exist in all sites anyway, so why store 126 extra copies? I asked the same question in this [issue](https://github.com/craftcms/cms/issues/19761). 

A low-hanging fruit here is to delete all unused images. But for now let's focus on other improvements. 

## MySQL vs. MariaDB

Maybe this seems weird as a first step, but I actually switched from MySQL to MariaDB. In production we use MariaDB and I didn't want to base all my assumptions on a different database. 
So I used this opportunity to first test MySQL and then switch to MariaDB to have a good comparison.

Craft recommends [MySQL over MariaDB](https://craftcms.com/docs/5.x/requirements.html) since Craft 5, so I wanted to know if this makes any difference. 
So I ran the exact same benchmark twice: once on MySQL 8.0 and once on MariaDB 10.11.

MariaDB was actually a bit faster on most pages, usually 3 to 9%. A slow events category page went from 8.1 down to 6.9 seconds. 
One parish homepage was the exception: 21% slower on MariaDB, and consistently so on all 5 runs. Probably a single query that MariaDB plans worse.

Autosave and save were more or less the same. But the Blitz refresh was clearly slower on MariaDB:

| Blitz refresh | MySQL 8.0 | MariaDB 10.11 | Difference |
|---|---|---|---|
| Footer contact | 79.5 s | 144.3 s | +81% |
| Church | 50.0 s | 63.0 s | +26% |
| Parish homepage | 38.4 s | 43.6 s | +14% |

So is switching to MySQL worth it? For the frontend: no, the difference is small and even goes in MariaDB's favor. For the Blitz refresh, MySQL handles the huge tracking tables noticeably better. Switching the database would only treat the symptom. But the real problem is the amount of tracking data.

## Blitz Cache Tables

Just excluding the church services overview with query strings would have been too much. Some of these URLs are worth caching, like the church services of a single church, which are linked from every church page. So I turned it around: **exclude every URL with a query string, except the ones I explicitly allow.**

Blitz does have [included/excluded query string parameters](https://putyourlightson.com/plugins/blitz#included-excluded-query-string-parameters), but they don't decide *whether* a page gets cached. They only control which parameters are kept in the cached URL, and all others are disregarded. If I only included `church`, `?startDate=…&church=12` would be cached as `?church=12`, and visitors would get a page that doesn't match their date filter.

Excluded URI patterns, on the other hand, are matched against the URI including the query string. So the allowlist lives inside the exclude pattern as a [negative lookahead](https://www.regular-expressions.info/lookaround.html):

```php
'uriPattern' => '^(?!(shop\?|gottesdienste\?(church|pa)=\d+$|aktuelles-termine/termine\?category=\d+$))[^?]*\?',
```

In plain words: if the URI contains a `?` and doesn't match one of the allowed patterns, don't cache it. That leaves around 1,200 URLs with query strings instead of 162,000. As a bonus, most bot requests like `?page=gravitysmtp-settings` or `?pa=) AND (1875987509=1875987509` aren't cached anymore. Blitz happily cached them before.

### The Savings

Time for the first real benchmark run against the MariaDB baseline. The Blitz refresh after a save, which took minutes before, is basically gone:

| Blitz refresh | Before | After |
|---|---|---|
| Footer contact | 144.3 s | 0.42 s |
| Church | 63.0 s | 0.01 s |
| Parish homepage | 43.6 s | 0.02 s |
| Other entries (news, events, pages) | ~0.04 s | ~0.006 s |

That's a reduction of 99.7 to 100%. The parish homepage is the most interesting row: it still refreshes exactly the same 89 pages, yet it is more than 2,000 times faster. The 43 seconds were never spent clearing pages. They were spent searching the gigantic tracking tables for the pages that are affected.

Put together, the whole save of the footer contact (autosave, save and refresh) went from **2.5 minutes to about 3 seconds**, and saving a church went from about **64 seconds to under one second**. Sure, on production the refresh runs in the queue and the editor doesn't wait for it directly. But during these minutes the queue hammers the database, and that's exactly the time editors keep working in the control panel.

## SEOmatic

While testing, I noticed something odd: with [SEOmatic](https://nystudio107.com/plugins/seomatic) disabled, the pages loaded about 30% faster. SEOmatic renders a few meta tags and some JSON-LD. That shouldn't cost a third of the request.

So I profiled. DDEV ships with [xhprof](https://docs.ddev.com/en/stable/users/debugging-profiling/xhprof-profiling/), and in `prepend` mode you can hook in your own prepend file that writes the raw profile of every request to disk. Klaus then wrote a small script that sums up where the time goes, and we ran it against the 20 benchmark pages, again with a cold cache.

The profiler inflates absolute timings a lot, so only the shares are meaningful:

| Part of the request | Share of request time |
|---|---|
| SEOmatic in total | 7–32% (mostly 12–20%) |
| `UrlHelper::urlIsSiteIndex()` | 2.5–18% |
| `HTMLPurifier::purify()` | 2.5–22% |

Two functions were responsible for most of SEOmatic's time, and one number stood out: **330 to 1,627 calls to HTML Purifier per page.**

For every absolute URL, SEOmatic loops over all 127 sites and runs each site URL through a newly created HTML Purifier. I fixed it with a small composer patch and verified it on all 20 benchmark pages. All the details and the patch are in the issue: [nystudio107/craft-seomatic#1770](https://github.com/nystudio107/craft-seomatic/issues/1770).

With the patch, the 20 benchmark pages got **15% faster** in total. The parish homepages, which build the most site URLs, benefited the most:

| Pages | Before | After | Difference |
|---|---|---|---|
| Parish homepages (6) | 4.11 s | 3.30 s | -20% |
| Events category page (1) | 8.24 s | 6.55 s | -21% |
| Other homepages (4) | 4.06 s | 3.51 s | -13% |
| News and content pages (4) | 3.81 s | 3.30 s | -13% |
| Event detail pages (5) | 4.18 s | 3.80 s | -9% |
| **All 20 pages** | **4.26 s** | **3.63 s** | **-15%** |


## Freeform

The same profiles showed that [Freeform](https://docs.solspace.com/craft/freeform/) loads all 248 forms on some requests, which takes 20–33% of the request time on event pages. The expensive part comes from a single line in the event template, which counts the registrations to check the maximum number of attendees:

```twig
{% set registrationCount = entry.eventRegistration.ids() | length %}
```

This runs on every event page, and every Freeform submission query loads all forms in `beforePrepare()`, just to build a map of form handles and IDs that isn't needed for counting.
So I wrote a small Twig function that counts the related submissions directly in the `relations` table, with the same conditions as Freeform's query:

```twig
{% set registrationCount = freeformRegistrationCount(entry) %}
```

In the benchmark, the five event pages got **22% faster** and each of them runs 159 fewer database queries. All other pages stay the same:

| Event page | Before | After | Difference |
|---|---|---|---|
| Kunstausstellung "Stille" | 3.64 s | 2.83 s | -22% |
| Festzeit All Hallows Eve | 3.78 s | 3.10 s | -18% |
| Kinderbibeltag Arche Noah | 3.85 s | 3.06 s | -20% |
| Musik und Besinnung | 3.73 s | 2.87 s | -23% |
| Weltmissionssonntag | 3.98 s | 2.95 s | -26% |

But that wasn't the only place where Freeform loads all forms. With a cold cache, it also happens on **every** page, even on pages without a form. Freeform's [URL Parameter Tracking](https://docs.solspace.com/craft/freeform/v5/integrations/url-parameter-tracking/) hooks into every site request and loads all 248 forms to find out which of them track URL parameters. We don't use this integration at all, so the result is always an empty list. The result is cached for 12 hours, but after a deploy or a cache clear, the first request pays about **650 ms** for it.

I fixed it with another small composer patch that skips the forms scan when no URL Parameter Tracking integration exists. Details are in the issue: [solspace/craft-freeform#2670](https://github.com/solspace/craft-freeform/issues/2670).

In the benchmark, every single page runs **251 fewer database queries** and the 20 pages got **28% faster** on average. 

| Pages | Before | After | Difference |
|---|---|---|---|
| Homepage | 3.59 s | 2.70 s | -25% |
| Parish homepages (6) | 3.41 s | 2.44 s | -28% |
| Events category page (1) | 7.00 s | 6.04 s | -14% |
| Event detail pages (5) | 2.97 s | 2.00 s | -33% |
| **All 20 pages** | **3.49 s** | **2.52 s** | **-28%** |

After that, the cold profile still showed Freeform near the top, this time with an HTTP request. Freeform shows a news feed in the control panel dashboard, and it fetches this feed from `api.solspace.com` in the constructor of a bundle that is loaded on **every** request. There is no check whether it's a control panel request. So every 5 hours and after every cache clear, a visitor on the frontend waits for Solspace's API, about 0.6 s from my machine. And because there is no timeout, a slow API would make our frontend slow too.

Freeform has a setting for it, but I still reported it, because the feed shouldn't be fetched on frontend requests at all: [solspace/craft-freeform#2673](https://github.com/solspace/craft-freeform/issues/2673). Setting `displayFeed` to `false` in the Freeform settings removes the news widget from the dashboard, and the request is gone:

| Pages | Before | After | Difference |
|---|---|---|---|
| Homepage | 2.70 s | 2.31 s | -14% |
| Parish homepages (6) | 2.44 s | 1.82 s | -25% |
| Events category page (1) | 6.04 s | 5.00 s | -17% |
| Event detail pages (5) | 2.00 s | 1.52 s | -24% |
| **All 20 pages** | **2.52 s** | **1.98 s** | **-21%** |

## General Issues

The profiler also found a bunch of smaller issues in the templates. None of them is spectacular on its own, but they add up, and they are exactly the kind of thing that sneaks into every project that grows over the years. If you only take one section of this post into your own project, take this one.

### Dead Queries

A dead query is a query whose result is never used. It usually stays behind after a refactoring: the markup that used the variable is gone, the query is still there.

Our worst one was in the sidebar of the church services pages. It loaded all churches and **all church services of all 127 sites**, eager loaded their churches, and then did nothing with it:

```twig
{% set churchServices = craft.entries()
  .section('churchServices')
  .relatedTo(churches)
  .siteId('*')
  .with(['church'])
  .all() %}

{# churchServices is never used again #}
```

What to look out for:

- Every `{% set %}` that runs a query (`.all()`, `.one()`, `.ids()`, `.count()`): is the variable actually used afterwards?
- Twig doesn't warn you about unused variables, so searching the template for the variable name is the fastest check.
- Parameters passed into a component that the component doesn't read anymore. We also had a page that called an expensive Twig function just to pass the result to the sidebar, which ignored it.

### Missing Eager Loading

The classic [N+1 problem](https://craftcms.com/docs/5.x/development/eager-loading.html): you load 30 church services with one query, and then every list item loads its church and its detail entry with its own query. That's 61 queries instead of 3.

```twig
{% for service in services %}
  {{ service.church.one().title }} {# one query per service #}
{% endfor %}
```

There are two ways to fix this. Tell the query upfront what you need with `.with()`:

```twig
{% set services = craft.entries()
  .section('churchServices')
  .with(['church', 'churchServicesDetail.entryImage'])
  .all() %}
```

Or, if the list gets its elements from different places (in our case filter results, church pages and a related entries field), eager load them inside the component itself. Then every page using the component profits:

```twig
{% do craft.app.elements.eagerLoadElements(
  'craft\\elements\\Entry',
  services,
  ['church', 'churchServicesDetail.entryImage']
) %}
```

Since Craft 5 there is also [lazy eager loading](https://craftcms.com/docs/5.x/development/eager-loading.html#lazy-eager-loading) with `.eagerly()`, which is great when you can't change the original query.

What to look out for:

- Relation fields (entries, assets, categories) accessed inside a `{% for %}` loop.
- Nested relations: `service.churchServicesDetail.one().entryImage.one()` inside a loop is two queries per item.
- The query count of a page. If it grows with the number of list items, something isn't eager loaded.

Andrew Welch wrote a great introduction to this topic: [Speed up your Craft CMS Templates with Eager Loading](https://nystudio107.com/blog/speed-up-your-craft-cms-templates-with-eager-loading).

### Global Parts Without a Cache Tag

The header of the main site was wrapped in a [`{% cache %}`](https://craftcms.com/docs/5.x/reference/twig/tags.html#cache) tag, the footer wasn't. So every request rendered the whole footer navigation from scratch, including its queries, even though it looks the same on every page of a site.

```twig
{% cache globally using key 'footer-' ~ currentSite.id %}
  {% set navigation = craft.navigation.nodes('navigationMain').all() %}
  {% include '_organisms/appFooter/_template.twig' %}
{% endcache %}
```

What to look out for:

- Header, footer, navigation and other parts that are identical on every page are perfect candidates. Use `globally`, otherwise Craft caches them per URL.
- Craft clears the cache automatically when an element that was **queried inside** the cache tag changes. If you pass in elements that were queried outside, Craft doesn't know about them, and the cache won't be cleared when they change.
- Don't cache parts that depend on the request, like active navigation states or query parameters.

nystudio107 has a deep dive on how the cache tag works and when it helps: [The Craft {% cache %} Tag In-Depth](https://nystudio107.com/blog/the-craft-cache-tag-in-depth).

### Queries That Run "Just in Case"

Our content builder queried a fallback image at the top of the template. The template is included once per content block, so a page with 15 blocks ran the same query 15 times. And the fallback was only used by two block types, and only when the entry had no image of its own.

```twig
{# before: runs for every block #}
{% set fallbackImage = craft.assets.volume('graphics').fileName('fallback-bistum.png').one() %}

{# after: runs only when it's needed #}
{% set image = page.entryImage[0] ??? page.churchImage[0] ??? null %}
{% if not image %}
  {% set image = craft.assets.volume('graphics').fileName('fallback-bistum.png').one() %}
{% endif %}
```

What to look out for:

- Queries at the top of templates that are included many times (matrix blocks, list items, components).
- Queries that are only needed in one branch of an `{% if %}` or `{% switch %}`. Move them into that branch.

## Final Results

After 4 GitHub issues, loads of small optimizations and a database that's 30 GB smaller, these are the results on the live system: 

| Pages | Before | After | Difference |
|---|---|---|---|
| Homepage | 1.31 s | 0.52 s | -60% |
| Event detail pages (2) | 5.18 s | 0.59 s | -89% |
| Church pages (2) | 0.87 s | 0.63 s | -28% |
| Church services page (1) | 0.83 s | 0.58 s | -30% |
| News and event listings (6) | 2.30 s | 1.91 s | -17% |
| Articles (2) | 1.14 s | 0.94 s | -18% |
| Content pages (4) | 0.91 s | 0.67 s | -27% |
| Shop pages (3) | 0.64 s | 0.56 s | -13% |
| **All 21 pages** | **1.71 s** | **1.01 s** | **-41%** |

Each value is the median of 5 requests after one warmup request, measured on the live site without the Blitz cache.

Saving entries (autosave, save and Blitz refresh), measured in the local benchmark:

| Entry | Before | After | Difference |
|---|---|---|---|
| Footer contact | 147.5 s | 3.6 s | -98% |
| Church | 64.0 s | 0.8 s | -99% |
| Parish homepage | 51.8 s | 8.6 s | -83% |
| Other entries (news, events, pages) (4) | 1.10 s | 1.21 s | +10% |
| **All 7 entries** | **267.6 s** | **17.9 s** | **-93%** |

I think it's crazy how much faster it feels now and the client is happy!

## To Be Continued

The search is still not working properly. The biggest lever would be to index assets only for the primary site, so I hope the Pixel & Tonic team addresses this [issue](https://github.com/craftcms/cms/issues/19761). In the meantime, I'll clean up unused assets. My first crappy SQL query shows that about 30% of our assets are unused, so deleting them would shrink the `searchindex` by about 30%.

Blitz caching does not scale well with 48k cacheable pages. The more pages Blitz is tracking, the longer each refresh takes. For sites with fewer than 1,000 pages this doesn't really matter, but here it does.
Right now there are only about 8k cached pages. We want to increase this number, so we need a solution for that.

Spoiler: I made a new plugin.

I hope you enjoyed this post! If you have any questions or want me to take a look at your own monster site, feel free to [reach out](mailto:samuelreichor@gmail.com).
