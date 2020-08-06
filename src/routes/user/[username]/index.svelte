<svelte:head>
  <title>Articles / Profile: {$user.username}</title>
</svelte:head>

<section>
  <MainNavigation tab="articles" />

  <ArticlesList
    {articlesStore}
    articleDownloadOptions="{{ username: $user.username }}"
  />
</section>

<script context="module">
  import { queryToGetNewArticle, articlesStore, user } from './_stores.js';

  export async function preload(page) {
    let { username } = page.params;

    let getArticles = await this.fetch(
      `/api/${queryToGetNewArticle({ username })}`
    );

    let defaultArticles = await getArticles.json();

    return {
      defaultArticles
    };
  }
</script>

<script>
  import ArticlesList from 'components/article/list.svelte';

  import MainNavigation from './_navigation.svelte';

  export let defaultArticles;

  $: {
    articlesStore.reset();
    articlesStore.addArticles(defaultArticles);
  }
</script>

<style>
  section {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    gap: var(--text-side);
  }
</style>
