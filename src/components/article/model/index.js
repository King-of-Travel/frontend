import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export function createStoreForArticles({ downloadArticles }) {
  let articles = writable([]);

  let isLoaded = false;

  function addArticles(newArticles) {
    articles.update(articles => {
      return articles.concat(newArticles);
    });
  }

  function reset() {
    articles.set([]);
  }

  async function downloadFollowingArticles(options) {
    if (isLoaded) return;

    let offset = get(articles).length;

    let newArticles = await downloadArticles({ offset, ...options });

    if (newArticles.length < 20) {
      isLoaded = true;
    }

    addArticles(newArticles);
  }

  return {
    subscribe: articles.subscribe,
    reset,
    addArticles,
    downloadFollowingArticles,
    isLoaded
  };
}
