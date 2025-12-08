# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Nuxt 4 that showcases open source libraries (primarily Craft CMS plugins and JavaScript SDKs) and blog posts. The site is deployed to Netlify and uses Nuxt Content for markdown-based content management.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build locally
npm run preview
```

## Architecture

### Content Structure

The project uses **Nuxt Content v3 Collections** (configured in `content.config.ts`):

- **`blog`** collection: Source `content/1.blogs/**` - Personal blog posts about Craft CMS, deployment, and web development
- **`docs`** collection: Source `content/2.libraries/**` - Documentation for 9 open source libraries (4 Craft CMS plugins + 5 JavaScript SDKs)
- **`snippets`** collection: Source `content/_snippets/**` - Reusable content snippets

Library documentation follows a numbered directory structure (e.g., `craft-query-api/`, `vue-craftcms/`) with nested markdown files.

### App Structure

The codebase follows Nuxt's standard directory conventions:

- **`app/`**: Main application code
  - `pages/`: File-based routing (index, blogs, libraries)
  - `components/`: Vue components organized by feature (sidebar, navigation, card, etc.)
  - `layouts/`: Layout wrapper (minimal default layout)
  - `composables/`: Reusable composition functions
  - `utils/`: Utility functions
  - `app.config.ts`: Nuxt UI theme customization (colors, button variants)

- **`server/`**: Nitro server routes and utilities
  - `routes/reactions/`: GET/POST endpoints for page reaction tracking (thumbs up/down, etc.)
  - `routes/raw/`: Dynamic markdown serving at `/raw/libraries/*.md` for LLM consumption
  - `utils/reactionsStore.ts`: Database operations for reactions using Neon (PostgreSQL)
  - `utils/db.ts`: Neon database client setup

### Key Technologies

- **Nuxt 4** with file-based routing
- **Nuxt Content**: Markdown rendering with syntax highlighting (configured in `nuxt.config.ts`)
- **Nuxt UI**: Component library with custom theme (primary color: "highlight")
- **Neon (PostgreSQL)**: Database for reaction tracking via `@netlify/neon`
- **nuxt-llms**: LLM optimization module that exposes documentation in LLM-friendly formats
- **Tailwind CSS 4**: Styling
- **vite-svg-loader**: Import SVGs as Vue components

### Custom Features

1. **LLM Optimization (`nuxt-llms` module)**: Configured in `nuxt.config.ts` to expose structured documentation for each library via the `/raw/libraries/` route. This enables LLMs to access complete documentation for Query API, Loanwords, Quick Edit, LLMify, and all JavaScript SDKs.

2. **Dynamic Prerendering**: The `nitro:config` hook in `nuxt.config.ts` walks the `content/2.libraries/` directory and generates prerender routes for all markdown files, stripping numbered prefixes from paths.

3. **Reaction System**: Users can react to blog posts/docs. Reactions are stored in a PostgreSQL database (Neon) and managed via server API routes.

4. **Markdown Export**: The `/raw/libraries/[...slug].md.get.ts` route exports docs as raw markdown, prepending title and description if missing.

## Deployment

- **Platform**: Netlify (configured via `nitro.preset: 'netlify'` in `nuxt.config.ts`)
- **Prerendering**: Homepage and library docs are prerendered during build via `crawlLinks: true`
- **Database**: Neon PostgreSQL (reactions table with slug, reaction counts, timestamps)

## Content Authoring

When editing library documentation:
- Files in `content/2.libraries/` use numbered prefixes (e.g., `1.getting-started/`, `2.configuration/`)
- These prefixes are stripped in URLs by the prerender hook
- Each library has an `index.md` with frontmatter: `badge`, `icon`, `type`
- Blog posts require frontmatter: `tags`, `imgPath`, `datePublished`, `readingTime`

## UI Customization

The Nuxt UI theme is customized in `app/app.config.ts`:
- Primary color: `highlight` (custom color)
- Button variants: `primary` (highlight-500) and `gray` (muted with brightness)
- Focus styles use highlight-500 with ring offset
