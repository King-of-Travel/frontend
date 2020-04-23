<div
  class="{`
    layout
    ${segment === 'a' ? '' : 'layout_is-header-fixed'} 
  `}"
>
  <Header />
  <slot />
  <Footer />
</div>

<script>
  import Header from 'components/header/index.svelte';
  import Footer from 'components/footer.svelte';

  export let segment;
</script>

<style global>
  @import '../styles/common.css';

  .layout {
    display: grid;
    grid-template-areas:
      'header'
      'main'
      'footer';
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    height: 100%;
  }

  .layout > header {
    grid-area: header;
    width: 100%;
  }

  .layout > main {
    grid-area: main;
  }

  .layout > footer {
    grid-area: footer;
  }

  @media (--no-mobile) {
    .layout_is-header-fixed {
      padding-top: 65px;
    }

    .layout_is-header-fixed > header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
