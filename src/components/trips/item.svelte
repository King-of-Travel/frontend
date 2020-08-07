<svelte:options immutable="{true}" />

<article
  {...excludeKeysFromObject($$props, ['trip', 'className', 'active'])}
  class="{rootClassName}"
>
  <h3>
    <span title="Country">
      {Countries.find(country => country.value === trip.countryCode).label},
    </span>
    <span title="City">{trip.city}</span>
  </h3>

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
  </div>

  <hr align="left" />

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

  <slot />
</article>

<script>
  import { excludeKeysFromObject } from 'utils/exclude';
  import Countries from 'components/locales/countries/en.json';
  import { tripDateRange, articleCreatedAt } from 'utils/date-formatting';
  import { cn } from 'utils/class-names';

  export let trip, className, active;

  $: rootClassName = cn(className, active && 'active');

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
    position: relative;
    display: grid;
    grid-template-rows: repeat(4, min-content);
    gap: 5px;
    padding: 15px;
    overflow: hidden;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
    border: var(--base-border-w) solid var(--border-color, var(--base-border));
    border-radius: var(--base-border-r);
  }

  hr {
    max-width: 200px;
  }

  .meta .created {
    margin-top: 5px;
    font-size: 0.8rem;
    color: var(--base-gray);
  }
</style>
