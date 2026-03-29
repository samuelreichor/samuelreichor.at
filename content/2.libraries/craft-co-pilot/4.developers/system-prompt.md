---
title: 'System Prompt'
description: 'Add custom instructions to the CoPilot system prompt.'
---

The system prompt controls how the agent behaves — its tone, rules, and domain knowledge. You can append custom sections via the `EVENT_BUILD_PROMPT` event.

## Example

Add project-specific workflow rules that the agent should always follow:

:::code-tree{defaultValue="modules/mymodule/MyModule.php"}

```php[modules/mymodule/MyModule.php]
<?php

namespace modules\mymodule;

use samuelreichor\coPilot\events\BuildPromptEvent;
use samuelreichor\coPilot\services\SystemPromptBuilder;
use yii\base\Event;
use yii\base\Module;

class MyModule extends Module
{
    public function init(): void
    {
        parent::init();

        Event::on(
            SystemPromptBuilder::class,
            SystemPromptBuilder::EVENT_BUILD_PROMPT,
            function(BuildPromptEvent $event) {
                $event->sections[] = implode("\n", [
                    '## Content Workflow Rules',
                    'Entries in the "products" section are synced to Shopify — never change their slug or status.',
                    'Every blog post must have at least one category and a featured image before publishing.',
                    'When creating entries in the "legal" section, always set the "reviewRequired" lightswitch to true.',
                ]);
            },
        );
    }
}
```

:::

## How It Works

The `$event->sections` array contains all prompt sections as strings. They are joined with double newlines to form the final system prompt. Your sections are appended after the built-in ones.

Use Markdown headings (`##`) to structure your sections — this helps the AI parse and follow the instructions.
