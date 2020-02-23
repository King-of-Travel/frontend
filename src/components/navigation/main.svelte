<MainLayout>
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
</MainLayout>

{#if tab === 'articles'}
  <ArticleFilters {filterCategory} {filterPeriodTop} {filterRatingNew} />
{/if}

<script>
  import ArticleFilters from './article-filters.svelte';
  import MainLayout from './main-layout.svelte';

  export let tab = 'articles',
    filterCategory = 'top',
    filterPeriodTop = 'day',
    filterRatingNew = 0;
</script>
