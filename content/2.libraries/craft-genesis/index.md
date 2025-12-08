---
title: Craft Genesis
description: 'Bulk import Craft elemnts by csv files.'
type: 'craft'
icon: 'craft-genesis'
badge: true
---

## What Can You Import?

- **Sites** - Multi-site setup with language and URL configuration
- **Entry Types** - Define content types with translation settings
- **Sections** - Channels, structures, and singles with URI patterns
- **Filesystems** - Local storage paths for assets
- **Asset Volumes** - Configure where your assets live

## How It Works

1. **Download a CSV template** for the element type you want to create
2. **Fill in your data** using any spreadsheet application
3. **Upload and validate** to catch errors before importing
4. **Import** - Genesis handles the rest via queue jobs

## Validation

Genesis validates your CSV before importing:

- Checks for required columns
- Validates column names against allowed fields
- Verifies data types (booleans, language codes, etc.)
- Ensures referenced elements exist (sites, entry types, filesystems)

This catches mistakes early so you don't end up with partial imports.

## Example Config File

To get started quickly, use this [example config file](/other-files/example-craft-config.xlsx){target="_blank" download="/other-files/example-craft-config.xlsx"} and get begin to configure it.

