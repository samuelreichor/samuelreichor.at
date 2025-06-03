<script setup lang="ts">
  import PageHome from '~/templates/pages/home.vue';
  import PageNews from '~/templates/pages/news.vue';

  import BlockImageText from '~/templates/blocks/imageText.vue'
  import BlockHeadline from '~/templates/blocks/headline.vue'

  const mapping = {
    pages: {
      'home': PageHome,
      'news': PageNews,
    },
    components: {
      'imageText': BlockImageText,
      'headline': BlockHeadline,
    }
  };

 
  const route = useRoute()
  const { data, error } = await useCraftQuery('entries').uri(route.path).one()

  console.log(data.value)
</script>



