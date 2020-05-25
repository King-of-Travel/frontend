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

  searchParams.append('tag', encodeURIComponent(tagName));
  searchParams.append('sort', sort);
  searchParams.append('rating', rating);
  searchParams.append('period', period);
  searchParams.append('offset', offset);
  searchParams.append('limit', limit);

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
