<nav title="Article filters">
  <ul>
    <li>
      <a
        class:active="{filterCategory === 'top'}"
        class="button"
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
        class="button"
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
          class="button"
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
          class="button"
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
          class="button"
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
          class="button"
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
          class="button"
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
          class="button"
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
          class="button"
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
          class="button"
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
