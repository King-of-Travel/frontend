<nav>
  <Tabs>
    <TabItem isActive="{tab === 'articles'}" href="/">Articles</TabItem>
  </Tabs>
</nav>

{#if tab === 'articles'}
  <ArticleFilters {filterCategory} {filterPeriodTop} {filterRatingNew} />
{/if}

<script>
  import ArticleFilters from './filters.svelte';
  import Tabs from 'components/tabs/index.svelte';
  import TabItem from 'components/tabs/item-link.svelte';

  export let tab = 'articles',
    filterCategory = 'top',
    filterPeriodTop = 'day',
    filterRatingNew = 0;
</script>
