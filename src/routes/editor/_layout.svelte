<main class="center-content">
  <slot />
</main>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    !user && this.redirect(302, '/login');
  }
</script>

<script>
  import { onMount } from 'svelte';

  import { article } from './_stores.js';

  onMount(() => {
    return () => article.reset();
  });
</script>

<style>
  main {
    --editor-padding: 20px;
    --editor-width: calc(100% - 20px * 2);

    width: 100%;
    max-width: 900px;
  }
</style>
