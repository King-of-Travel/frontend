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

<script>
  import { onMount } from 'svelte';

  import Icon from 'components/icon.svelte';

  export let tripsStore, tripsDownloadOptions;

  let containerElement;

  $: {
    if ($tripsStore.isLoaded) {
      removeInfiniteScrollTrips();
    }
  }

  onMount(() => {
    document.addEventListener('scroll', infiniteScrollTrips);

    return () => {
      removeInfiniteScrollTrips();
    };
  });

  function removeInfiniteScrollTrips() {
    document.removeEventListener('scroll', infiniteScrollTrips);
  }

  async function infiniteScrollTrips() {
    if ($tripsStore.isLoading) return;

    let pageYoffset = window.pageYOffset + window.innerHeight;

    let containerOffset =
      containerElement.offsetTop + containerElement.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      tripsStore.downloadFollowingTrips(tripsDownloadOptions);
    }
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
