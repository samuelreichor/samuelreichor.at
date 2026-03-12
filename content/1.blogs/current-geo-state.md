---
title: Current State of GEO
description: 'An overview of the current state of Generative Engine Optimization, covering llms.txt, serving markdown to AI agents, inline LLM instructions, and practical tips to make your site AI-friendly.'
datePublished: 2026-03-12
readingTime: 3min
badge: 100% Human Written
---

Here we are in the [blazingly](https://frontendmasters.com/courses/blazingly-fast-js/) fast moving world of AI. Whether you hate it or love it, it's part of our web searching experience and this is a brief overview of the current state and best practices.

First of all, who am I, I am a fullstack developer, mainly in the small Craft CMS world and I wrote a Plugin that optimizes Craft CMS sites for LLMs called [LLMify](https://plugins.craftcms.com/llmify?craft5).

Let's dive into it. 

## Some words 

I don't want to make this topic more complicated than it should be. 
Therefore here are some general things before we start with different implementations. 

All of the concepts for optimizing your site for SEO are also very important for GEO. Same for accessibility. If the screen reader can't read your faq, why should google or openAI know what's going on.

LLMs understand text. HTML is not only text but a shit load of tags, navigations, svgs, etc. Therefore we want to minimize that noise and the context that is needed to process a single page.
This is where markdown joins the game.

## llms.txt

There is a big misconception about the `llms.txt`.
It's a proposal that [no big AI Provider](https://seranking.com/blog/llms-txt/) uses.

The [idea](https://llmstxt.org/) is to add a sitemap, with links to markdown files with a short description, what the link is about. 

```[llms.txt]
# Hello world

[You look good](https://you-look-good.com/index.md): Don't let Rick roll over Astley.
```

The [problem](https://seranking.com/blog/llms-txt/) is, that there is no way (besides crawling the real html site) to verify that these markdowns are correct. 
In the proposal isn't even a required indicator where to find the html version. This proposal is only for training an AI in my understanding. 

[LLMify](https://plugins.craftcms.com/llmify?craft5), handles this with an optional front matter, where you can add the original url to the markdown and it automatically adds a `Link: "<originalUrl>; rel="canonical"` header. In case it ever gets used.

## Serve Markdown files

This is fresh of the press. What if Bots can say "I trust you, just give me a markdown version of your html!"? 
According to [Cloudflare](https://blog.cloudflare.com/markdown-for-agents/), Claude Code and Open Code are already using this Header `Accept: "text/markdown, text/html"`.

I mean, yeah maybe this article of cloudflare is a marketing blog for their new shiny [html to markdown converter](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/), but I think the idea is great.

If the url keeps the same, bots can quickly verify that content is correct. 
Also google will always rank your site based on the html version. AI agents are searching for the best match for a given search, therefore they can rely on google to find that for you, without blowing up the context window. 

(I know it's off to promote my own thing here whenever I can, but in case you need this for your site, [LLMify](https://plugins.craftcms.com/llmify?craft5) has you covered here as well)

## llms.txt inline

You have probably already noticed that [Cloudflare and Vercel](https://x.com/dok2001/status/1963611108998095246) are in a beef. 
Therefore Vercel has its own [implementation](https://vercel.com/blog/a-proposal-for-inline-llm-instructions-in-html) for llms.

Its called `<script type="text/llms.txt">`.

It suggest that there should be following tag in the html site directly:

```html
<script type="text/llms.txt">
  # How to transition from Full Stack Developer to Sheep Farmer

  Jamal thought memory leaks were bad until he discovered holes in fences.
</script>
```

The idea is that browsers ignore script tags with an unknown type, but llms understand it because they read just text. 

That said, they probably need to read a lot of the html page so this process will never be as efficient as serving markdown directly.

## Copy site as MD

This is a feature, that you can find in many [docs](https://nuxt.com/docs/4.x/getting-started/introduction). 
You can use it to provide specific context to the AI. It basically copies the markdown version of the current page into the clipboard and you can do what ever you want with it. 

I use this feature a lot and I think it's by far the most useful thing to implement.

## Conclusion

Here we are, at the end of the article. I hope you have a clear overview of all possible technical improvements you can try to optimize your site for llms. 

I think to sum it up in a sentence: 

> Serve markdown whenever crawlers want it, provide a quick and easy way to copy your site as markdown and focus on seo and a11y. Then you will be fine, whether you have a llms.txt or not ;)

Cheers!
