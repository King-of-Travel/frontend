<div>
  <Select
    {...exclude($$props, ['value', 'defaultSelected'])}
    bind:selectedValue
  />
</div>

<script>
  import Select from 'svelte-select';
  import { exclude } from 'common/exclude';

  export let value, defaultSelected;

  let selectedValue = null;

  $: {
    if (selectedValue) {
      value = selectedValue.value;
    } else {
      value = null;
    }
  }

  selectedValue = defaultSelected;
</script>

<style>
  div {
    --height: 41px;
    --padding: 0 10px;
    --virtualListHeight: 300px;
    --inputFontSize: var(--base-h4);
    --clearSelectTop: 0;
    --clearSelectBottom: 0;
    --itemHoverBG: var(--base-hover);
    --listShadow: var(--base-box-shadow);
    --itemIsActiveBG: var(--base-accent);
    --border: var(--base-border-w) solid var(--base-accent);
    --borderRadius: var(--base-border-r);
    --borderHoverColor: var(--base-light-accent);
    --borderFocusColor: var(--base-focus);
  }

  div :global(input) {
    cursor: text !important;
  }

  div :global(.selectContainer > *) {
    height: 100% !important;
    line-height: normal !important;
  }

  div :global(.selectedItem) {
    display: flex;
    align-items: center;
  }

  div :global(.listItem .item, .clearSelect) {
    cursor: pointer;
  }
</style>
