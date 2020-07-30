{#if $articlesStore.articles.length}
  <div bind:this="{containerElement}" class="article-container" role="feed">
    {#each $articlesStore.articles as article (article.id)}
      <ArticlePreview {article} class="article-preview" />
    {/each}

    {#if $articlesStore.isLoading}
      <div class="loader" title="Download articles. Please wait">
        <Icon name="loader" />
      </div>
    {/if}
  </div>
{:else}
  <ListFallback />
{/if}

<script>
  import { onMount } from 'svelte';

  import ArticlePreview from 'components/article/preview.svelte';
  import Icon from 'components/icon.svelte';
  import ListFallback from './list-fallback.svelte';

  export let articlesStore,
    articleDownloadOptions = undefined;

  let containerElement;

  $: {
    if ($articlesStore.isLoaded && containerElement) {
      removeInfiniteScrollArticles();
    }
  }

  onMount(() => {
    if (!containerElement) return;

    document.addEventListener('scroll', infiniteScrollArticles);

    return () => {
      removeInfiniteScrollArticles();
    };
  });

  function infiniteScrollArticles() {
    if ($articlesStore.isLoading) return;

    let pageYoffset = window.pageYOffset + window.innerHeight;
    let containerOffset =
      containerElement.offsetTop + containerElement.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      articlesStore.downloadFollowingArticles(articleDownloadOptions);
    }
  }

  function removeInfiniteScrollArticles() {
    document.removeEventListener('scroll', infiniteScrollArticles);
  }
</script>

<style>
  .article-container :global(.article-preview:not(:last-child)) {
    margin-bottom: var(--text-side);
  }
</style>
