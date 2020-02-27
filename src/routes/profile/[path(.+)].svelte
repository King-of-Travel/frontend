<script context="module">
  export async function preload(page, session) {
    let { user } = session;

    if (!user) this.redirect(302, '/login');

    this.redirect(301, `/users/${user.username}/${page.params.path}`);
  }
</script>
