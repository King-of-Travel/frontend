<svelte:head>
  <title>Join / King of Travel</title>
</svelte:head>

<div class="join-container center-content">
  <h1 class="title">Create your account</h1>
  <Form></Form>
</div>

<script context="module">
  export async function preload(page, session) {
    const { user } = session;

    user && this.redirect(301, '/');
  }
</script>

<script>
  import Form from './_form.svelte';
</script>

<style>
  .join-container {
    width: 100%;
    max-width: 450px;
  }
</style>
