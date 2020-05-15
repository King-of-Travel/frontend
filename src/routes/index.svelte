<svelte:head>
  <title>The best articles of the week</title>
</svelte:head>

<main class="center-content">
  <MainNavigation />

  <ArticlesList
    {articlesStore}
    articleDownloadOptions="{{ query: $page.query }}"
  />
</main>

<script context="module">
  import {
    queryToGetTopArticle,
    queryToGetNewArticle,
    articlesStore
  } from './_stores.js';

  export async function preload({ query: { sort, rating, period } }) {
    let getArticles = await this.fetch(
      `api/${
        sort === 'new'
          ? queryToGetNewArticle({ rating })
          : queryToGetTopArticle({ period })
      }`
    );

    let defaultArticles = await getArticles.json();

    return {
      defaultArticles
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';

  import MainNavigation from './_navigation.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let defaultArticles;

  let { page } = stores();

  $: {
    articlesStore.reset();
    articlesStore.addArticles(defaultArticles);
  }
</script>

<style>
  main {
    display: grid;
    grid-template-rows:
      repeat(2, min-content)
      1fr;
    gap: var(--text-side);
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
</style>
