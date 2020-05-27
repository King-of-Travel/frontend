<svelte:head>
  <title>#{tagName} / Search by tag</title>
</svelte:head>

<main class="center-content">
  <h1>#{tagName}</h1>

  <ArticleFilters />

  <ArticlesList {articlesStore} articleDownloadOptions="{{ tagName }}" />
</main>

<script context="module">
  import { queryFollowingArticles, articlesStore } from './_stores.js';

  export async function preload({
    query: { sort, rating, period },
    params: { tagName }
  }) {
    let getArticles = await this.fetch(
      `api/${queryFollowingArticles({
        tagName,
        sort,
        rating,
        period
      })}`
    );

    let defaultArticles = await getArticles.json();

    return { defaultArticles, tagName };
  }
</script>

<script>
  import ArticlesList from 'components/article/list.svelte';
  import ArticleFilters from './_article-filters.svelte';

  export let tagName, defaultArticles;

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
