<svelte:options immutable="{true}" />

<div bind:this="{containerElement}" class="container" role="feed">
  {#each trips as trip (trip.id)}
    <slot {trip} />
  {/each}

  {#if isLoading}
    <div class="loader" title="Download trips. Please wait">
      <Icon name="loader" />
    </div>
  {/if}
</div>

<script>
  import { onMount } from 'svelte';
  import { request } from 'api.js';

  import Icon from 'components/icon.svelte';

  export let trips = [],
    requestConfig;

  let containerElement;

  let isLoading = false;

  onMount(() => {
    document.addEventListener('scroll', infiniteScrollTrips);

    return () => {
      removeInfiniteScrollTrips();
    };
  });

  function removeInfiniteScrollTrips() {
    document.removeEventListener('scroll', infiniteScrollTrips);
  }

  function infiniteScrollTrips() {
    if (isLoading) return;

    if (trips.length < 20) removeInfiniteScrollTrips();

    let pageYoffset = window.pageYOffset + window.innerHeight;
    let containerOffset =
      containerElement.offsetTop + containerElement.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      loadingTrips();
    }
  }

  async function loadingTrips() {
    isLoading = true;

    let query = `?${requestConfig.query}&offset=${trips.length}`;
    let getTrips = await request('GET', `${requestConfig.path}${query}`);

    let newTrips = getTrips.data;

    trips.push(...newTrips);

    if (newTrips.length < 20) {
      removeInfiniteScrollTrips();
    }

    isLoading = false;
  }
</script>

<style>
  .container {
    display: grid;
    grid-gap: 15px;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
