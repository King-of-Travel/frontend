<svelte:options immutable="{true}" />

<article>
  <h4>
    <span title="Country">
      {Countries.find(country => country.value === trip.countryCode).label},
    </span>
    <span title="City">{trip.city}</span>
  </h4>

  <div class="trip-text-state">
    {#if endDate < currentDate}
      The trip took place {endDateToCurrentDate}
      {#if endDateToCurrentDate > 1}days{:else}day{/if}
      ago
    {:else if startDate < currentDate && endDate > currentDate}
      The trip will end in {currentDateToEndDate}
      {#if currentDateToEndDate > 1}days{:else}day{/if}
    {:else}
      The trip will begin in {currentDateToEndDate}
      {#if currentDateToEndDate > 1}days{:else}day{/if}
    {/if}

    <hr align="left" />
  </div>

  <div class="meta">
    <div>
      Trip start date:
      {@html tripDateRange(trip.startDate)}
    </div>
    <div>
      Trip end date:
      {@html tripDateRange(trip.endDate)}
    </div>
    <div class="created">
      The trip was added on the:
      {@html articleCreatedAt(trip.createdAt)}
    </div>
  </div>
</article>

<script>
  import { tripDateRange, articleCreatedAt } from 'date-formatting.js';

  import Countries from 'components/locales/countries/en.json';

  export let trip;

  let startDate = new Date(trip.startDate);
  let endDate = new Date(trip.endDate);

  let currentDate = new Date();

  let endDateToCurrentDate = Math.trunc(
    Math.ceil(currentDate - endDate) / (1000 * 3600 * 24)
  );

  let currentDateToEndDate = Math.trunc(
    Math.ceil(endDate - currentDate) / (1000 * 3600 * 24)
  );
</script>

<style>
  article {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-gap: 6px;
    padding: 15px;
    font-size: var(--base-h5);
    border: var(--base-border-w) solid var(--base-border);
    border-radius: var(--base-border-r);
  }

  hr {
    max-width: 200px;
    width: 100%;
  }

  .meta .created {
    margin-top: 5px;
    font-size: var(--base-h6);
    color: var(--base-gray);
  }
</style>
