import { writable } from 'svelte/store';

import { request } from 'request/api';
import { createStoreForArticles } from 'components/article/model';

function createUserProfileStore() {
  let defaultValue = () => null;

  let userStore = writable(defaultValue());

  function reset() {
    userStore.set(defaultValue());
  }

  function addData(userData) {
    userStore.set(userData);
  }

  return {
    subscribe: userStore.subscribe,
    addData,
    reset
  };
}

export let userStore = createUserProfileStore();

export function queryToGetNewArticle({ username, offset = 0 }) {
  return `user/articles?username=${username}&offset=${offset}`;
}

async function downloadArticles({ username, offset }) {
  let requestNewArticles = await request(
    'GET',
    queryToGetNewArticle({ username, offset })
  );

  return requestNewArticles.data;
}

export let articlesStore = createStoreForArticles({ downloadArticles });
