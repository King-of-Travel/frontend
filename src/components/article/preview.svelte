<a
  href="/a/{article.id}"
  rel="prefetch"
  class="{className}"
  title="{article.title}"
>
  <article>
    <h4>{article.title}</h4>
    <div class="meta">
      <div class="published-data" title="Publication date">
        Published:
        {@html articleCreatedAt(article.createdAt)}
      </div>
    </div>
  </article>
</a>

<script>
  import { articleCreatedAt } from 'date-formatting.js';

  export let article, className;
  export { className as class };
</script>

<style>
  a {
    display: block;
    width: 100%;
    padding: 15px;
    border: var(--base-border-w) solid var(--base-border);
    border-radius: var(--base-border-r);
    color: var(--base-title);
    text-decoration: none;
    transition: all 0.2s;
  }

  a:focus,
  a:hover {
    box-shadow: var(--base-box-shadow);
    transform: scale(1.03);
  }

  .meta {
    margin-top: 10px;
  }

  .published-data {
    font-size: var(--base-h6);
    color: var(--base-gray);
  }
</style>
