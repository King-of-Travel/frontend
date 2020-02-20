<svelte:head>
  <title>Change article: {article.title}</title>
</svelte:head>

<Form defaultArticle="{article}" />

<script context="module">
  export async function preload(page) {
    let articleId = page.params.articleId;

    let getArticle = await this.fetch(`/api/article/edit?id=${articleId}`, {
      credentials: 'same-origin'
    });

    if (getArticle.status === 200) {
      let article = await getArticle.json();

      return { article };
    }

    this.error(404, 'Article not found or you are not its author');
  }
</script>

<script>
  import Form from './_form/index.svelte';

  export let article;
</script>
