<svelte:head>
  <title>The best articles of the day</title>
</svelte:head>

<MainNavigation tab="articles" />
<ArticlesList {articles} requestConfig="{{ path: 'articles/popular' }}" />

<script context="module">
  export async function preload() {
    let getArticles = await this.fetch('/api/articles/popular');

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
