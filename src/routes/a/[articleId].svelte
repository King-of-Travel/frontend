<svelte:head>
  <title>{article.title} / King of Travel</title>
</svelte:head>

<main class="center-content">
  <section>
    <article>
      <header>
        <div class="article-information">
          <a
            href="/users/{article.user.username}"
            rel="prefetch"
            title="Posted by"
            class="link"
          >
            {isCurrentUserAuthor ? 'You' : article.user.username}
          </a>

          <span
            title="Publication date"
            class="article-information__created-date"
          >
            {@html articleCreatedAt(article.createdAt)}
          </span>

          {#if article.countryCode}
            <div class="article-information__place">
              <span class="country">
                Country: {Countries.find(country => country.value === article.countryCode).label}
              </span>

              {#if article.city}
                <span class="city">, City: {article.city}</span>
              {/if}
            </div>
          {/if}
        </div>

        <div class="article-management">
          {#if isCurrentUserAuthor}
            <a
              href="/editor/{article.id}"
              rel="prefetch"
              class="button outlined edit"
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
      <div class="article-meta">
        <Share />
        {#if article.tags.length}
          <div class="tag-list">
            {#each article.tags as tag, i}
              <a rel="prefetch" href="tag/{tag.value}" class="tag">
                {tag.value}
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <div class="article-likes">
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
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  header {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 15px;
    font-size: var(--base-h6);
    color: var(--base-gray);
  }

  .article-information__created-date {
    margin-left: 5px;
    text-transform: lowercase;
  }

  .article-information__place {
    margin-top: 5px;
  }

  .article-management {
    text-align: end;
  }

  .article-management .button {
    padding: 5px 10px;
  }

  footer {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;
    align-items: center;
    margin-top: 15px;
  }

  .article-meta {
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    justify-content: start;
  }

  .tag {
    display: inline-block;
    background-color: transparent;
  }

  .tag:focus,
  .tag:hover {
    background-color: var(--base-hover);
  }
</style>
