<LayoutFilters title="Filter trips by time">
  <ul>
    <FilterItemButton
      on:click="{() => setQueryParameter('time', 'past')}"
      isActive="{time === 'past'}"
    >
      Past
    </FilterItemButton>
    <FilterItemButton
      on:click="{() => setQueryParameter('time', 'present')}"
      isActive="{time === 'present'}"
    >
      Present
    </FilterItemButton>
    <FilterItemButton
      on:click="{() => setQueryParameter('time', undefined)}"
      isActive="{time === undefined}"
    >
      Future
    </FilterItemButton>
  </ul>
</LayoutFilters>

<script>
  import { stores } from '@sapper/app';
  import { setQueryParameter } from 'path-finder';

  import LayoutFilters from 'components/filter/main-layout.svelte';
  import FilterItemButton from 'components/filter/item/button.svelte';

  let { page } = stores();

  $: time = $page.query.time;
</script>
