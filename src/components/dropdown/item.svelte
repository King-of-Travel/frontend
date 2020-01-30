{#if href}
  <a {href} {rel}>
    <slot />
  </a>
{:else}
  <button use:events>
    <slot />
  </button>
{/if}

<script>
  import { current_component } from 'svelte/internal';
  import { getEventsAction } from 'components/utils.js';

  export let href = '',
    rel = undefined;

  const events = getEventsAction(current_component);
</script>

<style>
  a,
  button {
    padding: 10px;
    color: var(--base-text);
    font-size: var(--base-h5);
  }

  a {
    display: block;
    text-decoration: none;
  }

  button {
    width: 100%;
    background-color: transparent;
    border: none;
    text-align: left;
  }

  a:focus,
  a:hover,
  button:focus,
  button:hover {
    background-color: var(--base-hover);
  }
</style>
