<LayoutFilters title="Filter trips by time">
  <ul>
    <FilterItemLink
      isActive="{time === 'past'}"
      href="{baseUserHref}/trips/past"
    >
      Past
    </FilterItemLink>
    <FilterItemLink
      isActive="{time === 'present'}"
      href="{baseUserHref}/trips/present"
    >
      Present
    </FilterItemLink>
    <FilterItemLink isActive="{time === 'future'}" href="{baseUserHref}/trips">
      Future
    </FilterItemLink>
  </ul>
</LayoutFilters>

<script>
  import { getContext } from 'svelte';

  import LayoutFilters from 'components/filter/main-layout.svelte';
  import FilterItemLink from 'components/filter/item/link.svelte';

  export let time = 'future';

  let baseUserHref = getContext('baseUserHref');
</script>
