<svelte:head>
  <title>Add trip / King of Travel</title>
</svelte:head>

<main class="center-content">
  <h1 class="title">Add trip</h1>
  <Form />
</main>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    !user && this.redirect(302, '/login');

    return { username: user.username };
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
