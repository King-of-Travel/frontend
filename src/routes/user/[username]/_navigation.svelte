<nav>
  <Tabs class="layout-navigation__container">
    <TabItem isActive="{tab === 'articles'}" href="{baseUserHref}">
      Articles
    </TabItem>
    <TabItem isActive="{tab === 'trips'}" href="{baseUserHref}/trips">
      Trips
    </TabItem>
  </Tabs>
</nav>

<script>
  import { getContext } from 'svelte';

  import Tabs from 'components/tabs/index.svelte';
  import TabItem from 'components/tabs/item-link.svelte';

  export let tab = 'articles';

  let baseUserHref = getContext('baseUserHref');
</script>

<style>
  :global(.layout-navigation__container) {
    font-size: 0.9rem;
  }
</style>
