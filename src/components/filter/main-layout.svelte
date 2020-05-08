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
    display: block;
    padding: 9px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--base-text);
    text-shadow: none;
    background: none;
  }

  nav :global(button) {
    --background: none;

    padding: 9px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 0;
  }

  nav :global(a:hover, a:focus) {
    box-shadow: none;
  }

  nav :global(a.active) {
    pointer-events: none;
    cursor: default;
    background-color: var(--base-accent);
  }

  nav :global(ul:first-child) {
    margin-right: 20px;
  }

  nav :global(button:disabled) {
    --background: var(--base-accent);
  }

  nav :global(button:not(:disabled):hover, button:not(:disabled):focus) {
    --background: var(--base-hover) !important;
  }
</style>
