<main class="center-content">
  <header>
    <div class="left-block">
      <h1 title="Nickname">{$user.username}</h1>
      <div class="meta">
        Registered:
        {@html articleCreatedAt($user.createdAt)}
      </div>
    </div>

    <div class="right-block">
      {#if isCurrentUserProfile}
        <a href="/settings" rel="prefetch" class="button button_outlined">
          Settings
        </a>
      {/if}
    </div>
  </header>

  <section>
    <slot />
  </section>
</main>

<script context="module">
  export async function preload(page, session) {
    let { username } = page.params;

    let getUserData = await this.fetch(`/api/user?username=${username}`);

    if (!getUserData.ok) return this.error(404, 'User not found');

    let userData = await getUserData.json();

    let isCurrentUserProfile =
      userData.id === (session.user && session.user.id);

    return {
      userData,
      isCurrentUserProfile
    };
  }
</script>

<script>
  import { setContext } from 'svelte';

  import { articleCreatedAt } from 'date-formatting';
  import { user } from './_stores.js';

  export let userData, isCurrentUserProfile;

  user.set(userData);

  setContext('baseUserHref', `user/${$user.username}`);
  setContext('isCurrentUserProfile', isCurrentUserProfile);
</script>

<style>
  main {
    display: grid;
    grid-template-rows: repeat(2, max-content);
    gap: 20px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  header {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 15px;
  }

  .left-block > h1 {
    font-size: 1rem;
  }

  .left-block > h1::before {
    margin-right: 2px;
    content: '@';
  }

  .left-block .meta {
    margin-top: 5px;
    font-size: 0.8rem;
  }

  .right-block {
    text-align: end;
  }

  .right-block .button {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
</style>
