<LayoutFilters title="Filter trips by time">
  <ul>
    <li>
      <a
        class:active="{time === 'past'}"
        rel="prefetch"
        href="{baseUserHref}/trips/past"
      >
        Past
      </a>
    </li>
    <li>
      <a
        class:active="{time === 'present'}"
        rel="prefetch"
        href="{baseUserHref}/trips/present"
      >
        Present
      </a>
    </li>
    <li>
      <a
        class:active="{time === 'future'}"
        rel="prefetch"
        href="{baseUserHref}/trips"
      >
        Future
      </a>
    </li>
  </ul>
</LayoutFilters>

<script>
  import { getContext } from 'svelte';

  import LayoutFilters from 'components/filter/main-layout.svelte';

  export let time = 'future';

  let baseUserHref = getContext('baseUserHref');
</script>
