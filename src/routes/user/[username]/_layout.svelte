<main class="center-content">
  <header>
    <div class="left-block">
      <h1 title="Nickname">{userData.username}</h1>
      <div class="meta">
        Registered:
        {@html articleCreatedAt(userData.createdAt)}
      </div>
    </div>

    <div class="right-block">
      {#if userData.isCurrentUserProfile}
        <a href="/settings" rel="prefetch" class="button button_outlined">
          Settings
        </a>
      {/if}
    </div>
  </header>

  <slot />
</main>

<script context="module">
  export async function preload(page, session) {
    let { username } = page.params;

    let getUserDataRequest = await this.fetch(`/api/user?username=${username}`);

    if (!getUserDataRequest.ok) return this.error(404, 'User not found');

    let userData = await getUserDataRequest.json();

    userData.isCurrentUserProfile =
      userData.id === (session.user && session.user.id);

    return { userData };
  }
</script>

<script>
  import { articleCreatedAt } from 'utils/date-formatting';

  import { userStore } from './_stores.js';

  export let userData;

  $: {
    userStore.reset();
    userStore.addData(userData);
  }
</script>

<style>
  main {
    display: grid;
    grid-template-rows: repeat(2, max-content);
    gap: var(--text-side);
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  header {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: var(--text-side);
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
