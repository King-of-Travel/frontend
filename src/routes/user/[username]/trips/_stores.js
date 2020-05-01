import { writable } from 'svelte/store';

import { request } from 'api.js';

function createTrips() {
  let { subscribe, set, update } = writable([]);

  async function deleteTrip(tripId) {
    let confirm = window.confirm('Are you sure you want to delete the trip?');
    if (!confirm) return;

    await request('DELETE', `trip/${tripId}`);

    update(trips => {
      let findIndex = trips.findIndex(trip => trip.id === tripId);

      return [...trips.slice(0, findIndex), ...trips.slice(findIndex + 1)];
    });
  }

  return {
    subscribe,
    set,
    reset: () => set([]),
    deleteTrip
  };
}

export let trips = createTrips();
