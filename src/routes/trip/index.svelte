<svelte:head>
  <title>Add a New Trip</title>
</svelte:head>

<main class="center-content">
  <h1 class="title">Add a New Trip</h1>
  <Form />
</main>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    !user && this.redirect(302, '/login');
  }
</script>

<script>
  import Form from './_form.svelte';
</script>

<style>
  main {
    width: 100%;
    max-width: 500px;
  }
</style>
