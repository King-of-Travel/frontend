<nav {...$$props}>
  <slot />
</nav>

<style>
  nav {
    margin-bottom: 15px;
  }

  nav :global(ul) {
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

  nav :global(ul:first-child) {
    margin-right: 20px;
  }

  nav :global(li) {
    display: inline-block;
  }

  nav :global(a) {
    --background: transparent;
    display: block;
    padding: 9px;
    background-image: none;
    font-size: var(--base-h6);
    font-weight: 600;
    color: var(--base-text);
    text-shadow: none;
  }

  nav :global(li a:focus, li a:hover) {
    box-shadow: none !important;
  }

  nav :global(a.active) {
    pointer-events: none;
    background-color: var(--base-accent);
    cursor: default;
  }
</style>
