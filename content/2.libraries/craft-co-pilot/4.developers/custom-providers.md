---
title: 'Custom Providers'
description: 'Register a custom AI provider for CoPilot.'
---

CoPilot ships with OpenAI, Anthropic, and Gemini providers. You can add your own by implementing `ProviderInterface` and registering it via events.

## Registration

```php
use samuelreichor\coPilot\events\RegisterProvidersEvent;
use samuelreichor\coPilot\services\ProviderService;
use yii\base\Event;

Event::on(
    ProviderService::class,
    ProviderService::EVENT_REGISTER_PROVIDERS,
    function(RegisterProvidersEvent $event) {
        $event->providers['myProvider'] = new MyCustomProvider();
    },
);
```

The key in `$event->providers` is the provider handle used in configuration.

## ProviderInterface

Your provider must implement `samuelreichor\coPilot\providers\ProviderInterface`. The interface requires methods for configuration, model selection, chat completion, and streaming.

Use one of the built-in providers as a reference implementation:

- [`OpenAIProvider`](https://github.com/samuelreichor/craft-coPilot/blob/main/src/providers/OpenAIProvider.php)
- [`AnthropicProvider`](https://github.com/samuelreichor/craft-coPilot/blob/main/src/providers/AnthropicProvider.php)
- [`GeminiProvider`](https://github.com/samuelreichor/craft-coPilot/blob/main/src/providers/GeminiProvider.php)
