<svelte:head>
  <title>The best articles of the week</title>
</svelte:head>

<main class="center-content">
  <MainNavigation tab="articles" filterPeriodTop="week" />
  <ArticlesList
    {articles}
    requestConfig="{{ path: 'articles/popular', query: 'period=week' }}"
  />
</main>

<script context="module">
  export async function preload() {
    let getArticles = await this.fetch('/api/articles/popular?period=week');

    let articles = await getArticles.json();

    return {
      articles
    };
  }
</script>

<script>
  import MainNavigation from 'components/navigation/main.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let articles;
</script>

<style>
  main {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
</style>
