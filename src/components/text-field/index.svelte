<div style="--accent: {error ? 'var(--base-red)' : 'var(--base-accent)'}">
  <label for="{id}">{label}</label>
  {#if typeField === 'input'}
    <Input {...props} bind:value />
  {:else if typeField === 'select'}
    <Select {...props} bind:value />
  {/if}
  {#if error}
    <label for="{id}" class="error">{error}</label>
  {/if}
</div>

<script>
  import { exclude } from 'common/exclude';
  import Input from './input.svelte';
  import Select from './select.svelte';

  export let id,
    value,
    label,
    error = '',
    typeField = 'input';

  let props = exclude($$props, ['value', 'label', 'error', 'typeField']);
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
