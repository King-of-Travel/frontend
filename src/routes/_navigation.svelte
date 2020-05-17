<nav>
  <TabList>
    <TabLink isActive="{tab === 'articles'}" href="/">Articles</TabLink>
  </TabList>
</nav>

{#if tab === 'articles'}
  <ArticleFilters />
{/if}

<script>
  import ArticleFilters from './_navigation-filters.svelte';
  import TabList from 'components/tab/list.svelte';
  import TabLink from 'components/tab/item/link.svelte';

  export let tab = 'articles';
</script>
