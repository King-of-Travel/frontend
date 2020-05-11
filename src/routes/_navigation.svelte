<nav>
  <Tabs>
    <TabItem isActive="{tab === 'articles'}" href="/">Articles</TabItem>
  </Tabs>
</nav>

{#if tab === 'articles'}
  <ArticleFilters />
{/if}

<script>
  import ArticleFilters from './_navigation-filters.svelte';
  import Tabs from 'components/tabs/index.svelte';
  import TabItem from 'components/tabs/item-link.svelte';

  export let tab = 'articles';
</script>
