<svelte:head>
  <title>Profile: {$user.username} / Top articles</title>
</svelte:head>

<MainNavigation tab="articles" />

<ArticlesList
  {articles}
  requestConfig="{{ path: 'user/articles', query: `username=${$user.username}` }}"
/>

<script context="module">
  export async function preload(page) {
    let { username } = page.params;

    let getArticles = await this.fetch(
      `/api/user/articles?username=${username}&limit=10`
    );

    let articles = await getArticles.json();

    return {
      articles
    };
  }
</script>

<script>
  import MainNavigation from './_navigation.svelte';
  import ArticlesList from 'components/article/list.svelte';
  import { user } from './_stores.js';

  export let articles;
</script>
