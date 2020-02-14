<svelte:head>
  <title>The best articles of the day</title>
</svelte:head>

<MainNavigation tab="articles" />
<ArticlesList
  {defaultArticles}
  requestConfig="{{ path: 'articles/popular' }}"
/>

<script context="module">
  export async function preload() {
    let getArticles = await this.fetch('/api/articles/popular');

    let defaultArticles = await getArticles.json();

    return {
      defaultArticles
    };
  }
</script>

<script>
  import MainNavigation from 'components/navigation/main.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let defaultArticles;
</script>
