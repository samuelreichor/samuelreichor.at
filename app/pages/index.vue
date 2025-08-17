<script setup lang="ts">
  const classes = {
    label: 'bg-muted transition-color py-0.5 px-2 rounded-md hover:text- inline-flex gap-2 items-center translate-y-0.5 mr-1 mt-1'
  }

  useHead({
    title: 'Samuel Reichör | Frontend Developer',
    meta: [
      {
        name: 'description',
        content:
          'Samuel Reichör, frontend developer in Linz, specializing in Craft CMS, Nuxt, and modern web tools. Passionate about clean, efficient code and seamless user experiences. Connect with me for collaborations or insights on web development trends.',
      },
    ],
  })
</script>

<template>
  <NuxtLayout name="full">
    <div class="mt-4 mb-8 md:my-16 max-w-[750px]">
      <Headline text="Samuel Reichör" size="h1" />
      <div class="text-nav-node">
        <p class="mt-8">
          Hey, I am Samuel Reichör, a fanatical frontend developer. <br>
          You can just call me Sam if that funny letter with
          the dots throws you off!
        </p>
        <p class="mt-6">Working at:
          <NuxtLink href="https://fredmansky.at" target="_blank" :class="classes.label">
            <Icon name="fredmansky" size="sm" /> Fredmansky
          </NuxtLink>
        </p>

        <p>Creator of:
          <NuxtLink href="/libraries/craft-query-api" :class="[classes.label]">
            <Icon name="craft-query-api" size="sm" /> Craft Query API
          </NuxtLink>
          <NuxtLink href="/libraries/js-craftcms-api" :class="[classes.label]">
            <Icon name="ts" size="sm" /> @query-api/js
          </NuxtLink>
          <NuxtLink href="/libraries/nuxt-craftcms" :class="[classes.label]">
            <Icon name="nuxt" size="sm" /> @query-api/nuxt
          </NuxtLink>
          <NuxtLink href="/libraries/query-api-next" :class="[classes.label]">
            <Icon name="next" size="sm" /> @query-api/next
          </NuxtLink>
          <NuxtLink href="/libraries/craft-llmify" :class="[classes.label]">
            <Icon name="craft-llmify" size="sm" /> Craft LLMify
          </NuxtLink>
        </p>

        <p>In love with:
          <NuxtLink href="https://nuxt.com/" target="_blank" :class="[classes.label]">
            <Icon name="nuxt" size="sm" /> Nuxt
          </NuxtLink>
          <NuxtLink href="https://tailwind.com/" target="_blank" :class="[classes.label]">
            <Icon name="tailwind" size="sm" /> Tailwind
          </NuxtLink>
          <NuxtLink href="https://www.typescriptlang.org/" target="_blank" :class="[classes.label]">
            <Icon name="ts" size="sm" /> Types
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
          Passionate about crafting seamless user experiences, I thrive on bringing designs to life through clean and
          efficient code. I enjoy solving complex challenges and staying updated with the latest technologies
          to deliver visually appealing and high-performing websites.
        </p>

        <p class="mt-6">
          I love sharing my insights through
          <NuxtLink href="https://medium.com/@samuelreichor" target="_blank" :class="[classes.label]">blogs </NuxtLink>,
          focusing on the latest trends and best practices in web development.
        </p>

        <p class="mt-6">
          Outside of programming, I love traveling and skateboarding. Based in Linz, I'm always open to
          connecting whether it's for a coffee, a beer or a chance to collaborate. Feel free to reach out if you're in
          the area :)
        </p>

        <p class="mt-6">
          Find me on:
          <NuxtLink href="https://github.com/samuelreichor" target="_blank" :class="[classes.label]">
            <Icon name="github" size="sm" /> Github
          </NuxtLink>
          <NuxtLink href="https://medium.com/@samuelreichor" target="_blank" :class="[classes.label]">
            <Icon name="medium" size="sm" /> Medium
          </NuxtLink>
          <NuxtLink href="https://discordapp.com/users/samuelreichoer" target="_blank" :class="[classes.label]">
            <Icon name="discord" size="sm" /> Discord
          </NuxtLink>
        </p>

        <p class="mt-1">
          Or write an email <NuxtLink href="mailto:samuelreichor@gmail.at" :class="[classes.label]">
            <Icon name="email" size="sm" /> samuelreichoer@gmail.com
          </NuxtLink>
        </p>

      </div>
    </div>
  </NuxtLayout>
</template>