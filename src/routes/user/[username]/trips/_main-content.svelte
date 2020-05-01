<MainNavigation tab="trips" />
<TripFilters {time} />
<TripList
  trips="{$trips}"
  requestConfig="{{ path: 'user/trips', query: `username=${$user.username}&time=${time}` }}"
  let:trip
>
  {#if isCurrentUserProfile}
    <TripItemWithMenu {trip} deleteTrip="{() => trips.deleteTrip(trip.id)}" />
  {:else}
    <TripItem {trip} />
  {/if}
</TripList>

<script>
  import { trips } from './_stores.js';

  import MainNavigation from '../_navigation.svelte';
  import TripFilters from './_filters.svelte';
  import TripList from 'components/trips/list.svelte';
  import TripItem from 'components/trips/item.svelte';
  import TripItemWithMenu from 'components/trips/item-with-menu.svelte';
  import { user } from '../_stores.js';

  import { getContext } from 'svelte';

  export let time;

  let isCurrentUserProfile = getContext('isCurrentUserProfile');
</script>
