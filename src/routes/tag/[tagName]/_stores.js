import { request } from 'api';

import { createStoreForArticles } from 'components/article/model';

export function queryFollowingArticles({
  tagName,
  sort = 'new',
  rating = 0,
  period = 'year',
  offset = 0,
  limit = 20
}) {
  let searchParams = new URLSearchParams('');

  searchParams.set('tag', encodeURIComponent(tagName));
  searchParams.set('sort', sort);
  searchParams.set('rating', rating);
  searchParams.set('period', period);
  searchParams.set('offset', offset);
  searchParams.set('limit', limit);

  return `articles?${searchParams}`;
}

async function downloadArticles(options) {
  let requestNewArticles = await request(
    'GET',
    queryFollowingArticles(options)
  );

  return requestNewArticles.data;
}

export let articlesStore = createStoreForArticles({
  downloadArticles
});
