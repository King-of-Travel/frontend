<svelte:window on:resize="{resizeWindow}" />

{#if isDesktopVersion}
  <Desktop />
{:else}
  <Mobile />
{/if}

<script>
  import { onMount } from 'svelte';

  import Desktop from './desktop.svelte';
  import Mobile from './mobile.svelte';

  let isDesktopVersion = true;

  onMount(() => {
    resizeWindow();
  });

  function resizeWindow() {
    let windowWidth = window.innerWidth;

    isDesktopVersion = windowWidth > 940 ? true : false;
  }
</script>
