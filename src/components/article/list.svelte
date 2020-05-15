<div bind:this="{containerElement}" class="article-container" role="feed">
  {#each $articlesStore as article (article.id)}
    <ArticlePreview {article} class="article-preview" />
  {/each}

  {#if isLoading}
    <div class="loader" title="Download articles. Please wait">
      <Icon name="loader" />
    </div>
  {/if}
</div>

<script>
  import { onMount } from 'svelte';

  import ArticlePreview from 'components/article/preview.svelte';
  import Icon from 'components/icon.svelte';

  export let articlesStore,
    articleDownloadOptions = undefined;

  let containerElement;

  let isLoading = false;

  $: {
    if (articlesStore.isLoaded) {
      removeInfiniteScrollArticles();
    }
  }

  onMount(() => {
    document.addEventListener('scroll', infiniteScrollArticles);

    return () => {
      removeInfiniteScrollArticles();
    };
  });

  function removeInfiniteScrollArticles() {
    document.removeEventListener('scroll', infiniteScrollArticles);
  }

  function infiniteScrollArticles() {
    if (isLoading) return;

    if ($articlesStore.length < 20) removeInfiniteScrollArticles();

    let pageYoffset = window.pageYOffset + window.innerHeight;
    let containerOffset =
      containerElement.offsetTop + containerElement.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      loadingArticles();
    }
  }

  async function loadingArticles() {
    isLoading = true;

    await articlesStore.downloadFollowingArticles(articleDownloadOptions);

    isLoading = false;
  }
</script>

<style>
  .article-container :global(.article-preview:not(:last-child)) {
    margin-bottom: var(--text-side);
  }
</style>
