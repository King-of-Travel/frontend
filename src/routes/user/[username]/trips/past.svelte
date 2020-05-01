<svelte:head>
  <title>Profile: {$user.username} / Past trips</title>
</svelte:head>

<MainContent time="past" />

<script context="module">
  export async function preload(page) {
    let { username } = page.params;

    let getTrips = await this.fetch(
      `/api/user/trips?username=${username}&time=past&limit=10`
    );

    let defaultTrips = await getTrips.json();

    return {
      defaultTrips
    };
  }
</script>

<script>
  import MainContent from './_main-content.svelte';
  import { user } from '../_stores.js';
  import { trips } from './_stores.js';

  export let defaultTrips;

  trips.set(defaultTrips);
</script>
