<header>
  <a href="/" rel="prefetch" class="logo">
    <img
      src="images/logo-64.png"
      alt="King of Travel Logotype"
      height="50"
      width="50"
    />
  </a>
  <Profile {user} />
</header>

<script>
  import { stores } from '@sapper/app';

  import Profile from './profile.svelte';

  let { session } = stores();

  $: user = $session.user;
</script>

<style>
  header {
    display: grid;
    height: 65px;
    width: 100%;
    grid-template-columns: 50px minmax(auto, 850px);
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    z-index: 100;
    background-color: #b7e7fd;
    box-shadow: 0 0 15px 0px #b7e7fd;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
