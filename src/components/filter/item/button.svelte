<li>
  <button
    on:click
    disabled="{isActive}"
    aria-current="{isActive ? ariaCurrent : ''}"
    class="button"
  >
    <slot />
  </button>
</li>

<script>
  export let isActive = false,
    ariaCurrent = 'page';
</script>

<style>
  button {
    --background: none;

    padding: 9px;
    font-weight: 600;
    border-radius: 0;
  }

  button:disabled {
    --background: var(--base-accent);
  }

  button:not(:disabled):hover,
  button:not(:disabled):focus {
    --background: var(--base-hover) !important;
  }
</style>
