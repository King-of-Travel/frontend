<nav>
  <ul>
    <li>
      <a
        class:active="{tab === 'articles'}"
        tabindex="{tab === 'articles' ? -1 : 0}"
        class="button outlined"
        href="/"
      >
        Articles
      </a>
    </li>
  </ul>
</nav>

{#if tab === 'articles'}
  <ArticleFilters {filterCategory} {filterPeriodTop} {filterRatingNew} />
{/if}

<script>
  import ArticleFilters from './article-filters.svelte';

  export let tab = 'articles',
    filterCategory = 'top',
    filterPeriodTop = 'day',
    filterRatingNew = 0;
</script>

<style>
  nav {
    margin-bottom: 15px;
    border-bottom: var(--base-border-w) solid var(--base-border);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  .button.outlined {
    --border: none;
    margin-bottom: calc(var(--base-border-w) * -1);
    border-radius: 0;
  }

  .button.active {
    pointer-events: none;
    border-bottom: var(--base-border-w) solid var(--base-accent);
  }
</style>
