<li>
  <a
    href="{isActive ? undefined : href}"
    aria-current="{isActive ? ariaCurrent : ''}"
  >
    <slot />
  </a>
</li>

<script>
  export let isActive,
    href,
    ariaCurrent = 'page';
</script>

<style>
  a {
    display: inline-block;
    padding: 10px 15px;
    margin-bottom: calc(var(--base-border-w) * -1);
    font-weight: 700;
    color: var(--base-text);
  }

  a[href]:hover,
  a[href]:focus {
    background-color: var(--base-hover);
  }

  a:not([href]) {
    border-bottom: var(--base-border-w) solid var(--base-accent);
  }
</style>
