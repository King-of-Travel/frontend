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
    font-size: 0.9rem;
    color: var(--base-text);
  }

  a {
    display: block;
    text-decoration: none;
  }

  button {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
  }

  a:focus,
  a:hover,
  button:focus,
  button:hover {
    background-color: var(--base-hover);
  }
</style>
