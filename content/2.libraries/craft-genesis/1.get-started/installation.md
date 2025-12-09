---
title: 'Installation'
description: 'Learn how to install the Genesis Craft CMS plugin.'
---

## Requirements

- Supports Craft CMS > 5
- PHP 8.2 or later.

## Craft Plugin Store

To install Genesis, go to the Plugin Store in your Craft control panel, search for "Genesis," and click the Install button.

## Installation

::code-group

```bash [ddev]
ddev composer require samuelreichor/craft-genesis &&
ddev craft plugin/install genesis
```

```bash [php]
composer require samuelreichor/craft-genesis &&
php craft plugin/install genesis
```
::

Or install it from the Craft Plugin Store in your control panel.

## Next Steps

After installation, navigate to **Utilities > Genesis Import** in your control panel to start importing elements.

## Example Config File

To get started quickly, use this [example config file](/other-files/example-craft-config.xlsx){target="_blank" download="/other-files/example-craft-config.xlsx"} and get begin to configure it. 


::alert{variant="note"}
You can use Title Case or camelCase for the column header.
::
