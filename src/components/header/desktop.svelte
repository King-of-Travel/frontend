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

          <DropdownItem href="/users/{user.username}" rel="prefetch">
            Your profile
          </DropdownItem>
          <DropdownItem href="/editor" rel="prefetch">Create post</DropdownItem>
          <DropdownItem href="/trip/add" rel="prefetch">Add trip</DropdownItem>
          <DropdownItem href="/settings" rel="prefetch">Settings</DropdownItem>
        </Dropdown>
      {:else}
        <a href="/join" rel="prefetch" class="button">Sign up</a>
        <a href="/login" rel="prefetch" class="button">Login</a>
      {/if}
    </nav>
  </div>
</header>

<script>
  import Dropdown from 'components/dropdown/index.svelte';
  import DropdownItem from 'components/dropdown/item.svelte';

  export let user;
</script>

<style type="postcss">
  header {
    z-index: 100;
    background-color: #b7e7fd;
    box-shadow: 0 0 15px 0px #b7e7fd;
  }

  header > div {
    display: grid;
    grid-template-columns: 50px 1fr;
    justify-content: center;
    align-items: center;
    height: 65px;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 15px;
  }

  @media (--mobile) {
    header {
      display: none;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .logo > img {
    display: inline-block;
    border-radius: 2px;
  }

  nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .profile {
    --triangle-opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }

  .profile:focus,
  .profile:hover {
    --triangle-opacity: 0.7;
  }

  .profile__triangle {
    display: inline-block;
    margin: 5px 0 0 3px;
    opacity: var(--triangle-opacity);
    border: 5px solid transparent;
    border-top: 5px solid var(--base-gray);
  }

  .button {
    margin-left: 10px;
    font-weight: 400;
    border: 1px solid var(--base-hover);
    background-color: transparent;
  }
</style>
