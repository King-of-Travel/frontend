import { writable } from 'svelte/store';
import { request } from 'api';

import { createStoreForArticles } from 'components/article/model';

export let user = writable();

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
