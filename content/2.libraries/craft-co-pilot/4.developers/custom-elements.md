---
title: 'Custom Elements'
description: 'Register custom element transformers to teach CoPilot how to serialize third-party element types.'
---

Element transformers control how element types are serialized for the AI context. CoPilot ships with transformers for Entries and Assets. For third-party element types (e.g. Commerce Products), register your own via events.

## Example

This is the built-in `AssetTransformer`, it serializes native properties and custom fields:

:::code-tree{defaultValue="src/transformers/elements/AssetTransformer.php"}

```php[src/transformers/elements/AssetTransformer.php]
<?php

namespace samuelreichor\coPilot\transformers\elements;

use craft\base\ElementInterface;
use craft\elements\Asset;
use samuelreichor\coPilot\transformers\SerializeFallbackTrait;

class AssetTransformer implements ElementTransformerInterface
{
    use SerializeFallbackTrait;

    public function getSupportedElementClasses(): array
    {
        return [
            Asset::class,
        ];
    }

    public function serializeElement(
        ElementInterface $element,
        int $depth = 2,
        ?array $fieldHandles = null,
    ): ?array {
        if (!$element instanceof Asset) {
            return null;
        }

        $data = [
            '_type' => 'asset',
            'id' => $element->id,
            'filename' => $element->filename,
            'url' => $element->url,
            'alt' => $element->alt ?? '',
            'kind' => $element->kind,
            'size' => $element->size,
            'width' => $element->width,
            'height' => $element->height,
        ];

        $fields = $this->serializeCustomFields($element, $depth);
        if ($fields !== []) {
            $data['fields'] = $fields;
        }

        return $data;
    }

    public function getElementTypeLabel(): string
    {
        return 'Asset';
    }
}
```

```php[modules/mymodule/MyModule.php]
<?php

namespace modules\mymodule;

use modules\mymodule\transformers\ProductTransformer;
use samuelreichor\coPilot\events\RegisterElementTransformersEvent;
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
            TransformerRegistry::EVENT_REGISTER_ELEMENT_TRANSFORMERS,
            function(RegisterElementTransformersEvent $event) {
                $event->transformers[] = new ProductTransformer();
            },
        );
    }
}
```

:::

## ElementTransformerInterface

| Method | Returns | Description |
|--------|---------|-------------|
| `getSupportedElementClasses()` | `string[]` | FQCNs of element classes this transformer handles. |
| `serializeElement()` | `array\|null` | Serialize the element to a JSON-safe array for the AI context. Return `null` to skip. |
| `getElementTypeLabel()` | `string` | Human-readable label used in schema context (e.g. "Product"). |

## SerializeFallbackTrait

Use `SerializeFallbackTrait` to get access to `serializeCustomFields()`, it resolves all custom fields from the element's field layout and serializes them using the registered field transformers. This avoids duplicating the field serialization logic in every element transformer.
