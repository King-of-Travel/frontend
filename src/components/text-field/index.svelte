<div style="--accent: {error ? 'var(--base-red)' : 'var(--base-accent)'}">
  <label for="{id}">{label}</label>
  <Input {...exclude($$props, ['value', 'label', 'error'])} bind:value />
  {#if error}
    <label for="{id}" class="error">{error}</label>
  {/if}
</div>

<script>
  import { exclude } from 'common/exclude';
  import Input from './input.svelte';

  export let id,
    value,
    label,
    error = '';
</script>

<style>
  .error {
    display: block;
    padding-top: 5px;
    font-size: var(--base-h6);
    font-weight: 700;
    color: var(--base-red);
  }
</style>
