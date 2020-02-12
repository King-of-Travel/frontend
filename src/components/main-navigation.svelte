<nav>
  <ul>
    <li>
      <a
        class:active="{tab === 'articles'}"
        tabindex="{tab === 'articles' ? -1 : 0}"
        class="button"
        href="/"
      >
        Articles
      </a>
    </li>
  </ul>
</nav>

<script>
  export let tab = 'articles';
</script>

<style>
  nav {
    margin-bottom: 15px;
    border-bottom: var(--base-border-w) solid var(--base-border);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    margin-bottom: calc(var(--base-border-w) * -1);
    background: none;
    border-radius: 0;
  }

  a:focus,
  a:hover {
    background-color: var(--base-hover);
  }

  a.active {
    pointer-events: none;
    border-bottom: var(--base-border-w) solid var(--base-accent);
  }
</style>
