---
title: Hot Reloading Content in Craft CMS's Live Preview and Nuxt
description: 'A guide on how to set up hot reloading live previews with Nuxt and Craft CMS'
datePublished: 2025-05-18
readingTime: 3min
---

## Inspiration

A few days ago, I stumbled upon [Aaron Bushnell](https://aaronmbushnell.com/hot-reloading-content-in-craft-cms-live-preview/)'s blog post about hot reloading content in Craft CMS's Live Preview. It grabbed my attention right away! I decided to try it out with Nuxt, and here's what I discovered.

## How it works

1. **Disable auto-refresh for preview targets** <br>
   Since Craft 3.4, you can turn off automatic refreshing in your preview target settings. Check out this [feature request](https://github.com/craftcms/cms/issues/5359) for more details.

2. **Notify the frontend when an entry changes** <br>
   We'll add a bit of Control Panel JavaScript that sends a `postMessage` event to the frontend whenever the entry is updated.

3. **Listen and refresh** <br>
   On the frontend, we'll catch those messages and automatically refresh the relevant parts of the page.

## Disable auto refresh

First, let's turn off the hard refresh for preview targets. In your section settings, simply uncheck the **Refresh** box:

![Preview targets in section settings](/images/bitmap/refresh-preview.png)

## Notify the frontend

Next, we need to let the frontend know when the entry changes. Whenever you update the entry, it should send a message to the frontend so it can react.

You can achieve this by registering a small JavaScript file. I usually create a custom module and asset bundle, but if you prefer something quick, the [Control Panel JS](https://plugins.craftcms.com/cp-js) plugin works great too.

::alert{variant="note"}
If you already know how to make it working with a custom module or want to use Control Panel Js, you can skip forward to the [post massage code](#add-the-post-message-event).
::

### Add a new module

I'm lazy and I don't want to scaffold everything by myself. That's why I use the [Generator](https://craftcms.com/docs/4.x/extend/generator.html) to scaffold a new module. 
Make sure you've installed the Generator plugin first.

```bash
# Run this command
php craft make module 

# I used this values on the prompts:
# > Module ID: hr-preview
# > Base module class name: HrPreview
# > Module location: modules/hr-preview
# > What should the root namespace for modules/hr-preview/ be? modules\hrpreview
# > Should the module be loaded during app initialization? yes

# Run composer dump-autoload, to let composer know about your module.
composer dump-autoload 
```

### Add a asset bundle to the module

To load our JavaScript in the Control Panel, let's register an AssetBundle. Create a file at `modules/hr-preview/HrPreviewAsset.php`:

```php [/modules/hr-preview/HrPreviewAsset.php]
<?php

namespace modules\hrpreview;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * Hr Preview asset bundle
 */
class HrPreviewAsset extends AssetBundle
{
    // Where our JS "lives"
    public $sourcePath = '@modules/hrpreview';
    
    // Ensure CP’s core scripts (including garnish.js) are available
    public $depends = [
        CpAsset::class,
    ];
    
    // Our custom script
    public $js = [
        'script.js',
    ];
}
```

Then register this bundle in your module's main class (e.g. in HrPreview.php).

```php
<?php

namespace modules\hrpreview;

use Craft;
use modules\queryapiextensions\HmrBundle;
use yii\base\InvalidConfigException;
use yii\base\Module as BaseModule;

/**
 * HrPreview module
 *
 * @method static HrPreview getInstance()
 */
class HrPreview extends BaseModule
{
    public function init(): void
    {
        Craft::setAlias('@modules/hrpreview', __DIR__);

        parent::init();

        Craft::$app->onInit(function() {
            $this->registerAssetBundle();
        });
    }

    /**
     * @throws InvalidConfigException
     */
    public function registerAssetBundle(): void
    {
        if (Craft::$app->getRequest()->getIsLivePreview()) {
            Craft::$app->getView()->registerAssetBundle(HmrBundle::class);
        }
    }
}

```

### Add the post message event
In `modules/hr-preview/script.js`, broadcast a message whenever Craft's Live Preview is about to update the iframe:

``` javascript [/modules/hr-preview/script.js]
Garnish.on(Craft.Preview, 'beforeUpdateIframe', function (event) {
  if (!event.refresh) {
    // Send a scoped “entry:live-preview:updated” messag
    event.target.$iframe[0].contentWindow.postMessage(
        'entry:live-preview:updated',
        event.previewTarget.url
    )
  }
})
```

## Listen and refresh

On the Nuxt side, we can listen to the `entry:live-preview:updated` message. 
For a quick proof-of-concept, you can simply add an event listener to your `app.vue` and use the `refreshNuxtData()` composable to refetch all your data hooks.

```vue 
<script setup lang="ts">
const {query} = useRoute()
// Only run in Live Preview mode
if (query['x-craft-live-preview']) {
  onMounted(() => {
    window.addEventListener('message', async (e) => {
      if (e.data !== 'entry:live-preview:updated') {
        return
      }

      try {
        await refreshNuxtData()
      } catch (e) {
        console.error(e)
      }
    })
  })
}
</script>

<template>
  <NuxtPage />
</template>
```

## Done
You should now have a working 🔥 reloading! Just hit the “Preview” button in your control panel and start editing. 
I'd love to hear your thoughts on this! If you have any questions (or thoughts) [email](mailto:samuelreichor@gmail.com) me :)

Happy coding!