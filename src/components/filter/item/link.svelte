<li>
  <a
    {href}
    {rel}
    class:active="{isActive}"
    aria-current="{isActive ? ariaCurrent : ''}"
  >
    <slot />
  </a>
</li>

<script>
  export let href,
    isActive = false,
    rel = 'prefetch',
    ariaCurrent = 'page';
</script>
