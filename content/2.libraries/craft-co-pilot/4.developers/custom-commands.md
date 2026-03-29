---
title: 'Custom Commands'
description: 'Register custom slash commands for the CoPilot chat interface.'
---

Commands are predefined prompts triggered via `/` in the chat input. CoPilot ships without built-in commands, but you can register your own via events.

## Example

A `/translate` command that lets the user pick an entry and translates it to all sites:

:::code-tree{defaultValue="modules/mymodule/commands/TranslateCommand.php"}

```php[modules/mymodule/commands/TranslateCommand.php]
<?php

namespace modules\mymodule\commands;

use samuelreichor\coPilot\commands\CommandInterface;

class TranslateCommand implements CommandInterface
{
    public function getName(): string
    {
        return 'translate';
    }

    public function getDescription(): string
    {
        return 'Translate an entry to all configured sites';
    }

    public function getPrompt(): string
    {
        return 'Translate the entry with ID {entry} to all available sites. '
            . 'Call listSites to find the target sites and their languages. '
            . 'Read the entry first, then update each site version with translated content. '
            . 'Keep the tone and formatting consistent across all translations.';
    }

    public function getParam(): ?array
    {
        return ['type' => 'entry', 'label' => 'Select entry to translate'];
    }
}
```

```php[modules/mymodule/MyModule.php]
<?php

namespace modules\mymodule;

use modules\mymodule\commands\TranslateCommand;
use samuelreichor\coPilot\events\RegisterCommandsEvent;
use samuelreichor\coPilot\services\CommandService;
use yii\base\Event;
use yii\base\Module;

class MyModule extends Module
{
    public function init(): void
    {
        parent::init();

        Event::on(
            CommandService::class,
            CommandService::EVENT_REGISTER_COMMANDS,
            function(RegisterCommandsEvent $event) {
                $event->commands[] = new TranslateCommand();
            },
        );
    }
}
```

:::

## Parameter Types

`getParam()` returns `null` for no parameter, or an array with `type` and `label`:

| Type | Resolves to | UI |
|------|-------------|----|
| `entry` | Entry ID | Entry selection modal |
| `asset` | Asset ID | Asset selection modal |
| `file` | File content | File upload dialog |
| `text` | Free text | Text input field |

The resolved value replaces `{paramName}` placeholders in the prompt. Return `null` from `getParam()` if the command needs no parameter — these work best from the entry slideout, where the current entry is already loaded as context.
