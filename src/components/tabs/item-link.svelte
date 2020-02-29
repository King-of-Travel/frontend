<li>
  <a href="{isActive ? undefined : href}">
    <slot />
  </a>
</li>

<script>
  export let isActive, href;
</script>

<style>
  a {
    display: inline-block;
    padding: 10px 15px;
    margin-bottom: calc(var(--base-border-w) * -1);
    color: var(--base-text);
    font-weight: 700;
  }

  a[href]:hover,
  a[href]:focus {
    background-color: var(--base-hover);
  }

  a:not([href]) {
    border-bottom: var(--base-border-w) solid var(--base-accent);
  }
</style>
