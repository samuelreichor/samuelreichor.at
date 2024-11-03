---
title: 'ImagerX'
description: 'Learn how to configure imagerX for the craft query api craft cms plugin.'
---

## Configure ImagerX
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
