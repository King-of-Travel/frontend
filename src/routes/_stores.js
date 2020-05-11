import { request } from 'api';

import { createStoreForArticles } from 'components/article/model';

export function queryToGetTopArticle({ period = 'week', offset = 0 }) {
  return `articles?sort=top&period=${period}&offset=${offset}`;
}

export function queryToGetNewArticle({ rating = 0, offset = 0 }) {
  return `articles?sort=new&rating=${rating}&offset=${offset}`;
}

async function downloadArticles({ offset, query: { sort, rating, period } }) {
  let requestNewArticles = await request(
    'GET',
    sort === 'new'
      ? queryToGetNewArticle({ offset, rating })
      : queryToGetTopArticle({ offset, period })
  );

  return requestNewArticles.data;
}

export let articlesStore = createStoreForArticles({
  downloadArticles
});
