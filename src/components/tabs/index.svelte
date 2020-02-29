<ul class="{className}">
  <slot />
</ul>

<script>
  export let className = undefined;
  export { className as class };
</script>

<style>
  ul {
    margin: 0 0 15px;
    padding: 0;
    border-bottom: var(--base-border-w) solid var(--base-border);
    list-style: none;
  }

  ul :global(li) {
    display: inline-block;
  }
</style>
