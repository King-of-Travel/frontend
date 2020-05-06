<svelte:head>
  <title>Top articles</title>
</svelte:head>

<MainNavigation tab="articles" filterCategory="new" />
<ArticlesList {articles} requestConfig="{{ path: 'articles/new' }}" />

<script context="module">
  export async function preload() {
    let getArticles = await this.fetch('/api/articles/new');

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
