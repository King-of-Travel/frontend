<div style="--accent: {error ? 'var(--base-red)' : 'var(--base-accent)'}">
  <label for="{id}">{label}</label>
  <svelte:component this="{component}" {...props} bind:value>
    <slot />
  </svelte:component>
  {#if error}
    <label for="{id}" class="error">{error}</label>
  {/if}
</div>

<script>
  import { exclude } from 'common/exclude';
  import Input from './input.svelte';

  export let value = undefined,
    component = Input,
    id,
    error = '',
    label;

  let props = exclude($$props, ['value', 'label', 'error', 'component']);
</script>

<style>
  label {
    display: block;
    margin-bottom: 5px;
  }

  .error {
    padding-top: 5px;
    font-size: var(--base-h6);
    font-weight: 700;
    color: var(--base-red);
  }
</style>
