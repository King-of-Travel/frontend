<header>
  <div>
    <a href="/" rel="prefetch" class="logo">
      <img
        src="images/logo-64.png"
        alt="King of Travel Logotype"
        height="50"
        width="50"
      />
    </a>
    <nav>
      {#if user}
        <Dropdown width="150px" ariaLabel="View profile and more">
          <div slot="summary" class="profile">
            <img
              src="/images/no-avatar.png"
              alt="Our avatar"
              height="20"
              width="20"
            />
            <span class="profile__triangle"></span>
          </div>

          <DropdownItem href="/profile" rel="prefetch">
            Your profile
          </DropdownItem>
          <DropdownItem href="/editor" rel="prefetch">Create post</DropdownItem>
          <DropdownItem href="/trip/add" rel="prefetch">Add trip</DropdownItem>
          <DropdownItem href="/settings" rel="prefetch">Settings</DropdownItem>
          <DropdownItem on:click="{signout}">Sign out</DropdownItem>
        </Dropdown>
      {:else}
        <a href="/join" rel="prefetch" class="button">Sign up</a>
        <a href="/login" rel="prefetch" class="button">Login</a>
      {/if}
    </nav>
  </div>
</header>

<script>
  import { stores, goto } from '@sapper/app';
  import { request } from 'api.js';

  import Dropdown from 'components/dropdown/index.svelte';
  import DropdownItem from 'components/dropdown/item.svelte';

  let { session } = stores();

  $: user = $session.user;

  async function signout() {
    await request('DELETE', 'session');
    $session.user = null;
    goto('/');
  }
</script>

<style type="postcss">
  header {
    z-index: 100;
    background-color: rgba(var(--base-panel), 0.95);
    backdrop-filter: saturate(100%) blur(3px);
    box-shadow: 0 0 20px 0 var(--base-accent);
  }

  header > div {
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    height: 65px;
    padding: 0 15px;
    margin: 0 auto;
  }

  @media (--mobile) {
    header {
      display: none;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .logo > img {
    display: inline-block;
    border-radius: 2px;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .profile {
    --triangle-opacity: 1;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
  }

  .profile:focus,
  .profile:hover {
    --triangle-opacity: 0.7;
  }

  .profile__triangle {
    display: inline-block;
    margin: 5px 0 0 3px;
    border: 5px solid transparent;
    border-top: 5px solid var(--base-gray);
    opacity: var(--triangle-opacity);
  }

  .button {
    --background: transparent;

    padding: 5px 10px;
    margin-left: 10px;
    font-weight: 400;
  }
</style>
