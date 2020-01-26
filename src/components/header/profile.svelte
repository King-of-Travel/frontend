<div class="profile">
  {#if user}
    <Dropdown width="150px" ariaLabel="View profile and more">
      <div slot="summary" class="avatar">
        <img
          src="/images/no-avatar.png"
          alt="Our avatar"
          height="20"
          width="20"
        />
        <span class="profile-triangle"></span>
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
</div>

<script>
  import Dropdown from 'components/dropdown/index.svelte';
  import DropdownItem from 'components/dropdown/item.svelte';

  export let user;
</script>

<style>
  .profile {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  img {
    display: inline-block;
    border-radius: 2px;
  }

  .avatar {
    --triangle-opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }

  .avatar:focus,
  .avatar:hover {
    --triangle-opacity: 0.7;
  }

  .profile-triangle {
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
