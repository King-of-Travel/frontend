<a
  href="/a/{article.id}"
  rel="prefetch"
  class="{className}"
  title="{article.title}"
>
  <article>
    <h4>{article.title}</h4>
    <div class="meta">
      <div class="left-block">
        {#if article.user}
          <span title="Author" class="author">{article.user.username}</span>
        {/if}
        <span class="published-data" title="Publication date">
          {@html articleCreatedAt(article.createdAt)}
        </span>
      </div>
      <div class="right-block">
        <span class="likes" title="Article likes">
          <Icon size="15">
            <HeartIcon />
          </Icon>
          {article.likes || 0}
        </span>
      </div>
    </div>
  </article>
</a>

<script>
  import { articleCreatedAt } from 'date-formatting.js';

  import Icon from 'components/icon.svelte';
  import HeartIcon from 'components/icons/heart.svelte';

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
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 15px;
    align-items: center;
    margin-top: 10px;
    font-size: var(--base-h6);
    color: var(--base-gray);
  }

  .author::after {
    content: ',';
  }

  .author ~ .published-data {
    text-transform: lowercase;
  }

  .right-block {
    display: grid;
    justify-content: end;
  }

  .likes {
    display: inline-flex;
    align-items: center;
  }

  .likes :global(svg) {
    margin-right: 3px;
  }
</style>
