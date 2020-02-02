<svelte:head>
  <title>{article.title} / King of Travel</title>
</svelte:head>

<main class="center-content">
  <article>
    <header class="block">
      <div class="meta">
        <a
          href="/users/{article.user}"
          rel="prefetch"
          title="Posted by"
          class="link"
        >
          {isCurrentUserAuthor ? 'You' : article.user}
        </a>
        <span title="Publication date">
          {@html articleCreatedAt(article.createdAt)}
        </span>
      </div>

      <h1>{article.title}</h1>
    </header>
    {@html article.body}
  </article>
</main>

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
  @import './_article.css';

  main {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  .meta {
    font-size: var(--base-h6);
    margin-bottom: 5px;
  }

  .meta span {
    margin-left: 5px;
    color: var(--base-gray);
    text-transform: lowercase;
  }
</style>
