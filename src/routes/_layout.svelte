<svelte:head>
  <meta name="theme-color" content="#12aef7" />
</svelte:head>

<Header />
<main>
  <slot />
</main>

<script>
  import Header from 'components/header/index.svelte';
</script>

<style global>
  @import '../global.css';

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
