<input
  {...$$props}
  on:change="{e => (type === 'file' || type === 'range') && valueUpdater(e)}"
  on:input="{e => type !== 'file' && valueUpdater(e)}"
/>

<script>
  export let value,
    type,
    files = undefined;

  function toNumber(value) {
    if (value === '') {
      const nan = new Number(Number.NaN);
      nan.length = 0;
      return nan;
    }
    return +value;
  }

  function valueUpdater(e) {
    switch (type) {
      case 'number':
      case 'range':
        value = toNumber(e.target.value);
        break;
      case 'file':
        files = e.target.files;
      // Fall through.
      default:
        value = e.target.value;
        break;
    }
  }
</script>

<style>
  input {
    width: 100%;
    position: relative;
    padding: 5px 10px;
    border: var(--base-border-w) solid var(--accent);
    border-radius: var(--base-border-r);
  }

  input:focus,
  input:hover {
    border-color: var(--base-light-accent);
  }
</style>
