import { writable, get } from 'svelte/store';

import { request } from 'request/api';

export function queryToGetFollowingTrips({
  username,
  time = 'future',
  offset = 0,
  limit = 20
}) {
  let searchParams = new URLSearchParams('');

  searchParams.append('username', username);
  searchParams.append('time', time);
  searchParams.append('offset', offset);
  searchParams.append('limit', limit);

  return `user/trips?${searchParams}`;
}

function createTripsStore() {
  let defaultValue = () => ({
    trips: [],
    isLoading: false,
    isLoaded: false
  });

  let tripsStore = writable(defaultValue());

  function updateValue(name, value) {
    tripsStore.update(store => {
      store[name] = value;

      return store;
    });
  }

  function reset() {
    tripsStore.set(defaultValue());
  }

  function addTrips(newTrips) {
    let store = get(tripsStore);
    let trips = store.trips.concat(newTrips);

    updateValue('trips', trips);

    if (trips.length >= 20) return;
    updateValue('isLoaded', true);
  }

  async function downloadFollowingTrips(options) {
    let store = get(tripsStore);

    if (store.isLoaded || store.isLoading) return;

    updateValue('isLoading', true);

    let offset = store.trips.length;

    let newArticles = await request(
      'GET',
      queryToGetFollowingTrips({ offset, ...options })
    );

    if (newArticles.data.length < 20) {
      updateValue('isLoaded', true);
    }

    addTrips(newArticles.data);

    updateValue('isLoading', false);
  }

  async function deleteTrip(tripId) {
    let confirm = window.confirm('Are you sure you want to delete the trip?');
    if (!confirm) return;

    await request('DELETE', `trip/${tripId}`);

    tripsStore.update(tripsStore => {
      let findIndex = tripsStore.trips.findIndex(trip => trip.id === tripId);

      tripsStore.trips = [
        ...tripsStore.trips.slice(0, findIndex),
        ...tripsStore.trips.slice(findIndex + 1)
      ];

      return tripsStore;
    });
  }

  return {
    subscribe: tripsStore.subscribe,
    reset,
    addTrips,
    deleteTrip,
    downloadFollowingTrips
  };
}

export let tripsStore = createTripsStore();
