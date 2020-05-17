<nav>
  <TabList class="layout-navigation__container">
    <TabLink isActive="{tab === 'articles'}" href="{baseUserHref}">
      Articles
    </TabLink>
    <TabLink isActive="{tab === 'trips'}" href="{baseUserHref}/trips">
      Trips
    </TabLink>
  </TabList>
</nav>

<script>
  import { getContext } from 'svelte';

  import TabList from 'components/tab/list.svelte';
  import TabLink from 'components/tab/item/link.svelte';

  export let tab = 'articles';

  let baseUserHref = getContext('baseUserHref');
</script>

<style>
  :global(.layout-navigation__container) {
    font-size: 0.9rem;
  }
</style>
