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
    cursor: pointer;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: auto;
    right: 0;
    width: var(--width);
    z-index: 100;
    margin-top: 5px;
    padding: 10px 0;
    background-color: var(--base-background);
    box-shadow: var(--base-box-shadow);
    border-radius: var(--base-border-r);
  }
</style>
