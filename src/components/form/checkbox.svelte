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

    /* height icon + border */
    height: 40px;
    line-height: 40px;
    vertical-align: baseline;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
  }

  label {
    position: relative;
    display: block;
    padding-left: calc(20px + 5px);
    cursor: pointer;
    user-select: none;
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
    color: var(--base-accent);
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
    transition: transform 0.1s;
  }

  label:active > i {
    transform: scale(0.9);
  }
</style>
