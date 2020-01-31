<script context="module">
  export async function preload(_, session) {
    let { user } = session;

    if (!user) this.redirect(302, '/login');

    this.redirect(301, `/users/${user.username}`);
  }
</script>
