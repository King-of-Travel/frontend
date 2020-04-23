<input {placeholder} {id} {name} bind:this="{element}" type="text" />

<script>
  import { onMount } from 'svelte';
  import flatpickr from 'flatpickr';

  export let placeholder, id, name, pickerOptions;

  let element;

  onMount(() => {
    flatpickr(element, pickerOptions);
  });
</script>

<style global>
  @import './index.css';

  input {
    position: relative;
    width: 100%;
    padding: 5px 10px;
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
  }

  input:focus,
  input:hover {
    border-color: var(--base-light-accent);
  }

  label {
    display: block;
    margin-bottom: 5px;
  }
</style>
