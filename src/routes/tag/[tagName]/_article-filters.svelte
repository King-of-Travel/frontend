<LayoutFilters title="Article filters">
  <ul>
    <li>
      <button
        on:click="{() => setQueryParameter('sort', undefined)}"
        disabled="{isMainFilterByNewArticles}"
      >
        New
      </button>
    </li>
    <li>
      <button
        on:click="{() => setQueryParameter('sort', 'top')}"
        disabled="{!isMainFilterByNewArticles}"
      >
        Top
      </button>
    </li>
  </ul>

  <ul>
    {#if isMainFilterByNewArticles}
      <li>
        <button
          on:click="{() => setQueryParameter('rating', undefined)}"
          disabled="{!rating}"
        >
          All
        </button>
      </li>
      <li>
        <button
          on:click="{() => setQueryParameter('rating', 5)}"
          disabled="{rating === 5}"
        >
          ≥ 5
        </button>
      </li>
      <li>
        <button
          on:click="{() => setQueryParameter('rating', 10)}"
          disabled="{rating === 10}"
        >
          ≥ 10
        </button>
      </li>
      <li>
        <button
          on:click="{() => setQueryParameter('rating', 20)}"
          disabled="{rating === 20}"
        >
          ≥ 20
        </button>
      </li>
    {:else}
      <li>
        <button
          on:click="{() => setQueryParameter('period', 'day')}"
          disabled="{period === 'day'}"
        >
          Day
        </button>
      </li>
      <li>
        <button
          on:click="{() => setQueryParameter('period', 'week')}"
          disabled="{period === 'week'}"
        >
          Week
        </button>
      </li>
      <li>
        <button
          on:click="{() => setQueryParameter('period', 'month')}"
          disabled="{period === 'month'}"
        >
          Month
        </button>
      </li>
      <li>
        <button
          on:click="{() => setQueryParameter('period', undefined)}"
          disabled="{!period}"
        >
          Year
        </button>
      </li>
    {/if}
  </ul>
</LayoutFilters>

<script>
  import { stores } from '@sapper/app';

  import LayoutFilters from 'components/filter/main-layout.svelte';
  import { setQueryParameter } from 'path-finder';

  let { page } = stores();

  $: isMainFilterByNewArticles = $page.query.sort !== 'top';

  $: rating = +$page.query.rating;
  $: period = $page.query.period;
</script>
