<svelte:head>
  <title>Profile: {$user.username} / Past trips</title>
</svelte:head>

<MainNavigation tab="trips" />
<TripFilters time="past" />
<TripList
  bind:trips
  requestConfig="{{ path: 'user/trips', query: `username=${$user.username}&time=past` }}"
  let:trip
>
  <TripItem {trip} />
</TripList>

<script context="module">
  export async function preload(page) {
    let { username } = page.params;

    let getTrips = await this.fetch(
      `/api/user/trips?username=${username}&time=past&limit=10`
    );

    let trips = await getTrips.json();

    return {
      trips
    };
  }
</script>

<script>
  import MainNavigation from '../_navigation.svelte';
  import TripFilters from './_filters.svelte';
  import TripList from 'components/trips/list.svelte';
  import TripItem from 'components/trips/item.svelte';
  import { user } from '../_stores.js';

  export let trips;
</script>
