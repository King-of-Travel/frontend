<div>
  <Select
    {inputAttributes}
    {...exclude($$props, ['value', 'id', 'name'])}
    bind:selectedValue
  />
</div>

<script>
  import Select from 'svelte-select';
  import { exclude } from 'common/exclude';

  export let value, inputAttributes;

  let selectedValue = undefined;

  $: value = selectedValue ? selectedValue.value : null;
</script>

<style>
  div {
    --height: 41px;
    --padding: 0 10px;
    --borderHoverColor: var(--base-light-accent);
    --borderFocusColor: var(--base-accent);
    --virtualListHeight: 300px;
    --listShadow: 0 0px 30px 0 rgba(44, 62, 80, 0.24);
    --itemIsActiveBG: var(--base-accent);
    --border: var(--base-border-w) solid var(--base-accent);
    --borderRadius: var(--base-border-r);
    --inputFontSize: var(--base-h4);
    --clearSelectTop: 0;
    --clearSelectBottom: 0;
  }

  :global(.selectContainer > *) {
    height: 100% !important;
    line-height: normal !important;
  }

  :global(.selectContainer > .selectedItem) {
    display: flex;
    align-items: center;
  }

  :global(.selectContainer > input) {
    cursor: text !important;
  }

  :global(.selectContainer > .listItem, .selectContainer > .clearSelect) {
    cursor: pointer;
  }
</style>
