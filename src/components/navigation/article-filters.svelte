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
      <li>
        <a
          class:active="{filterPeriod === 'day'}"
          class="button"
          rel="prefetch"
          href="/top/day"
        >
          Day
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriod === 'week'}"
          class="button"
          rel="prefetch"
          href="/"
        >
          Week
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriod === 'month'}"
          class="button"
          rel="prefetch"
          href="/top/month"
        >
          Month
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriod === 'year'}"
          class="button"
          rel="prefetch"
          href="/top/year"
        >
          Year
        </a>
      </li>
    </ul>
  {/if}
</nav>

<script>
  export let filterCategory = 'top',
    filterPeriod = 'day';
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
