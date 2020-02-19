<svelte:head>
  <title>{article.title} / King of Travel</title>
</svelte:head>

<main class="center-content">
  <section>
    <article>
      <header>
        <div class="left-block">
          <div class="article-author">
            <a
              href="/users/{article.user.username}"
              rel="prefetch"
              title="Posted by"
              class="link"
            >
              {isCurrentUserAuthor ? 'You' : article.user.username}
            </a>

            <span title="Publication date" class="created-date">
              {@html articleCreatedAt(article.createdAt)}
            </span>
          </div>

          {#if article.countryCode}
            <div class="article-place">
              <span class="country">
                Country: {Countries.find(country => country.value === article.countryCode).label}
              </span>

              {#if article.city}
                <span class="city">, City: {article.city}</span>
              {/if}
            </div>
          {/if}
        </div>

        <div class="right-block">
          {#if isCurrentUserAuthor}
            <a
              href="/editor/{article.id}"
              rel="prefetch"
              class="button edit"
              title="Edit article"
            >
              Edit
            </a>
          {/if}
        </div>
      </header>

      <h1>{article.title}</h1>

      {@html article.body}

    </article>

    <footer>
      <div class="left-block">
        <Share />
      </div>

      <div class="right-block">
        <Likes />
      </div>
    </footer>
  </section>
</main>

<script context="module">
  export async function preload(page, session) {
    let { articleId } = page.params;

    let getArticle = await this.fetch(`/api/article?id=${articleId}`, {
      credentials: 'same-origin'
    });

    if (!getArticle.ok) return this.error(404, 'Article not found or deleted');

    let article = await getArticle.json();

    let isCurrentUserAuthor =
      article.user.id === (session.user && session.user.id);

    return {
      article,
      isCurrentUserAuthor
    };
  }
</script>

<script>
  import { setContext } from 'svelte';
  import { articleCreatedAt } from 'date-formatting';

  import Countries from 'components/locales/countries/en.json';
  import Likes from './_likes.svelte';
  import Share from './_share.svelte';

  export let article, isCurrentUserAuthor;

  setContext('article', { ...article, isCurrentUserAuthor });
</script>

<style>
  @import './_article.css';

  main {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  header {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 15px;
    font-size: var(--base-h6);
    color: var(--base-gray);
  }

  .article-author .created-date {
    margin-left: 5px;
    text-transform: lowercase;
  }

  .article-place {
    margin-top: 5px;
  }

  .right-block {
    text-align: end;
  }

  .right-block .edit {
    padding: 5px 10px;
    border: var(--base-border-w) solid var(--base-border);
    background: transparent;
  }

  .right-block .edit:focus,
  .edit:hover {
    background-color: var(--base-hover);
    border-color: var(--base-hover);
  }

  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 15px;
  }
</style>
