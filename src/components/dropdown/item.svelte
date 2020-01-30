{#if href}
  <a {href} {rel}>
    <slot />
  </a>
{:else}
  <slot />
{/if}

<script>
  export let href,
    rel = undefined;
</script>

<style>
  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: var(--base-text);
    font-size: var(--base-h5);
  }

  a:focus,
  a:hover {
    background-color: var(--base-hover);
  }
</style>
