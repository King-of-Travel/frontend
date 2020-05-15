<svelte:head>
  <title>{status === 500 ? 500 : error.message}</title>
</svelte:head>

<main class="center-content">
  <h1>
    <mark>{status}</mark>
  </h1>

  <p>
    <mark>{error.message}</mark>
  </p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</main>

<script>
  export let status, error;

  const dev = 'process.env.NODE_ENV' === 'development';
</script>

<style>
  h1 {
    margin-bottom: var(--text-side);
    text-align: center;
  }

  p > mark {
    padding: 5px;
    background: var(--base-light-accent);
  }
</style>
