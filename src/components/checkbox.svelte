<span>
  <input bind:checked {name} {id} type="checkbox" tabindex="-1" />
  <label for="{id}" tabindex="0" use:enter="{keystroke}">
    <i>
      {#if checked}
        <Icon name="check" size="16" />
      {/if}
    </i>
    {label}
  </label>
</span>

<script>
  import Icon from './icon.svelte';

  export let checked, id, name, label;

  function keystroke() {
    checked = !checked;
  }

  function enter(node, callback) {
    function onkeydown(event) {
      if (event.which === 13) callback(node);
    }

    node.addEventListener('keydown', onkeydown);

    return {
      destroy() {
        node.removeEventListener('keydown', onkeydown);
      }
    };
  }
</script>

<style>
  span {
    position: relative;
    vertical-align: baseline;
    /* height icon + border */
    height: 40px;
    line-height: 40px;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
  }

  label {
    position: relative;
    display: block;
    padding-left: calc(20px + 5px);
    cursor: pointer;
    user-select: none;
  }

  label:active > i {
    transform: scale(0.9);
    transition: transform 0.1s;
  }

  i {
    position: absolute;
    top: 10px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
    color: var(--base-accent);
  }
</style>
