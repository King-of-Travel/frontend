<svelte:head>
  <title>Top articles, rating {top} and more</title>
</svelte:head>

<MainNavigation tab="articles" filterCategory="new" filterRatingNew="{+top}" />
<ArticlesList
  {articles}
  requestConfig="{{ path: 'articles/new', query: `top=${top}` }}"
/>

<script context="module">
  export async function preload(page) {
    let top = page.params.top;

    let getArticles = await this.fetch(`/api/articles/new?top=${top}`);

    let articles = await getArticles.json();

    return {
      top,
      articles
    };
  }
</script>

<script>
  import MainNavigation from 'components/navigation/main.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let top, articles;
</script>
