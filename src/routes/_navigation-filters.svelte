<LayoutFilters title="Article filters">
  <ul>
    <button
      on:click="{() => setQueryParameter('sort', null)}"
      disabled="{!isNewArticleCategory}"
    >
      Top
    </button>
    <button
      on:click="{() => setQueryParameter('sort', 'new')}"
      disabled="{isNewArticleCategory}"
    >
      New
    </button>
  </ul>
  <ul>
    {#if isNewArticleCategory}
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
          on:click="{() => setQueryParameter('period', undefined)}"
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
          on:click="{() => setQueryParameter('period', 'year')}"
          disabled="{period === 'year'}"
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

  $: isNewArticleCategory = $page.query.sort === 'new';
  $: rating = +$page.query.rating;
  $: period = $page.query.period || 'week';
</script>
