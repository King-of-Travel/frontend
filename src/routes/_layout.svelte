<div
  class="{`
    layout
    ${isFixedHeader ? '' : 'layout_is-header-fixed'} 
  `}"
>
  <Header />
  <slot />
  <Footer />
</div>

<script>
  import { stores } from '@sapper/app';
  import Header from 'components/header/index.svelte';
  import Footer from 'components/footer.svelte';

  let { page } = stores();

  $: isFixedHeader = $page.params && $page.params.articleId;
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
