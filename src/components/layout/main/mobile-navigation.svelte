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
        <a href="/trip" rel="prefetch" class="button">Add trip</a>
      </li>
      <li>
        <a href="/settings" rel="prefetch" class="button">Settings</a>
      </li>
      <li>
        <button on:click="{signout}" type="button" class="button">
          Sign out
        </button>
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
    font-size: var(--base-h2);
  }

  ol {
    padding: 0;
    list-style: none;
  }

  a,
  button {
    --background: transparent;

    display: block;
    font-weight: 500;
  }

  button {
    width: 100%;
    text-align: left;
    border: none;
  }
</style>
