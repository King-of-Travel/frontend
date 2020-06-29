<details
  bind:this="{detailsElement}"
  bind:open="{isOpenDropdown}"
  style="--width: {width}"
>
  <summary aria-label="{ariaLabel}" role="button">
    <slot name="summary" />
  </summary>
  <div class="dropdown">
    <slot />
  </div>
</details>

<script>
  import { onMount } from 'svelte';

  export let width = '190px',
    ariaLabel;

  let detailsElement;

  let isOpenDropdown = false;

  onMount(() => {
    let previousTimeout;

    function hideDropdownIfFocusOut() {
      clearTimeout(previousTimeout);

      previousTimeout = setTimeout(() => {
        if (!detailsElement.contains(document.activeElement)) {
          isOpenDropdown = false;
        }
      }, 10);
    }

    detailsElement.addEventListener('focusout', hideDropdownIfFocusOut);
  });
</script>

<style>
  div {
    position: relative;
  }

  details {
    position: relative;
  }

  summary {
    list-style: none;
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    left: auto;
    z-index: 1;
    width: var(--width);
    padding: 10px 0;
    margin-top: 5px;
    background-color: var(--base-background);
    border-radius: var(--base-border-r);
    box-shadow: var(--base-box-shadow);
  }
</style>
