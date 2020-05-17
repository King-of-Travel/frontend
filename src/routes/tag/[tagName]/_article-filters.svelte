<LayoutFilters title="Article filters">
  <ul>
    <FilterItemButton
      on:click="{() => setQueryParameter('sort', null)}"
      isActive="{isMainFilterByNewArticles}"
    >
      New
    </FilterItemButton>
    <FilterItemButton
      on:click="{() => setQueryParameter('sort', 'top')}"
      isActive="{!isMainFilterByNewArticles}"
    >
      Top
    </FilterItemButton>
  </ul>

  <ul>
    {#if isMainFilterByNewArticles}
      <FilterItemButton
        on:click="{() => setQueryParameter('rating', null)}"
        isActive="{!rating}"
      >
        All
      </FilterItemButton>
      <FilterItemButton
        on:click="{() => setQueryParameter('rating', 5)}"
        isActive="{rating === 5}"
      >
        ≥ 5
      </FilterItemButton>
      <FilterItemButton
        on:click="{() => setQueryParameter('rating', 10)}"
        isActive="{rating === 10}"
      >
        ≥ 10
      </FilterItemButton>
      <FilterItemButton
        on:click="{() => setQueryParameter('rating', 20)}"
        isActive="{rating === 20}"
      >
        ≥ 20
      </FilterItemButton>
    {:else}
      <FilterItemButton
        on:click="{() => setQueryParameter('period', 'day')}"
        isActive="{period === 'day'}"
      >
        Day
      </FilterItemButton>
      <FilterItemButton
        on:click="{() => setQueryParameter('period', 'week')}"
        isActive="{period === 'week'}"
      >
        Week
      </FilterItemButton>
      <FilterItemButton
        on:click="{() => setQueryParameter('period', 'month')}"
        isActive="{period === 'month'}"
      >
        Month
      </FilterItemButton>
      <FilterItemButton
        on:click="{() => setQueryParameter('period', undefined)}"
        isActive="{!period}"
      >
        Year
      </FilterItemButton>
    {/if}
  </ul>
</LayoutFilters>

<script>
  import { stores } from '@sapper/app';

  import LayoutFilters from 'components/filter/main-layout.svelte';
  import FilterItemButton from 'components/filter/item/button.svelte';
  import { setQueryParameter } from 'path-finder';

  let { page } = stores();

  $: isMainFilterByNewArticles = $page.query.sort !== 'top';

  $: rating = +$page.query.rating;
  $: period = $page.query.period;
</script>
