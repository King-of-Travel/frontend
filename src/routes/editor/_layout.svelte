<main class="center-content">
  <slot />
</main>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    !user && this.redirect(301, '/login');
  }
</script>

<style>
  main {
    width: 100%;
    max-width: 900px;
    --editor-padding: 15px 30px;
    --editor-width: calc(100% - 30px * 2);
  }
</style>
