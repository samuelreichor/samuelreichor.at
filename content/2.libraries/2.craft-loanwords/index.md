---
head.title: Craft Query API the Query Builder for JS Frameworks
head.description: Use the Craft Query API to get the Craft CMS query builder in your favorite Javascript Framework. An alternative to graphql.
title: Loanwords
description: 'Enhance Screen Reader Experience with Loanwords'
type: 'craft'
icon: 'craft-loanwords'
badge: true
---

## Features

- Manage and organize your loanwords effortlessly within Craft CMS.
- Includes a Twig Extension to automatically wrap loanwords with a tag for accessibility.
- Customize default language tags and CSS classes for consistent styling.
- Provides case-sensitive and case-insensitive options for flexible loanword matching.

## What are loanwords?

[Loanwords](https://en.wikipedia.org/wiki/Loanword) are words borrowed from one language and incorporated into another, often retaining their original spelling and pronunciation. In German, common loanwords are Anglicisms like "Bachelor", "Job" or "FAQ" borrowed from English.


## Why it matters?

Using appropriate language tags for loanwords is essential for accessibility and semantic accuracy. These tags ensure that screen readers pronounce words correctly based on their language, providing a better experience for users with visual impairments. 

Additionally, proper language tagging improves SEO and helps search engines understand your content more effectively.

## How it works 

Once you've installed the Loanwords plugin, you'll gain access to a dedicated section in Craft CMS for managing your loanwords with ease.

![Loanwords Overview](/images/bitmap/loanword-overview.png)

Adding a new loanword is simple—just provide the word and select the appropriate language from a dropdown menu. This ensures that each loanword is correctly tagged for accessibility and semantic accuracy.

![Loanwords Overview](/images/bitmap/loanword-edit.png)

After saving, you can use the `a11yTextReplacer()` Twig extension in your templates. This automatically replaces loanwords in your content with the correct <span lang=""> tags, enhancing accessibility and ensuring proper screen reader pronunciation on the frontend.