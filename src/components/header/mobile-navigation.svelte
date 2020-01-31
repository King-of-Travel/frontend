<nav>
  <h4>Main</h4>
  <ol>
    <li>
      <a href="/" rel="prefetch" class="button">Home</a>
    </li>
  </ol>
  <h4>For you</h4>
  <ol>
    {#if user}
      <li>
        <a href="/profile" rel="prefetch" class="button">Your profile</a>
      </li>
      <li>
        <a href="/editor" rel="prefetch" class="button">Create post</a>
      </li>
      <li>
        <a href="/trip/add" rel="prefetch" class="button">Add trip</a>
      </li>
      <li>
        <a href="/settings" rel="prefetch" class="button">Settings</a>
        <button on:click="{signout}" class="button">Sign out</button>
      </li>
    {:else}
      <li>
        <a href="/join" rel="prefetch" class="button">Sign up</a>
      </li>
      <li>
        <a href="/login" rel="prefetch" class="button">Login</a>
      </li>
    {/if}
  </ol>
</nav>

<script>
  import { stores, goto } from '@sapper/app';
  import { request } from 'api.js';

  let { session } = stores();

  $: user = $session.user;

  async function signout() {
    await request('DELETE', 'session');
    $session.user = null;
    goto('/');
  }
</script>

<style>
  h4 {
    font-size: calc(var(--base-h4) * 1.3);
  }

  ol {
    padding: 0;
    list-style: none;
  }

  a,
  button {
    width: 100%;
    font-weight: 500;
    background-color: transparent;
  }

  button {
    border: none;
    text-align: left;
  }
</style>
