<LayoutNavigation class="layout-navigation__container">
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
</LayoutNavigation>

<script>
  import LayoutNavigation from 'components/navigation/main-layout.svelte';

  export let tab = 'articles';
</script>

<style>
  :global(.layout-navigation__container) {
    font-size: var(--base-h5);
  }
</style>
