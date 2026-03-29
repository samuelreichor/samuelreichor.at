---
title: 'Custom Fields'
description: 'Register custom field transformers to teach CoPilot how to read and write third-party field types.'
---

Field transformers tell the agent how to describe, read, and write a field type. CoPilot covers all native Craft fields. For third-party fields, register your own transformer via events.

## Example

A transformer for [Formie](https://verbb.io/craft-plugins/formie) form selection fields. Combined with a [custom tool](/libraries/craft-co-pilot/developers/custom-tools) like `searchFormieForms`, the agent can find a form by name and set it on an entry.

:::code-tree{defaultValue="modules/mymodule/transformers/FormieFieldTransformer.php"}

```php[modules/mymodule/transformers/FormieFieldTransformer.php]
<?php

namespace modules\mymodule\transformers;

use craft\base\Element;
use craft\base\FieldInterface;
use samuelreichor\coPilot\helpers\PluginHelper;
use samuelreichor\coPilot\transformers\fields\FieldTransformerInterface;

class FormieFieldTransformer implements FieldTransformerInterface
{
    public function getSupportedFieldClasses(): array
    {
        return [];
    }

    public function matchesField(FieldInterface $field): ?bool
    {
        if (!PluginHelper::isPluginInstalledAndEnabled('formie')) {
            return null;
        }

        return get_class($field) === 'verbb\formie\fields\Forms' ? true : null;
    }

    public function describeField(
        FieldInterface $field,
        array $fieldInfo,
    ): array {
        $fieldInfo['valueFormat'] = 'form handle (string)';
        $fieldInfo['hint'] = 'Use searchFormieForms to find the correct handle.';

        return $fieldInfo;
    }

    public function serializeValue(
        FieldInterface $field,
        mixed $value,
        int $depth,
    ): mixed {
        if ($value === null) {
            return null;
        }

        // Formie returns a Form element query
        $form = is_object($value) && method_exists($value, 'one')
            ? $value->one()
            : $value;

        if ($form === null) {
            return null;
        }

        return [
            'id' => $form->id,
            'title' => $form->title,
            'handle' => $form->handle,
        ];
    }

    public function normalizeValue(
        FieldInterface $field,
        mixed $value,
        ?Element $element = null,
    ): mixed {
        // Accept a handle string and resolve it to a form ID
        if (is_string($value)) {
            $form = \verbb\formie\elements\Form::find()
                ->handle($value)
                ->one();

            return $form ? [$form->id] : null;
        }

        return null;
    }
}
```

```php[modules/mymodule/MyModule.php]
<?php

namespace modules\mymodule;

use modules\mymodule\transformers\FormieFieldTransformer;
use samuelreichor\coPilot\events\RegisterFieldTransformersEvent;
use samuelreichor\coPilot\services\TransformerRegistry;
use yii\base\Event;
use yii\base\Module;

class MyModule extends Module
{
    public function init(): void
    {
        parent::init();

        Event::on(
            TransformerRegistry::class,
            TransformerRegistry::EVENT_REGISTER_FIELD_TRANSFORMERS,
            function(RegisterFieldTransformersEvent $event) {
                $event->transformers[] = new FormieFieldTransformer();
            },
        );
    }
}
```

:::

## FieldTransformerInterface

| Method | Description |
|--------|-------------|
| `getSupportedFieldClasses()` | Return FQCNs of field classes this transformer handles. |
| `matchesField()` | Custom matching logic. Return `true` to claim, `false` to skip, `null` to fall through to class matching. |
| `describeField()` | Enrich the field info array with `valueFormat`, `hint`, and other metadata for the AI. |
| `serializeValue()` | Convert a field value into a JSON-serializable format for the AI context. |
| `normalizeValue()` | Convert an AI-provided value back into Craft's expected format. Return `null` if no normalization is needed. |

## Matching

Transformers are checked in order. For each field, the registry calls `matchesField()` first. If it returns `null`, class matching via `getSupportedFieldClasses()` is used as fallback.

Event-registered transformers are checked **before** built-in ones, so you can override default behavior for any field type.
