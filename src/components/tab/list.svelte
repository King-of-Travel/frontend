<ul class="{className}">
  <slot />
</ul>

<script>
  export let className = undefined;
  export { className as class };
</script>

<style>
  ul {
    padding: 0;
    list-style: none;
    border-bottom: var(--base-border-w) solid var(--base-border);
  }

  ul :global(li) {
    display: inline-block;
  }
</style>
