---
title: 'CoPilot'
description: 'AI agent plugin for Craft CMS that creates, edits, translates, and publishes content through natural language.'
type: 'craft'
icon: 'craft-co-pilot'
badge: 'New'
---

::video-player{src="/videos/craft-co-pilot-chat-demo.mp4" alt="CoPilot demo"}
::

An AI agent that lives in your Craft CMS control panel. It reads your content structure, writes in your brand voice, and handles everything from single field edits to full multi-site translations.

## Features

- **AI Chat in the Control Panel**: A full chat interface and an entry slideout
- **Read, Write & Publish**: Create entries, fill fields, update content, and publish it directly
- **Multi-Site Translation**: Translate entries across sites and languages with automatic propagation handling
- **Multi-Provider Support**: Use Anthropic, OpenAI, or Google Gemini
- **Granular Permissions**: Control read, write, or block access per section, volume, and category group
- **Brand Voice & Glossary**: Define tone, terminology, and forbidden words to keep content on brand
- **Custom Commands & Tools**: Register your own slash commands and tools via events to extend the agent with project-specific capabilities
- **Audit Log**: Full traceability of every read, create, and update the agent performs (with field-level diffs)
- **Web Search**: Let the agent browse the web to research and enrich your content

## Why CoPilot?

If you've worked on a Craft project with 10+ languages, you know the drill. Creating a single entry means clicking through dozens of fields. Translating it to five languages means doing that five more times. Keeping everything consistent across sites is tedious, repetitive work that nobody enjoys.

We've been building and maintaining large Craft sites for years, and this has always been the part that slows teams down the most. To that point that developing the website from scatch was faster than the actual conent creation.

CoPilot started as an experiment: what if an AI agent actually understood Craft's content model? Not a generic chatbot bolted onto the CP, but an agent that knows your sections, reads your field layouts, respects your permissions, and writes content the way your brand voice demands.

After months of real-world testing with complex multi-site setups, we're confident it delivers on that promise. But we'll let you be the judge and we are looking forward for Feedback!

## Getting Started

::card-group
  ::card{title="Installation" to="/libraries/craft-co-pilot/get-started/installation"}
  Install via Composer and configure your AI provider.
  ::
  ::card{title="AI Providers" to="/libraries/craft-co-pilot/get-started/ai-provider"}
  Compare providers and pick the right model.
  ::
  ::card{title="Configuration" to="/libraries/craft-co-pilot/get-started/configuration"}
  Permissions, agent behavior, and content settings.
  ::
::
