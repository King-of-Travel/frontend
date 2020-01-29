<svelte:head>
  <title>Join / King of Travel</title>
</svelte:head>

<main class="center-content">
  <h1 class="title">Create your account</h1>
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
    max-width: 450px;
    width: 100%;
  }
</style>
