<nav {...$$props}>
  <slot />
</nav>

<style>
  nav {
    display: flex;
  }

  nav :global(ul) {
    display: inline-flex;
    list-style: none;
    border: var(--base-border-w) solid var(--base-accent);
    border-radius: var(--base-border-r);
  }

  nav :global(li) {
    font-size: 0.8rem;
  }

  nav :global(a) {
    display: block;
    padding: 9px;
    font-weight: 600;
    color: var(--base-text);
    text-shadow: none;
    background: none;
  }

  nav :global(button) {
    --background: none;

    padding: 9px;
    font-weight: 600;
    border-radius: 0;
  }

  nav :global(ul:not(:last-child)) {
    margin-right: var(--text-side);
  }

  nav :global(a:hover, a:focus) {
    box-shadow: none;
  }

  nav :global(a.active) {
    pointer-events: none;
    cursor: default;
    background-color: var(--base-accent);
  }

  nav :global(button:disabled) {
    --background: var(--base-accent);
  }

  nav :global(button:not(:disabled):hover, button:not(:disabled):focus) {
    --background: var(--base-hover) !important;
  }
</style>
