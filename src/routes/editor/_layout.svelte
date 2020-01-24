<div class="container center-content">
  <slot />
</div>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    !user && this.redirect(301, '/login');
  }
</script>

<style>
  .container {
    width: 100%;
    max-width: 900px;
    --editor-padding: 15px 30px;
    --editor-width: calc(100% - 30px * 2);
  }
</style>
