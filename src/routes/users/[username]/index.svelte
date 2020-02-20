<svelte:head>
  <title>Profile: {user.username} / King of Travel</title>
</svelte:head>

<main class="center-content">
  <header>
    <div class="left-block">
      <h1>
        {#if user.actualName}
          <span>{user.actualName}</span>
        {/if}
        <span class="nickname" title="Nickname">{user.username}</span>
      </h1>
      <div class="meta">
        Registered:
        {@html articleCreatedAt(user.createdAt)}
      </div>
    </div>

    <div class="right-block">
      {#if isCurrentUserProfile}
        <a href="/settings" rel="prefetch" class="button outlined">Settings</a>
      {/if}
    </div>
  </header>

  <TabsContainer>
    <TabList>
      <Tab>Articles</Tab>
    </TabList>

    <TabPanel>
      <ArticlesList
        {articles}
        requestConfig="{{ path: 'user/articles', query: `userId=${user.id}` }}"
      />
    </TabPanel>
  </TabsContainer>
</main>

<script context="module">
  export async function preload(page, session) {
    let { username } = page.params;

    let getUserData = await this.fetch(`/api/user?username=${username}`);
    if (!getUserData.ok) return this.error(404, 'User not found');
    let userData = await getUserData.json();

    let getArticles = await this.fetch(
      `/api/user/articles?userId=${userData.id}&limit=10`
    );
    let articles = await getArticles.json();

    let isCurrentUserProfile =
      userData.id === (session.user && session.user.id);

    return {
      user: userData,
      isCurrentUserProfile,
      articles
    };
  }
</script>

<script>
  import { Tab, TabList, TabPanel } from 'svelte-tabs';
  import { articleCreatedAt } from 'date-formatting';

  import TabsContainer from 'components/tabs/container.svelte';
  import ArticlesList from 'components/article/list.svelte';

  export let user, isCurrentUserProfile, articles;
</script>

<style>
  main {
    display: grid;
    grid-template-rows: min-content min-content;
    grid-gap: 20px;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  header {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 15px;
    margin-bottom: 15px;
  }

  .left-block > h1 {
    font-size: var(--base-h5);
  }

  .left-block .nickname::before {
    content: '@';
    margin-right: 2px;
  }

  .left-block .meta {
    margin-top: 5px;
    font-size: var(--base-h6);
  }

  .right-block {
    text-align: end;
  }

  .right-block .button {
    padding: 5px 10px;
    font-size: var(--base-h6);
  }
</style>
