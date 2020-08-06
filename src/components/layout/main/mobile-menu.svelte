<svelte:window on:scroll|passive="{handleScrollWindow}" />

{#if isButtonShown}
  <button
    on:click="{openingOrClosingCard}"
    transition:fly="{{ y: 50, duration: 500 }}"
    aria-controls="mobile-menu"
    aria-expanded="{isOpenNavigation ? true : false}"
    class="open-navigation"
  >
    <span>
      Menu
      <Icon name="chevron-up" size="18" />
    </span>
  </button>
{/if}

<CardMenu
  on:closeMenu="{openingOrClosingCard}"
  bind:isOpenMenu="{isOpenNavigation}"
>
  <div slot="header" class="header">
    <img
      src="images/logo-64.png"
      alt="King of Travel Logotype"
      height="32"
      width="32"
    />
    <button aria-controls="mobile-menu" aria-expanded="true">
      <span>
        Close
        <Icon name="chevron-down" size="18" />
      </span>
    </button>
  </div>
  <div on:click="{openingOrClosingCard}">
    <MobileNavigation />
  </div>
</CardMenu>

<script>
  import { fly } from 'svelte/transition';
  import { fragment } from 'navigation/fragment';

  import CardMenu from 'components/card-menu.svelte';
  import Icon from 'components/icon.svelte';
  import MobileNavigation from './mobile-navigation.svelte';

  $: isOpenNavigation = $fragment === '#mobile-navigation';

  function openingOrClosingCard() {
    $fragment = isOpenNavigation ? '' : '#mobile-navigation';
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
    z-index: 100;
    padding: 0;
    background-color: var(--base-background);
    border: none;
  }

  button > span {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  button > span :global(svg) {
    margin-left: 3px;
  }

  button.open-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    text-align: end;
    border-top: 1px solid var(--base-border);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  @media (--mobile) {
    button.open-navigation {
      display: block;
    }
  }

  .header {
    display: grid;
    grid-template-columns: 32px auto;
    align-items: center;
    justify-content: space-between;
  }
</style>
