---
title: 'ImagerX'
description: 'Learn how to configure imagerX for the Craft Query API Craft CMS plugin.'
---

## Image Generation
If you're using ImagerX (which I highly recommend), you'll need to generate all image transforms before querying them. 
Otherwise, the first fetch may take some time as all images will be generated during the initial request.

To do this, create an `imager-x-generate.php` file in your `./config` folder, listing all the named transforms. Here's an example of what that file might look like:


```php [imager-x-generate.php]
<?php

return [
    'volumes' => [
        'images' => ['auto', 'square', 'landscape', 'portrait', 'dominantColor'],
    ]
];
```

::alert{variant="note"}
The plugin will automatically detect the named transforms and widths defined in your `imager-x-transforms.php`. The response will include an object where the keys are the transform names, and the values are the `srcset` of all defined transforms.
::

## Add Imager Url 

If your frontend and backend are not accessible under the same URL, you’ll need to configure an [Imager URL](https://imager-x.spacecat.ninja/configuration.html#imagerurl-string-array). This ensures that your `srcset` attributes use absolute URLs instead of the default relative ones.
This is particularly important in development environments, especially if you’re not using a reverse proxy (e.g., in DDEV) to serve your frontend.