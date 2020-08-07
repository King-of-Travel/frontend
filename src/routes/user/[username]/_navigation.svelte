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
  import TabList from 'components/tab/list.svelte';
  import TabLink from 'components/tab/item/link.svelte';

  import { userStore } from './_stores';

  export let tab = 'articles';

  $: baseUserHref = `user/${$userStore.username}`;
</script>

<style>
  :global(.layout-navigation__container) {
    font-size: 0.9rem;
  }
</style>
