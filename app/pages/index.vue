<script setup lang="ts">
  const classes = {
    label: 'bg-muted transition-color py-0.5 px-2 rounded-md hover:text- inline-flex gap-2 items-center translate-y-0.5 mr-1 mt-1'
  }

  useHead({
    title: 'Samuel Reichör | Fullstack Developer',
    meta: [
      {
        name: 'description',
        content:
          'Samuel Reichör, fullstack developer in Linz, specializing in Craft CMS, Nuxt, and modern web tools. Passionate about clean, efficient code and seamless user experiences. Connect with me for collaborations or insights on web development trends.',
      },
    ],
  })
</script>

<template>
  <NuxtLayout name="full">
    <div class="mt-4 mb-8 md:my-16 max-w-[750px]">
      <Headline text="Samuel Reichör" size="h1" />
      <div class="text-nav-node">
        <p class="mt-8 mb-6">
          Hey, I am Samuel Reichör, a fanatical full stack freelance developer. <br>
          (Or just call me Sam if that funny letter with
          the dots throws you off)
        </p>

        <p>Creator of:
          <NuxtLink href="/libraries/craft-query-api" :class="[classes.label]">
            <Icon name="craft-query-api" size="sm" /> Query API
          </NuxtLink>
          <NuxtLink href="/libraries/craft-llmify" :class="[classes.label]">
            <Icon name="craft-llmify" size="sm" /> LLMify
          </NuxtLink>
          <NuxtLink href="/libraries/craft-insights" :class="[classes.label]">
            <Icon name="craft-insights" size="sm" /> Insights
          </NuxtLink>
          <NuxtLink href="/libraries/craft-genesis" :class="[classes.label]">
            <Icon name="craft-genesis" size="sm" /> Genesis
          </NuxtLink>
          <NuxtLink href="/libraries/craft-custom-queue-manager" :class="[classes.label]">
            <Icon name="craft-custom-queue-manager" size="sm" /> Custom Queue Manager
          </NuxtLink>
        </p>

        <p>In love with:
          <NuxtLink href="https://nuxt.com/" target="_blank" :class="[classes.label]">
            <Icon name="nuxt" size="sm" /> Nuxt
          </NuxtLink>
          <NuxtLink href="https://tailwind.com/" target="_blank" :class="[classes.label]">
            <Icon name="tailwind" size="sm" /> Tailwind
          </NuxtLink>
          <NuxtLink href="https://craftcms.com/" target="_blank" :class="[classes.label]">
            <Icon name="craft" size="sm" /> Craft CMS
          </NuxtLink>
          <NuxtLink href="https://gsap.com" target="_blank" :class="[classes.label]">
            <Icon name="gsap" size="sm" class="text-[#0ae448]" /> Gsap
          </NuxtLink>
          <span :class="[classes.label]">
            <span class="h-4 w-0"></span>Many more..
          </span>
        </p>

        <p class="mt-6">
          I love turning ideas into fast, maintainable code and I care deeply about the experience people have when they use what I build. 
          Complex problems are what keep me engaged, and I'm always exploring what's new in the field.
        </p>

        <p class="mt-6">
          From time to time I write about <NuxtLink href="/blogs" target="_blank" :class="[classes.label]">things </NuxtLink>, 
          I've learned or find interesting, mostly around web development, new tools, and the occasional rabbit hole I've gone down.
        </p>

        <p class="mt-6">
          Outside of work, you'll find me on a bike, skateboard, ski or in the gym. <br>
          I'm based in Linz and always happy to meet up whether that's for a coffee, a beer, or just to talk about ideas.<br>
        </p>

        <p class="mt-6">
          If you're around, feel free to reach out!
        </p>

        <p class="mt-6">
          Find me on:
          <NuxtLink href="https://github.com/samuelreichor" target="_blank" :class="[classes.label]">
            <Icon name="github" size="sm" /> Github
          </NuxtLink>
          <NuxtLink href="https://medium.com/@Coderabbit" target="_blank" :class="[classes.label]">
            <Icon name="medium" size="sm" /> Medium
          </NuxtLink>
          <NuxtLink href="https://discordapp.com/users/samuelreichoer" target="_blank" :class="[classes.label]">
            <Icon name="discord" size="sm" /> Discord
          </NuxtLink>
        </p>
        <p class="mt-1">
          Or write an email <NuxtLink href="mailto:samuelreichor@gmail.com" :class="[classes.label]">
            <Icon name="email" size="sm" /> samuelreichoer@gmail.com
          </NuxtLink>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
