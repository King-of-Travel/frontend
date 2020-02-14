<svelte:head>
  <title>The best articles of the month</title>
</svelte:head>

<MainNavigation tab="articles" filterPeriod="month" />
<ArticlesList
  {defaultArticles}
  requestConfig="{{ path: 'articles/popular', query: 'period=month' }}"
/>

<script context="module">
  export async function preload() {
    let getArticles = await this.fetch('/api/articles/popular?period=month');

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
