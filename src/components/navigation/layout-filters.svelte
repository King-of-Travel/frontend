<nav {...$$props}>
  <slot />
</nav>

<style>
  nav {
    margin-bottom: 15px;
  }

  nav :global(ul) {
    display: inline-block;
    padding: 0;
    margin: 0;
    overflow: hidden;

    /* Indent between inline elements */
    font-size: 0;
    list-style: none;
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
  }

  nav :global(li) {
    display: inline-block;
  }

  nav :global(a) {
    --background: transparent;

    display: block;
    padding: 9px;
    font-size: var(--base-h6);
    font-weight: 600;
    color: var(--base-text);
    text-shadow: none;
    background-image: none;
  }

  nav :global(a.active) {
    pointer-events: none;
    cursor: default;
    background-color: var(--base-accent);
  }

  nav :global(ul:first-child) {
    margin-right: 20px;
  }

  nav :global(li a:focus, li a:hover) {
    box-shadow: none !important;
  }
</style>
