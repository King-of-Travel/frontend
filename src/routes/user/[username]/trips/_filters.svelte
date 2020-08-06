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

  import LayoutFilters from 'components/filter/main-layout.svelte';
  import FilterItemButton from 'components/filter/item/button.svelte';
  import { setQueryParameter } from 'navigation/query';

  let { page } = stores();

  $: time = $page.query.time;
</script>
