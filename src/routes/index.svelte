<svelte:head>
  <title>Popular daily articles</title>
</svelte:head>

<main class="center-content">
  <MainNavigation tab="articles" />
  <ArticlesList
    {defaultArticles}
    requestConfig="{{ path: 'articles/popular' }}"
  />
</main>

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
  import MainNavigation from 'components/main-navigation.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let defaultArticles;
</script>

<style>
  main {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }
</style>
