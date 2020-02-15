<nav title="Article filters">
  <ul>
    <li>
      <a
        class:active="{filterCategory === 'top'}"
        class="button"
        rel="prefetch"
        href="/"
      >
        Top
      </a>
    </li>
  </ul>
  {#if filterCategory === 'top'}
  <ul>
    {#if filterCategory === 'top'}
      <li>
        <a
          class:active="{filterPeriodTop === 'day'}"
          class="button"
          rel="prefetch"
          href="/top/day"
        >
          Day
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriodTop === 'week'}"
          class="button"
          rel="prefetch"
          href="/"
        >
          Week
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriodTop === 'month'}"
          class="button"
          rel="prefetch"
          href="/top/month"
        >
          Month
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriodTop === 'year'}"
          class="button"
          rel="prefetch"
          href="/top/year"
        >
          Year
        </a>
      </li>
    {/if}
  </ul>
  {/if}
</nav>

<script>
  export let filterCategory = 'top',
    filterPeriodTop = 'day',
    filterRatingNew = 0;
</script>

<style>
  nav {
    margin-bottom: 15px;
  }

  ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    /* Indent between inline elements */
    font-size: 0;
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
  }

  ul:first-child {
    margin-right: 20px;
  }

  li {
    display: inline-block;
  }

  a {
    padding: 10px;
    font-size: var(--base-h5);
    font-weight: 600;
    background: transparent;
    border-radius: 0;
  }

  a.active {
    pointer-events: none;
    background-color: var(--base-accent);
    cursor: default;
  }
</style>
