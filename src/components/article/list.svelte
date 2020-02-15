<div bind:this="{containerElement}" class="container" role="feed">
  {#each articles as article (article.id)}
    <ArticlePreview {article} class="article-preview" />
  {/each}

  {#if isLoading}
    <div class="loader" title="Download articles. Please wait">
      <Icon>
        <LoaderIcon />
      </Icon>
    </div>
  {/if}
</div>

<script>
  import { onMount } from 'svelte';
  import { request } from 'api.js';

  import ArticlePreview from 'components/article/preview.svelte';
  import Icon from 'components/icon.svelte';
  import LoaderIcon from 'components/icons/loader.svelte';

  export let articles = [],
    requestConfig;

  let containerElement;

  let isLoading = false;

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

    if (articles.length < 20) removeInfiniteScrollArticles();

    let pageYoffset = window.pageYOffset + window.innerHeight;
    let containerOffset =
      containerElement.offsetTop + containerElement.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      loadingArticles();
    }
  }

  async function loadingArticles() {
    isLoading = true;

    let query = `?${requestConfig.query}&offset=${articles.length}`;
    let getArticles = await request('GET', `${requestConfig.path}${query}`);

    let newArticles = getArticles.data;

    articles.push(...newArticles);

    if (newArticles.length < 20) {
      removeInfiniteScrollArticles();
    }

    isLoading = false;
  }
</script>

<style>
  .container :global(.article-preview:not(:last-child)) {
    margin-bottom: 15px;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
