---
title: GraphQL Kinda Sucks for Craft CMS
description: 'An overview about disadvantages of GraphQL and an alternative in Craft CMS projects.'
datePublished: 2025-01-11
readingTime: 5min
---

![GraphQL vs Rest API comparison](/images/bitmap/graphql-burger-comparison.webp)

Every time I have to use GraphQL to get data from a Craft CMS backend to the frontend, it feels like I'm signing up for a headache. It's like trying to untangle a bunch of cables — annoying, time-consuming, and I'm never really sure what went wrong.

But who am I to question such a highly regarded concept? Let's back up a bit. I'm primarily a Frontend Developer, and I build and maintain marketing websites for clients ranging from small businesses to big corporations. As the GraphQL headache continued to grow, I thought, "There's got to be a better way." And that's how the [Craft Query API](/libraries/craft-query-api) came to life — a Query Builder similar to what we use in Twig, but made for JavaScript frameworks. Less pain, more gain (and animations)!

## What's Wrong with GraphQL

![GraphQL vs Rest API meme](/images/bitmap/graphql-or-rest.webp)

### Soooo much boilerplate
You often end up writing a lot of boilerplate code. For each query, you need to define different schemas, create fragments to reuse parts of the queries, and handle the complexities of dynamic data fetching. On top of that, you might need to implement intricate caching strategies to optimize performance and support for previewing entries from the Craft CMS Control Panel.

### Error Handling
Error handling in GraphQL can quickly become a nightmare. In my experience, whole sites crashed because of renaming a single field handle in Craft CMS. Tools like Apollo help with error handling, but it's arguably not as easy as a REST API.

### Maintaining is Not Easy
In my opinion, refactoring a page because some of the Craft CMS fields have changed is an absolute pain. It's not as simple as swapping out a few field handles and calling it a day. It feels more like rebuilding the whole thing from scratch, especially when some messy code from earlier has made everything more complicated than it should be.

### Prop Drilling
If the architecture is not thoughtfully designed, it can lead to prop drilling everywhere. Data fetched in a parent component must be passed through multiple layers of child components.

### Learning Curve
Let's say you just want to spin up a small headless page. You have to handle all the GraphQL stuff, learn Apollo, proper error handling, and the architecture to make it maintainable. Damn, that's much. It would be great if it could be as simple as in Twig.

So, let's dig into some comparisons with the [Craft Query API](/libraries/craft-query-api).

## The solution

Instead of fighting with GraphQL's complexities, I wanted a solution that was just as powerful but without the headache.

It's a query builder similar to what you use in Twig but designed for JavaScript frameworks. With this approach, you get the same control over the data, and it feels a lot more intuitive.

With the [Craft Query API](/libraries/craft-query-api), there's no need for endless schemas or complex fragments. It handles previewing for you and it's simple to get things right.

Here is an example in Nuxt. It fetches the newest three entries from the section `news`. Similar to the craft query builder in Twig, right?

```js
const { data, error } = await useCraftQuery('entries')
  .section('news')
  .fields(['title']) // add more field handles if you like
  .limit(3)
  .all()

if (error.value) {
  console.error(error.value) // or whatever you want
}
```

All methods that you can use in the query builder are [described here](https://samuelreichor.at/libraries/js-craftcms-api/methods).

Unlike GraphQL, where prop drilling can quickly spiral out of control, the [Craft Query API](/libraries/craft-query-api) encourages cleaner, more maintainable data flow. You can connect your Nuxt pages and components directly with the entries and get access to it through props.

The only code you really need is a catch-all route in your pages' directory in Nuxt.

```vue
<script setup lang="ts">
  import { CraftNotImplemented, type Config } from 'vue-craftcms';

  // sections
  import Home from '~/templates/pages/home.vue';
  import News from '~/templates/pages/news.vue';

  // components
  import Headline from '~/templates/components/headline.vue';

  // define map for auto injecting data
  const mapping: Config = {
    pages: {
      'home': Home,
      'news': News,
    },
    components: {
      'block_imageText': CraftNotImplemented, // Just a simple component to show the response
      'block_headline': Headline,
    }
  };

  const route = useRoute()
  const uri = route.params.slug.length > 0 ? route.params.slug : '__home__';
  //get current entry based on uri
  const { data, error } = await useCraftQuery('entries').uri(uri).one() 

  // handle errors
  if(error.value) {
    console.error(error.value)
  }

  console.log(data.value)
</script>

<template>
  <div>
    <CraftPage v-if="data" :config="mapping" :content="data" />
  </div>
</template>
```

In this code, you let the [CraftPage](/libraries/vue-craftcms/components/craft-page) Component handle the heavy lifting. It renders the correct frontend template based on the section and entry type and injects the data into it as `$attrs`.

You can now easily see and access the data in the `./templates/pages/home.vue` like that if you are on the `/` route:

```vue
<template>
  <h1>Home</h1>
  <pre>
    {{ $attrs }}
  </pre>
</template>
```

Or use it as props if you define some in `./templates/pages/home.vue`:

```vue
<script setup lang="ts">
  const props = defineProps({
    metadata: {
      type: Object,
      required: true,
    },
    contentBuilder: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <CraftArea v-if="props.contentBuilder" :content="props.contentBuilder" />
  </div>
</template>
```

And what the hell is [CraftArea](/libraries/vue-craftcms/components/craft-area)? It's the same thing for components. So you could easily manage your matrix blocks with it.

And for all the TypeScript wizards out there, it's fully type-safe. Pretty cool, huh? 😎

## Conclusion

GraphQL has its place in the world, and for larger, complex projects, it can be an excellent choice. But for those of us working on smaller to medium-sized projects, especially with Craft CMS, the [Craft Query API](/libraries/craft-query-api) offers a much simpler and more efficient approach. It's less boilerplate, less headache, and a more enjoyable development experience.