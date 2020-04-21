<details bind:this="{detailsElement}" style="--width: {width}" bind:open>
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

  let open = false;

  onMount(() => {
    let previousTimeout;

    detailsElement.addEventListener('focusout', () => {
      clearTimeout(previousTimeout);
      previousTimeout = setTimeout(() => {
        if (!detailsElement.contains(document.activeElement)) {
          open = false;
        }
      }, 10);
    });
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
    z-index: 100;
    width: var(--width);
    padding: 10px 0;
    margin-top: 5px;
    background-color: var(--base-background);
    border-radius: var(--base-border-r);
    box-shadow: var(--base-box-shadow);
  }
</style>
