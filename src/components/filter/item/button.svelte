<li>
  <button
    on:click
    disabled="{isActive}"
    aria-current="{isActive ? ariaCurrent : ''}"
  >
    <slot />
  </button>
</li>

<script>
  export let isActive = false,
    ariaCurrent = 'page';
</script>
