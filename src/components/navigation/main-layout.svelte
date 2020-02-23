<nav class="{className}">
  <ul>
    <slot />
  </ul>
</nav>

<script>
  export let className;
  export { className as class };
</script>

<style>
  nav {
    margin-bottom: 15px;
    border-bottom: var(--base-border-w) solid var(--base-border);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul :global(li) {
    display: inline-block;
  }

  ul :global(li > .button.outlined) {
    --border: none;
    margin-bottom: calc(var(--base-border-w) * -1);
    border-radius: 0;
  }

  ul :global(li > .button.active) {
    pointer-events: none;
    border-bottom: var(--base-border-w) solid var(--base-accent);
  }
</style>
