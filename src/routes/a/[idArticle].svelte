<svelte:head>
  <title>{article.title} / King of Travel</title>
</svelte:head>

<div class="center-content container">
  <article>
    <header>
      <div class="meta">
        <a href="/user/{article.user}" title="Posted by" class="link">
          {isCurrentUserAuthor ? 'You' : article.user}
        </a>
        <span>{articleCreatedAt(article.createdAt)}</span>
      </div>

      <h1>{article.title}</h1>
    </header>
    {@html article.body}
  </article>
</div>

<script context="module">
  export async function preload(page, session) {
    let { idArticle } = page.params;

    let getArticle = await this.fetch(`/api/article?id=${idArticle}`);
    if (!getArticle.ok) return this.error(404, 'Article not found or deleted');

    let article = await getArticle.json();

    let isCurrentUserAuthor =
      article.user === (session.user && session.user.username);

    return { article, isCurrentUserAuthor };
  }
</script>

<script>
  import { articleCreatedAt } from 'date-formatting';

  export let article, isCurrentUserAuthor;
</script>

<style>
  .container {
    margin: 10px auto;
  }

  article {
    width: 100%;
    max-width: 900px;
  }

  article :global(p:not(:last-child)) {
    padding-bottom: 15px;
  }

  header {
    margin-bottom: 20px;
  }

  .meta {
    font-size: var(--base-h6);
  }

  .meta span {
    margin-left: 5px;
    color: var(--base-gray);
    text-transform: lowercase;
  }
</style>
