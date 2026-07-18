---
title: The Craft CMS Free Stack
description: A brief introduction for a free Craft CMS Stack with everything you need for a real application.
datePublished: 05-21-2026
readingTime: 5min
---

A few months ago I had a discussion with a friend about the pricing of a running Craft CMS site. I was on team "Craft is mainly a mid-/larger-company CMS" and he disagreed. This led to some thinking, and now I would like to share my "Craft CMS Free Stack".

::alert{variant="tip"}
Here is the [template repo](https://github.com/samuelreichor/Template-Simple-Craft-CMS), if you want to explore the code instead of reading.
::

## Requirements

Before I dive into the actual stack, let me quickly outline what I expect from every project I build. These are the non-negotiables that any solution, free or paid, has to cover for me to even consider it.

::steps

### SEO

I want to rank high, so we need some kind of SEO solution that handles the heavy lifting for us.

### Image Transforms

Images should be as small as possible. The site should be blazingly fast. Therefore, we need to serve images as lightweight as possible.

### DSGVO Tools

I'm from the EU, so we need to make sure the site handles cookies and analytics correctly.

### Cheap Hosting

I want to host it for (nearly) free.

::

## Plugins

Let's start with the elephant in the room. Craft CMS does cost something, and all the great plugins are also not free. Not really.

### Craft CMS Solo 

If you don't need user management and a branded control panel, you can use the [Craft Solo License](https://craftcms.com/pricing). It is free forever, supports multiple sites, and you can even use GraphQL. What?

### SEO

I'm a lifetime [SEOMatic](https://plugins.craftcms.com/seomatic) user, but this plugin is disqualified because of the plugin fee. Another great alternative is [SEOMate](https://plugins.craftcms.com/seomate). It's not as fancy. No control panel UI, no per-entry SEO field, and not as much goodies you get with SEOMatic. But honestly? For titles, descriptions, OG/Twitter tags, image transforms, and a sitemap, it does the job and that's everything I actually need.

::code-collapse

```php[config/seoMate.php]
<?php

use craft\elements\Entry;
use craft\helpers\App;

return [
    '*' => [
        // ------ General ------
        'cacheEnabled' => App::env('CRAFT_ENVIRONMENT') === 'production',
        'cacheDuration' => 3600,

        // ------ Site identity ------
        'siteName' => App::env('SITE_NAME') ?: 'Ganz Lebendig',
        'includeSitenameInTitle' => true,
        'sitenamePosition' => 'after',
        'sitenameSeparator' => '|',

        // ------ Source mapping ------
        // SEOmate's `fieldHandle:subFieldHandle` syntax only works for Matrix sub-fields.
        // For ContentBlock sub-fields (hero), we use object-template syntax: `{hero.text}`.
        'fieldProfiles' => [
            'default' => [
                'title' => ['{hero.headline}', 'title'],
                'description' => ['{hero.text|striptags|trim}'],
                'image' => ['{hero.image.one().id ?? ""}'],
            ],
        ],

        // All sections currently use the pagebuilder entry type → one shared profile.
        'profileMap' => [
            'pages' => 'default',
            'home' => 'default',
            'errorPages' => 'default',
        ],

        // ------ Defaults / fallbacks (when fieldProfiles return empty) ------
        'defaultMeta' => [
            'title' => ['{hero.headline}'],
            'description' => [
                '{hero.text|striptags|trim}',
            ],
            'image' => [
                '{hero.image.one().id ?? ""}',
            ],
        ],

        // ------ Static tags applied to every page ------
        'additionalMeta' => [
            'twitter:card' => 'summary_large_image',
            'og:type' => 'website',
        ],

        // ------ Length constraints / validation ------
        'metaPropertyTypes' => [
            'title,og:title,twitter:title' => [
                'type' => 'text',
                'minLength' => 10,
                'maxLength' => 60,
            ],
            'description,og:description,twitter:description' => [
                'type' => 'text',
                'minLength' => 50,
                'maxLength' => 160,
            ],
            'image,og:image,twitter:image' => [
                'type' => 'image',
            ],
        ],

        // ------ Image transforms for og:image / twitter:image ------
        'imageTransformMap' => [
            'og:image' => [
                'width' => 1200,
                'height' => 630,
                'format' => 'jpg',
                'mode' => 'crop',
            ],
            'twitter:image' => [
                'width' => 1200,
                'height' => 600,
                'format' => 'jpg',
                'mode' => 'crop',
            ],
        ],

        'useImagerIfInstalled' => false,

        // ------ Sitemap ------
        'sitemapEnabled' => true,
        'sitemapName' => 'sitemap',
        'sitemapLimit' => 500,
        'sitemapConfig' => [
            'elements' => [
                [
                    'elementType' => Entry::class,
                    'criteria' => ['section' => ['home', 'pages']],
                    'params' => [
                        'changefreq' => 'weekly',
                        'priority' => 0.8,
                    ],
                ],
            ],
            'custom' => [],
        ],

        // ------ Preview ------
        'previewEnabled' => true,
    ],
];
```
::

In `fieldProfiles` you tell SEOMate which fields map to which meta tags. Headline becomes title, hero text becomes description, hero image becomes OG image. 
From there SEOMate does the rest -> title with site name appended, description, OG and Twitter tags, OG image resized to 1200x630, sitemap. So you set the field handles once and you basically never touch this file again.

### Other Must Haves

- [Quick Edit](https://plugins.craftcms.com/quick-edit): Adds an edit entry button to the frontend, so you can quickly jump to the right place in the control panel if you want to change something.
- [CKEditor](https://plugins.craftcms.com/ckeditor): Adds a rich text editor field to the control panel.

### DSGVO Tools

It's opinionated, but I think [Cookiebot](https://www.cookiebot.com/) is great to work with, and they have a free tier. The main reason I like it: their [JavaScript API](https://www.cookiebot.com/en/developer/) just works. Drop their script in the `<head>`, slap a `data-cookieconsent="statistics"` (or `marketing`, `preferences`) on any third-party script, and Cookiebot handles the rest. It loads when the user consents, unloads when they revoke. 

For analytics, I choose (who would have guessed :D) [Insights](https://plugins.craftcms.com/insights). It has everything I need to know in the free tier, and if you need some more insights, you can always upgrade to the pro plan.

![Insights Dashboard Overview](/images/bitmap/craft-insights-dashboard.png)

The free plan also comes with Traffic Sources (Referrals) and Technology insights (Device, Browser, Desktop/Mobile).

## Image Transforms

Another plugin I always used was [ImagerX](https://plugins.craftcms.com/imager-x). But there's no need to install any plugin at all to get something similar. We can simply use [Craft's native image transforms](https://craftcms.com/docs/5.x/development/image-transforms.html).

To get this to work properly I wrote a small image component. Here's what it does:

- **Aspect ratio presets**: `auto`, `landscape` (16:9), `portrait` (3:4), and `square`. Each one ships with sensible `srcset` widths, so responsive images just work.
- **WebP with fallback**: A `<picture>` element with WebP via `<source>` and the original format as fallback. Old browsers stay happy.
- **Lazy loading**: `loading="lazy"` and `decoding="async"` by default. Flip the `lazy` prop and it switches to `data-src`/`data-srcset`, so you can hook in [lazysizes](https://github.com/aFarkas/lazysizes) if you want.
- **Dominant color placeholder**: Pass a `dominantColor` and the component paints it as a background while the image loads. Cheap LQIP.
- **Safe fallbacks**: SVGs and other non-transformable assets skip the whole pipeline and just render as a plain `<img>`.
- **Captions**: Set `showCaption: true` and it wraps everything in a `<figure>` with the asset's caption.

::code-tree{defaultValue="image/image.twig"}

```[image/image.twig]
{# >>> Comp Settings #}
{% set compDefaults = {
  data: {
    image: null,
    showCaption: false,
    dominantColor: null,
    lazy: true,
    transform: 'auto',
    objectFit: '',
    sizes: '100vw',
  },
  classes: {
    root: '',
    custom: '',
  },
} %}

{# >>> Merge data / classes #}
{% set props = {
  data: data is defined and data is iterable ? compDefaults.data | merge(data) : compDefaults.data,
  classes: classes is defined and classes is iterable ? compDefaults.classes | merge(classes) : compDefaults.classes,
} %}

{% if props.data.image %}
  {% if props.data.showCaption and props.data.image.caption %}
    {{ include('_components/image/partials/figure.twig', {
      data: props.data,
      classes: props.classes,
    }, with_context = false) }}

  {% else %}
    {{ include('_components/image/partials/image.twig', {
      data: props.data,
      classes: props.classes,
    }, with_context = false) }}
  {% endif %}
{% endif %}
```

```twig[image/partials/image.twig]
{# >>> Comp Settings #}
{% set compDefaults = {
  data: {
    name: 'image',
    image: null,
    dominantColor: null,
    lazy: true,
    transform: 'auto',
    objectFit: '',
    sizes: '100vw',
  },
  classes: {
    root: '',
    custom: '',
  },
} %}

{# >>> Merge data / classes #}
{% set props = {
  data: data is defined and data is iterable ? compDefaults.data | merge(data) : compDefaults.data,
  classes: classes is defined and classes is iterable ? compDefaults.classes | merge(classes) : compDefaults.classes,
} %}

{% set image = props.data.image %}

{% if image %}
  {# Native Craft transform presets — base transform defines aspect ratio & mode, widths drive srcset #}
  {% set transformPresets = {
    auto: {
      base: { width: 1920 },
      widths: ['480w', '960w', '1440w', '1920w'],
    },
    landscape: {
      base: { width: 1920, height: 1080, mode: 'crop' },
      widths: ['480w', '960w', '1440w', '1920w'],
    },
    portrait: {
      base: { width: 1440, height: 1920, mode: 'crop' },
      widths: ['480w', '960w', '1440w'],
    },
    square: {
      base: { width: 1440, height: 1440, mode: 'crop' },
      widths: ['480w', '960w', '1440w'],
    },
  } %}

  {% set isTransformable = image.kind == 'image' and image.extension|lower in ['jpg', 'jpeg', 'png', 'webp'] %}
  {% set altText = image.altText ?? '' %}
  {% set lazyClass = props.data.lazy ? 'lazyload' : '' %}
  {% set loadingAttr = props.data.lazy ? 'lazy' : 'eager' %}
  {% set srcAttr = props.data.lazy ? 'data-src' : 'src' %}
  {% set srcsetAttr = props.data.lazy ? 'data-srcset' : 'srcset' %}
  {% set bgStyle = props.data.dominantColor ? 'background-color: ' ~ props.data.dominantColor ~ ';' : '' %}
  {% set fitStyle = props.data.objectFit ? 'object-fit: ' ~ props.data.objectFit ~ ';' : '' %}
  {% set inlineStyle = (bgStyle ~ fitStyle)|trim %}

  {% if isTransformable %}
    {% set preset = transformPresets[props.data.transform] ?? transformPresets.auto %}
    {% set baseTransform = preset.base %}
    {% set widths = preset.widths %}
    {% set webpTransform = baseTransform|merge({ format: 'webp' }) %}

    <picture class="{{ props.data.name }} {{ props.classes.root }} {{ props.classes.custom }}">
      <source
        type="image/webp"
        {{ srcsetAttr }}="{{ image.getSrcset(widths, webpTransform) }}"
        sizes="{{ props.data.sizes }}"
      >
      <img
        {{ srcAttr }}="{{ image.getUrl(baseTransform) }}"
        {{ srcsetAttr }}="{{ image.getSrcset(widths, baseTransform) }}"
        sizes="{{ props.data.sizes }}"
        width="{{ baseTransform.width ?? image.width }}"
        height="{{ baseTransform.height ?? image.height }}"
        alt="{{ altText }}"
        loading="{{ loadingAttr }}"
        decoding="async"
        class="{{ lazyClass }}"
        {% if inlineStyle %}style="{{ inlineStyle }}"{% endif %}
      >
    </picture>
  {% else %}
    <img
      src="{{ image.url }}"
      width="{{ image.width }}"
      height="{{ image.height }}"
      alt="{{ altText }}"
      loading="{{ loadingAttr }}"
      decoding="async"
      class="{{ props.classes.root }} {{ props.classes.custom }}"
      {% if inlineStyle %}style="{{ inlineStyle }}"{% endif %}
    >
  {% endif %}
{% endif %}
```

```[image/partials/figure.twig]
{# >>> Comp Settings #}
{% set compDefaults = {
  data: {
    name: 'figure',
    image: null,
    dominantColor: null,
    lazy: true,
    transform: 'auto',
    objectFit: '',
    sizes: '100vw',
  },
  classes: {
    root: '',
    custom: '',
  },
} %}

{# >>> Merge data / classes #}
{% set props = {
  data: data is defined and data is iterable ? compDefaults.data | merge(data) : compDefaults.data,
  classes: classes is defined and classes is iterable ? compDefaults.classes | merge(classes) : compDefaults.classes,
} %}

<figure class="{{ props.data.name }} {{ props.classes.root }} {{ props.classes.custom }}">
  {# ---- image ---- #}
  {{ include('_components/image/partials/image.twig', {
    data: {
      image: props.data.image,
      dominantColor: props.data.dominantColor,
      lazy: props.data.lazy,
      transform: props.data.transform,
      objectFit: props.data.objectFit,
      sizes: props.data.sizes,
    }
  }, with_context = false) }}

  {# ---- caption ---- #}
  {{ include('_components/caption/caption.twig', {
    data: {
      text: props.data.image.caption,
    }
  }, with_context = false) }}
</figure>
```
::

## Hosting

I have a [Hetzner](https://www.hetzner.com/) VPS for testing and hosting some of my stuff. It's not free, but I pay 9€/month, and this bill gets covered quickly if you host a client's website and they pay you for hosting. So for now, let's call it semi-free.

To manage all the deployment stuff, I simply use [Coolify](https://coolify.io/). So everything a project needs to run can live in its own Docker container.

::code-tree{defaultValue="docker-compose.yaml"}

```yaml[docker-compose.yaml]
services:
  db:
    image: mysql
    environment:
      MYSQL_DATABASE: db # Database name
      MYSQL_USER: db # Database user
      MYSQL_PASSWORD: db # Database password
      MYSQL_ROOT_PASSWORD: root # Root password (credentials only available in the container)
    volumes:
      - db_data:/var/lib/mysql # Maps the 'db_data' named volume to MySQL's data directory
    healthcheck: # Configures a health check for the database
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 1s
      timeout: 3s
      retries: 10

  web:
    build: # Specifies how to build the Docker image
      context: .
      dockerfile: ./.coolify/Dockerfile # Specifies the path to the Dockerfile
      target: web # Build target stage
      args: # Passes build arguments to the Dockerfile
        - php_version=8.3 # Sets the PHP version
        - node_version=22 # Sets the Node.js version
    depends_on:
      db:
        condition: service_healthy # Ensures the 'web' service starts only after the 'db' service is healthy
    volumes:
      - assets_data:/app/web/assets # Maps the 'assets_data' named volume to asset directory

  queue:
    build:
      context: .
      dockerfile: ./.coolify/Dockerfile
      target: queue
      args:
        - php_version=8.3
        - node_version=22
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - assets_data:/app/web/assets
    restart: unless-stopped

volumes:
  db_data: # Defines the 'db_data' volume for persistent database storage (database is not deleted during deploy)
  assets_data: # Defines the 'assets_data' volume for persistent asset storage (assets get not deleted during deploy)
```

```dockerfile[.coolify/Dockerfile]
ARG php_version=8.3
ARG node_version=22

### Stage 1: Node Build Environment
FROM node:${node_version}-alpine as nodebuilder

WORKDIR /app

COPY package.json package-lock.json ./

# Install Node.js dependencies using npm ci for clean and consistent installs.
RUN npm ci

COPY . .

# Build the frontend assets using the build script defined in package.json.
RUN npm run build

### Stage 2: CraftCMS + PHP (Base)
FROM craftcms/nginx:${php_version} as base

USER root

# Install Composer: Copy the Composer executable from the official Composer image.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install system tools like git, unzip, bash, and vim using apk (Alpine Package Keeper).
# --no-cache avoids caching package lists, reducing image size.
# mariadb-connector and mysql-client are needed to use mysqldump in the web container.
RUN apk add --no-cache git unzip bash vim mariadb-connector-c mysql-client

WORKDIR /app

# Copy the composer.json and composer.lock files to the working directory.
COPY composer.json composer.lock ./

# Install PHP dependencies using Composer, with --no-interaction, --no-dev, and --optimize-autoloader flags.
# --no-interaction: Prevents Composer from prompting for user input.
# --no-dev: Skips installing development dependencies.
# --optimize-autoloader: Improves autoloader performance.
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Copy the compiled frontend assets from the nodebuilder stage to the /app/web/dist directory.
COPY --from=nodebuilder /app/web/dist /app/web/dist

# Copy the rest of the project files (backend code) into the container.
COPY . .

# Set permissions for Craft CMS directories and .env file.
# Create the storage, cpresources, and assets directories if they don't exist.
# Change ownership of config, storage, cpresources, assets, and .env to www-data.
# Set file permissions to 775 (read, write, execute for owner and group, read and execute for others).
RUN mkdir -p /app/storage /app/web/cpresources /app/web/assets \
  && chown -R www-data:www-data /app/config /app/storage /app/web/cpresources /app/web/assets /app/.env \
  && chmod -R 775 /app/config /app/storage /app/web/cpresources /app/web/assets /app/.env

USER www-data

### Stage 3: Web (default) - runs nginx + php-fpm via supervisord
FROM base as web

### Stage 4: Queue Worker - runs craft queue/listen
FROM base as queue
ENTRYPOINT []
CMD ["php", "craft", "queue/listen", "--verbose"]
```

::

::alert{variant="note"}
I wrote [an article about Craft and Coolify](/blogs/craft-and-coolify) some time ago. That said, I rewrote the Coolify setup for this template. Craft decided to discontinue their Docker images, so I use [Server Side Up](https://serversideup.net/open-source/docker-php/) now.
::


## Conclusio

Here we go, another template that reinvents the wheel. :D Jokes aside, I think it's definitely not for every project, but a great starting point for tight budgets. For me, it's now my go-to solution for free Craft projects for my family and friends.

You can find the full template here: [Template-Simple-Craft-CMS](https://github.com/samuelreichor/Template-Simple-Craft-CMS).

Let me know what you think!

– Cheers
