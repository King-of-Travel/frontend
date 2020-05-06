<svelte:head>
  <title>The best articles of the month</title>
</svelte:head>

<MainNavigation tab="articles" filterPeriodTop="month" />
<ArticlesList
  {articles}
  requestConfig="{{ path: 'articles/popular', query: 'period=month' }}"
/>

<script context="module">
  export async function preload() {
    let getArticles = await this.fetch('/api/articles/popular?period=month');

    let articles = await getArticles.json();

    return {
      articles
    };
  }
</script>

<script>
  import MainNavigation from 'components/navigation/main/index.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let articles;
</script>
