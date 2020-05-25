import { writable, get } from 'svelte/store';

import { request } from 'api.js';

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
  let trips = writable([]);

  let isLoaded = false;

  async function downloadFollowingTrips(options) {
    if (isLoaded) return;

    let offset = get(trips).length;

    let newArticles = await request(
      'GET',
      queryToGetFollowingTrips({ offset, ...options })
    );

    if (newArticles.data.length < 20) {
      isLoaded = true;
    }

    addTrips(newArticles.data);
  }

  function addTrips(newTrips) {
    trips.update(trips => {
      return trips.concat(newTrips);
    });
  }

  async function deleteTrip(tripId) {
    let confirm = window.confirm('Are you sure you want to delete the trip?');
    if (!confirm) return;

    await request('DELETE', `trip/${tripId}`);

    trips.update(trips => {
      let findIndex = trips.findIndex(trip => trip.id === tripId);

      return [...trips.slice(0, findIndex), ...trips.slice(findIndex + 1)];
    });
  }

  function reset() {
    trips.set([]);
  }

  return {
    subscribe: trips.subscribe,
    reset,
    addTrips,
    deleteTrip,
    downloadFollowingTrips
  };
}

export let tripsStore = createTripsStore();
