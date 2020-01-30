<svelte:window on:resize="{resizeWindow}" />

{#if isDesktopVersion}
  <Desktop {user} />
{:else}
  <Mobile {user} />
{/if}

<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';

  import Desktop from './desktop.svelte';
  import Mobile from './mobile.svelte';

  let { session } = stores();

  $: user = $session.user;

  let isDesktopVersion = true;

  onMount(() => {
    resizeWindow();
  });

  function resizeWindow() {
    let windowWidth = window.innerWidth;

    isDesktopVersion = windowWidth > 940 ? true : false;
  }
</script>
