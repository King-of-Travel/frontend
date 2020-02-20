<nav title="Article filters">
  <ul>
    <li>
      <a
        class:active="{filterCategory === 'top'}"
        rel="prefetch"
        href="/"
        title="Top artiles"
      >
        Top
      </a>
    </li>
    <li>
      <a
        class:active="{filterCategory === 'new'}"
        rel="prefetch"
        href="/new"
        title="New Articles"
      >
        New
      </a>
    </li>
  </ul>
  <ul>
    {#if filterCategory === 'top'}
      <li>
        <a
          class:active="{filterPeriodTop === 'day'}"
          rel="prefetch"
          href="/top/day"
          title="Daily articles"
        >
          Day
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriodTop === 'week'}"
          rel="prefetch"
          href="/"
          title="Articles for the week"
        >
          Week
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriodTop === 'month'}"
          rel="prefetch"
          href="/top/month"
          title="Monthly Articles"
        >
          Month
        </a>
      </li>
      <li>
        <a
          class:active="{filterPeriodTop === 'year'}"
          rel="prefetch"
          href="/top/year"
          title="Articles for the year"
        >
          Year
        </a>
      </li>
    {:else if filterCategory === 'new'}
      <li>
        <a
          class:active="{filterRatingNew === 0}"
          rel="prefetch"
          href="/new"
          title="No rating restrictions"
        >
          All
        </a>
      </li>
      <li>
        <a
          class:active="{filterRatingNew === 5}"
          rel="prefetch"
          href="/new/5"
          title="Articles rating 5 or more"
        >
          ≥ 5
        </a>
      </li>
      <li>
        <a
          class:active="{filterRatingNew === 10}"
          rel="prefetch"
          href="/new/10"
          title="Articles rating 10 or more"
        >
          ≥ 10
        </a>
      </li>
      <li>
        <a
          class:active="{filterRatingNew >= 25}"
          rel="prefetch"
          href="/new/25"
          title="Articles rating 25 or more"
        >
          ≥ 25
        </a>
      </li>
    {/if}
  </ul>
</nav>

<script>
  export let filterCategory, filterPeriodTop, filterRatingNew;
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
    display: block;
    padding: 10px;
    font-size: var(--base-h5);
    font-weight: 600;
    color: var(--base-text);
  }

  a.active {
    pointer-events: none;
    background-color: var(--base-accent);
    cursor: default;
  }
</style>
