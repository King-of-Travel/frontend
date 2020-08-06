<LayoutFilters title="Article filters">
  <ul>
    <FilterItemButton
      on:click="{() => setQueryParameter('sort', null)}"
      isActive="{!isNewArticleCategory}"
    >
      Top
    </FilterItemButton>
    <FilterItemButton
      on:click="{() => setQueryParameter('sort', 'new')}"
      isActive="{isNewArticleCategory}"
    >
      New
    </FilterItemButton>
  </ul>
  <ul>
    {#if isNewArticleCategory}
      <FilterItemButton
        on:click="{() => setQueryParameter('rating', undefined)}"
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
        on:click="{() => setQueryParameter('period', undefined)}"
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
        on:click="{() => setQueryParameter('period', 'year')}"
        isActive="{period === 'year'}"
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
  import { setQueryParameter } from 'navigation/query';

  let { page } = stores();

  $: isNewArticleCategory = $page.query.sort === 'new';
  $: rating = +$page.query.rating;
  $: period = $page.query.period || 'week';
</script>
