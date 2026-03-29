---
title: 'Custom Tools'
description: 'Register custom tools that the CoPilot agent can use.'
---

Tools are actions the agent can call during a conversation. CoPilot ships with built-in tools for reading, searching, and editing content. You can add your own via events.

## Example

A `searchFormieForms` tool that lets the agent find Formie form handles:

:::code-tree{defaultValue="modules/mymodule/tools/SearchFormieFormsTool.php"}

```php[modules/mymodule/tools/SearchFormieFormsTool.php]
<?php

namespace modules\mymodule\tools;

use samuelreichor\coPilot\enums\AuditAction;
use samuelreichor\coPilot\helpers\PluginHelper;
use samuelreichor\coPilot\tools\ToolInterface;

class SearchFormieFormsTool implements ToolInterface
{
    public function getName(): string
    {
        return 'searchFormieForms';
    }

    public function getLabel(): string
    {
        return 'Search Formie Forms';
    }

    public function getAction(): AuditAction
    {
        return AuditAction::Search;
    }

    public function getDescription(): string
    {
        return 'Searches Formie forms by title. Returns form handles '
            . 'that can be used in Formie fields. Call this to find '
            . 'the correct form handle before setting a Formie field value.';
    }

    public function getParameters(): array
    {
        return [
            'type' => 'object',
            'properties' => [
                'query' => [
                    'type' => 'string',
                    'description' => 'Optional search query to filter forms by title.',
                ],
            ],
            'required' => [],
        ];
    }

    public function execute(array $arguments): array
    {
        if (!PluginHelper::isPluginInstalledAndEnabled('formie')) {
            return ['error' => 'Formie plugin is not installed.'];
        }

        $formsQuery = \verbb\formie\elements\Form::find();

        $query = $arguments['query'] ?? null;
        if ($query) {
            $formsQuery->title('*' . $query . '*');
        }

        $forms = $formsQuery->all();

        if (empty($forms)) {
            return ['results' => [], 'message' => 'No forms found.'];
        }

        $results = array_map(fn($form) => [
            'id' => $form->id,
            'title' => $form->title,
            'handle' => $form->handle,
        ], $forms);

        return [
            'results' => $results,
            'total' => count($results),
        ];
    }
}
```

```php[modules/mymodule/MyModule.php]
<?php

namespace modules\mymodule;

use modules\mymodule\tools\SearchFormieFormsTool;
use samuelreichor\coPilot\events\RegisterToolsEvent;
use samuelreichor\coPilot\services\AgentService;
use yii\base\Event;
use yii\base\Module;

class MyModule extends Module
{
    public function init(): void
    {
        parent::init();

        Event::on(
            AgentService::class,
            AgentService::EVENT_REGISTER_TOOLS,
            function(RegisterToolsEvent $event) {
                $event->tools[] = new SearchFormieFormsTool();
            },
        );
    }
}
```

:::

## ToolInterface

| Method | Returns | Description |
|--------|---------|-------------|
| `getName()` | `string` | Unique tool name for AI function calling. |
| `getDescription()` | `string` | Description the AI uses to decide when to call this tool. |
| `getParameters()` | `array` | JSON Schema defining the tool's input parameters. |
| `getLabel()` | `string` | Human-readable label for the audit log. |
| `getAction()` | `AuditAction` | Audit action type: `Read`, `Search`, `Create`, or `Update`. |
| `execute()` | `array` | Runs the tool and returns a result array. |

The `execute()` return value is sent directly to the AI as the tool result. Return an `error` key to signal failure.
