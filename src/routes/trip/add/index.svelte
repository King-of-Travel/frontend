<svelte:head>
  <title>Add trip / King of Travel</title>
</svelte:head>

<div class="center-content">
  <h1 class="title">Add trip</h1>
  <Form />
</div>

<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    !user && this.redirect(301, '/login');

    return { username: user.username };
  }
</script>

<script>
  import Form from './_form.svelte';
</script>

<style>
  div {
    width: 100%;
    max-width: 500px;
  }
</style>
