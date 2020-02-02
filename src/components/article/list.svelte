<svelte:window
  on:scroll="{infiniteScrollArticles({
    containerElement,
    callback: loadingArticles,
    countLinks: articles.count,
    countLinksUploaded,
    isLoading
  })}"
/>

<div bind:this="{containerElement}" class="container" role="feed">
  {#each articles.list as article (article.id)}
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
  import { infiniteScrollArticles } from 'articles.js';
  import { request } from 'api.js';

  import ArticlePreview from 'components/article/preview.svelte';
  import Icon from 'components/icon.svelte';
  import LoaderIcon from 'components/icons/loader.svelte';

  export let defaultArticles, requestConfig;

  let containerElement;

  let articles = defaultArticles,
    countLinksUploaded = articles.list.length,
    isLoading = false;

  async function loadingArticles() {
    isLoading = true;

    let query = `?${requestConfig.query}&limit=30&offset=${countLinksUploaded}`;
    let getArticles = await request('GET', `${requestConfig.path}${query}`);

    let newArticles = getArticles.data.list;

    articles.list.push(...newArticles);
    countLinksUploaded += newArticles.length;

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
