<div class="layout-container">
  <Header />
  <slot />
  <Footer />
</div>

<script>
  import Header from 'components/header/index.svelte';
  import Footer from 'components/footer.svelte';
</script>

<style global>
  @import '../global.css';

  .layout-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    grid-template-areas:
      'header'
      'main'
      'footer';
    height: 100%;
  }

  .layout-container > header {
    grid-area: header;
  }

  .layout-container > main {
    grid-area: main;
  }

  .layout-container > footer {
    grid-area: footer;
  }
</style>
