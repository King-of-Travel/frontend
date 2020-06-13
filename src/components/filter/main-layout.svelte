<nav {...$$props}>
  <slot />
</nav>

<style>
  nav {
    --gap: var(--text-side);

    display: flex;
    flex-wrap: wrap;
    width: calc(100% + var(--gap));
    margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  }

  nav :global(ul) {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: var(--gap) 0 0 var(--gap);
    list-style: none;
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
  }

  nav :global(li) {
    font-size: 0.8rem;
  }
</style>
