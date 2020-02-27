<LayoutNavigation class="layout-navigation__container">
  <li>
    <a
      class:active="{tab === 'articles'}"
      tabindex="{tab === 'articles' ? -1 : 0}"
      class="button outlined"
      href="{baseUserHref}"
    >
      Articles
    </a>
  </li>
  <li>
    <a
      class:active="{tab === 'trips'}"
      tabindex="{tab === 'trips' ? -1 : 0}"
      class="button outlined"
      href="{baseUserHref}/trips"
    >
      Trips
    </a>
  </li>
</LayoutNavigation>

<script>
  import { getContext } from 'svelte';

  import LayoutNavigation from 'components/navigation/main-layout.svelte';

  export let tab = 'articles';

  let baseUserHref = getContext('baseUserHref');
</script>

<style>
  :global(.layout-navigation__container) {
    font-size: var(--base-h5);
  }
</style>
