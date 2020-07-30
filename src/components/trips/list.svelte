{#if $tripsStore.trips.length}
  <div bind:this="{containerElement}" class="container" role="feed">
    {#each $tripsStore.trips as trip (trip.id)}
      <slot {trip} />
    {/each}

    {#if $tripsStore.isLoading}
      <div class="loader" title="Download trips. Please wait">
        <Icon name="loader" />
      </div>
    {/if}
  </div>
{:else}
  <ListFallback />
{/if}

<script>
  import { onMount } from 'svelte';

  import Icon from 'components/icon.svelte';
  import ListFallback from './list-fallback.svelte';

  export let tripsStore, tripsDownloadOptions;

  let containerElement;

  $: {
    if ($tripsStore.isLoaded && containerElement) {
      removeInfiniteScrollTrips();
    }
  }

  onMount(() => {
    if (!containerElement) return;

    document.addEventListener('scroll', infiniteScrollTrips);

    return () => {
      removeInfiniteScrollTrips();
    };
  });

  async function infiniteScrollTrips() {
    if ($tripsStore.isLoading) return;

    let pageYoffset = window.pageYOffset + window.innerHeight;

    let containerOffset =
      containerElement.offsetTop + containerElement.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      tripsStore.downloadFollowingTrips(tripsDownloadOptions);
    }
  }

  function removeInfiniteScrollTrips() {
    document.removeEventListener('scroll', infiniteScrollTrips);
  }
</script>

<style>
  .container {
    display: grid;
    gap: var(--text-side);
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
