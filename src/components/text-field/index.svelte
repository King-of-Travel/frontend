<div style="--accent: {error ? 'var(--base-red)' : 'var(--base-accent)'}">
  <label for="{id}">{label}</label>
  <slot />
  {#if error}
    <label for="{id}" class="error">{error}</label>
  {/if}
</div>

<script>
  export let id,
    error = '',
    label;
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
