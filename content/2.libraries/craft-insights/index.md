---
title: Insights
description: 'GDPR-compliant, privacy-first analytics for Craft CMS.'
type: 'craft'
icon: 'craft-insights'
badge: 'New'
---

![Insights Dashboard Overview](/images/bitmap/craft-insights-dashboard.png)

Insights is a analytics plugin for Craft CMS. All data stays on your server, no third-party services, no cookie banners, fully GDPR-compliant out of the box.

## Why Insights?

| | Insights | Google Analytics |
|---|:---:|:---:|
| GDPR-compliant without consent | ✅ | ❌ |
| No cookie banners needed | ✅ | ❌ |
| Data stays on your server | ✅ | ❌ |
| No data shared with third parties | ✅ | ❌ |
| Native Craft CMS integration | ✅ | ❌ |
| Lightweight (~3KB, async) | ✅ | ❌ |

## How It Works

1. Add the tracking script to your templates
2. View your dashboard in the Craft control panel

```twig
{{ craft.insights.trackingScript() }}
```

That's it. Insights automatically tracks pageviews, referrers, and devices. No configuration required.

## Privacy by Design

Insights doesn't collect personal data:

- **No cookies** - Nothing stored on the user's device
- **No fingerprinting** - Uses daily-rotating visitor hashes
- **No IP storage** - IPs are used for GeoIP lookup, then immediately discarded
- **Aggregated data only** - Raw events are never stored

This means no consent banners, no privacy policy updates, and no GDPR headaches.

## Lite vs Pro

**Lite** covers the essentials-pageviews, referrers, devices, and real-time visitors. Perfect for blogs and smaller sites.

**Pro** adds marketing features: campaign tracking (UTM), country stats, user events, scroll depth, session insights, and more. Built for teams that need deeper insights.

| Feature | Lite | Pro |
|---------|:----:|:---:|
| [Pageview Tracking](/libraries/craft-insights/knowledge/how-tracking-works#pageviews) | ✅ | ✅ |
| [Referrer Analysis](/libraries/craft-insights/knowledge/how-tracking-works#referrers) | ✅ | ✅ |
| [Device Breakdown](/libraries/craft-insights/knowledge/how-tracking-works#devices) | ✅ | ✅ |
| [Real-time Visitors](/libraries/craft-insights/knowledge/how-tracking-works#real-time-visitors) | ✅ | ✅ |
| Entry Sidebar | ✅ | ✅ |
| Data Export (CSV) | ✅ | ✅ |
| [Campaign Tracking (UTM)](/libraries/craft-insights/knowledge/how-tracking-works#campaign-tracking) | ❌ | ✅ |
| [Country Tracking](/libraries/craft-insights/knowledge/how-tracking-works#countries) | ❌ | ✅ |
| [User Events](/libraries/craft-insights/knowledge/how-tracking-works#user-events) | ❌ | ✅ |
| [Outbound Link Tracking](/libraries/craft-insights/knowledge/how-tracking-works#outbound-links) | ❌ | ✅ |
| [Site Search Analytics](/libraries/craft-insights/knowledge/how-tracking-works#site-searches) | ❌ | ✅ |
| [Scroll Depth Tracking](/libraries/craft-insights/knowledge/how-tracking-works#scroll-depth) | ❌ | ✅ |
| [Session Insights](/libraries/craft-insights/knowledge/how-tracking-works#session-insights) | ❌ | ✅ |
| [Entry & Exit Pages](/libraries/craft-insights/knowledge/how-tracking-works#entry-pages) | ❌ | ✅ |

## Getting Started

::card-group
  ::card{title="Installation" to="/libraries/craft-insights/get-started/installation"}
  Install via Composer or the Craft Plugin Store.
  ::
  ::card{title="Configuration" to="/libraries/craft-insights/get-started/configuration"}
  Customize tracking behavior and privacy settings.
  ::
::
