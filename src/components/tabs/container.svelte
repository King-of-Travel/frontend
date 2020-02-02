<Tabs>
  <slot />
</Tabs>

<script>
  import { Tabs } from 'svelte-tabs';
</script>

<style>
  :global(.svelte-tabs > .svelte-tabs__tab-list) {
    border-bottom: var(--base-border-w) solid var(--base-border);
  }

  :global(.svelte-tabs li.svelte-tabs__tab) {
    margin-bottom: calc(var(--base-border-w) * -1);
    font-size: var(--base-h5);
    color: var(--base-text);
  }

  :global(.svelte-tabs li.svelte-tabs__tab[aria-selected='true']) {
    color: var(--base-active);
    border-bottom: var(--base-border-w) solid var(--base-active);
  }

  :global(.svelte-tabs div.svelte-tabs__tab-panel) {
    margin-top: 15px;
  }
</style>
