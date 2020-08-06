<svelte:head>
  <title>Trips / Profile: {$user.username}</title>
</svelte:head>

<section>
  <MainNavigation tab="trips" />

  <TripFilters />

  <TripList
    {tripsStore}
    tripsDownloadOptions="{{ username: $page.params.username, time: $page.query.time }}"
    let:trip
  >
    {#if isCurrentUserProfile}
      <TripItemWithMenu
        {trip}
        deleteTrip="{() => tripsStore.deleteTrip(trip.id)}"
      />
    {:else}
      <TripItem {trip} />
    {/if}
  </TripList>
</section>

<script context="module">
  // eslint-disable-next-line import/order
  import { queryToGetFollowingTrips, tripsStore } from './_stores.js';

  export async function preload({ params: { username }, query: { time } }) {
    let getTrips = await this.fetch(
      `/api/${queryToGetFollowingTrips({ username, time })}`
    );

    let defaultTrips = await getTrips.json();

    return {
      defaultTrips
    };
  }
</script>

<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';

  import TripList from 'components/trips/list.svelte';
  import TripItem from 'components/trips/item.svelte';
  import TripItemWithMenu from 'components/trips/item-with-menu.svelte';

  import TripFilters from './_filters.svelte';
  import { user } from '../_stores.js';
  import MainNavigation from '../_navigation.svelte';

  export let defaultTrips;

  let { page } = stores();

  $: {
    tripsStore.reset();
    tripsStore.addTrips(defaultTrips);
  }

  let isCurrentUserProfile = getContext('isCurrentUserProfile');
</script>

<style>
  section {
    display: grid;
    grid-template-rows: repeat(3, min-content);
    grid-gap: var(--text-side);
  }
</style>
