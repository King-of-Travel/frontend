<svelte:head>
  <title>Change article: {article.title}</title>
</svelte:head>

<Form />

<script context="module">
  export async function preload(page) {
    let articleId = page.params.articleId;

    let getArticle = await this.fetch(`/api/article/edit?id=${articleId}`, {
      credentials: 'same-origin'
    });

    if (getArticle.status === 200) {
      let articleData = await getArticle.json();

      return { articleData };
    }

    this.error(404, 'Article not found or you are not its author');
  }
</script>

<script>
  import Form from './_form/index.svelte';
  import { article } from './_stores.js';

  export let articleData;

  article.addArticleToEdit(articleData);
</script>
