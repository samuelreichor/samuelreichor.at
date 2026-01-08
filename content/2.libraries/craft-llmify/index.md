---
title: LLMify
description: 'LLMify makes your Craft CMS content instantly AI-ready.'
type: 'craft'
icon: 'craft-llmify'
---

AI models like ChatGPT struggle to read websites built for people. They see a wall of code, menus, ads, and sidebars. This "noise" makes it hard for them to find the real story—your valuable content.

Craft LLMify solves this by converting your Twig templates into clean, structured Markdown. You get precise control over this process: use simple Twig tags like `{% llmify %}` to pinpoint essential content, and define CSS classes to automatically exclude noise like navigation or banners.

This creates a perfect, distraction-free version of your content, served in AI-ready files like `llms.txt` and `llms-full.txt`, ensuring your message is understood with perfect accuracy.

## Features

- **Automatic Markdown Output**: Creates clean Markdown versions of your Twig templates.
- **LLM-Ready Text Files**: Generates `llms.txt` (summary) and `llms-full.txt` (full content).
- **Twig Tags for Control**: Use `{% llmify %}` to include or `{% excludellmify %}` to exclude HTML from the output.
- **Exclude Tags with Classes**: Define classes that should be excluded from the HTML output.
- **Flexible Configuration**: Site-wide, section, and entry-level settings.
- **Easy Refresh Options**: Automatic background jobs, manual updates in the CP, or console commands for deployments.

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

## What is `llms.txt` and `llms-full.txt`?

Inspired by web standards like `robots.txt`, the **`llms.txt`** file is part of a new proposal to make the web easier for AI to understand. 
It acts as a **curated guide or a map** for models like ChatGPT, giving them a simple, structured list of your most important URLs to focus on.

The **`llms-full.txt`** file is its essential companion. It contains the **complete, clean Markdown content** from all the pages listed in the `llms.txt` file. 
By stripping away all the visual noise—like ads, menus, and banners—it provides the AI with perfect source material, dramatically improving the accuracy of its answers and summaries about your site.


