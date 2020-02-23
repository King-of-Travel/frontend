<svelte:window on:scroll|passive="{handleScrollWindow}" />

{#if isButtonShown}
  <button
    on:click="{openingOrClosingCard}"
    transition:fly="{{ y: 50, duration: 500 }}"
    aria-label="Open navigation"
    class="open-navigation"
  >
    <span>
      Menu
      <Icon name="chevron-up" size="18" />
    </span>
  </button>
{/if}

<CardMenu bind:isOpen="{isOpenNavigation}" on:close="{openingOrClosingCard}">
  <div slot="header" class="header">
    <img
      slot="header"
      src="images/logo-64.png"
      alt="King of Travel Logotype"
      height="32"
      width="32"
    />
    <button aria-label="Close navigation">
      <span>
        Close
        <Icon name="chevron-up" size="18" />
      </span>
    </button>
  </div>
  <div on:click="{openingOrClosingCard}">
    <Navigation />
  </div>
</CardMenu>

<script>
  import { fly } from 'svelte/transition';

  import CardMenu from 'components/card-menu.svelte';
  import Icon from 'components/icon.svelte';
  import Navigation from 'components/navigation/mobile-navigation.svelte';

  let isOpenNavigation = false;

  function openingOrClosingCard() {
    isOpenNavigation = isOpenNavigation ? false : true;
  }

  let isButtonShown = true;

  let lastScroll = 0;

  function handleScrollWindow() {
    let scroll = window.pageYOffset;

    isButtonShown = scroll < 50 || scroll < lastScroll;

    lastScroll = scroll;
  }
</script>

<style>
  button {
    padding: 0;
    background-color: var(--base-background);
    border: none;
    z-index: 100;
  }

  button > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  button > span :global(svg) {
    margin-left: 3px;
  }

  button.open-navigation {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: end;
    border-top: 1px solid var(--base-border);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    will-change: transform;
  }

  @media (--mobile) {
    button.open-navigation {
      display: block;
    }
  }

  .header {
    display: grid;
    grid-template-columns: 32px auto;
    justify-content: space-between;
    align-items: center;
  }
</style>
