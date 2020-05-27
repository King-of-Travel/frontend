<svelte:head>
  <title>Sign in / King of Travel</title>
</svelte:head>

<main class="center-content">
  <h1 class="title">Sign in to King of Travel</h1>
  <Form />
</main>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    user && this.redirect(301, '/');
  }
</script>

<script>
  import Form from './_form.svelte';
</script>

<style>
  main {
    width: 100%;
    max-width: 450px;
  }
</style>
