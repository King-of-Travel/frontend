{#if isDesktopVersion}
  <Desktop />
{:else}
  <Mobile />
{/if}

<script>
  import { onMount } from 'svelte';

  import Desktop from './desktop.svelte';
  import Mobile from 'components/navigation/mobile.svelte';

  let isDesktopVersion = true;

  onMount(() => {
    let media = window.matchMedia('(min-width: 941px)');
    media.addListener(e => (isDesktopVersion = e.matches));

    isDesktopVersion = media.matches;
  });
</script>
