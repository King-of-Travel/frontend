<button
  on:click="{() => (isShowMenu = !isShowMenu)}"
  title="Click to open the trip management menu."
  type="button"
  class="button"
>
  <Item
    {...exclude($$props, ['deleteTrip'])}
    active="{isShowMenu}"
    className="trips-item__container"
  >
    {#if isShowMenu}
      <div transition:fly="{{ x: 100, duration: 200 }}" class="control-menu">
        {#if isLoading}
          <Icon name="loader" />
        {:else}
          <button
            on:click|stopPropagation="{deleteTrip}"
            type="button"
            title="Delete trip"
            class="delete"
          >
            <Icon name="trash" />
          </button>
        {/if}
      </div>
    {/if}
  </Item>
</button>

<script>
  import { fly } from 'svelte/transition';
  import { exclude } from 'common/exclude';

  import Item from './item.svelte';
  import Icon from 'components/icon.svelte';

  export let deleteTrip;

  let isShowMenu = false;

  let isLoading = false;
</script>

<style>
  .button {
    --background: none;

    padding: 0;
  }

  .button:hover,
  .button:focus {
    --background: none;
  }

  .button:hover :global(.trips-item__container),
  .button:focus :global(.trips-item__container) {
    background-color: var(--base-hover);
    border-color: var(--base-hover);
  }

  .control-menu {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    height: 100%;
    box-shadow: var(--base-box-shadow);
  }

  .control-menu button {
    padding: 10px 30px;
    background: var(--base-background);
    border: none;
  }

  button.delete:focus,
  button.delete:hover {
    color: var(--base-red);
  }
</style>
