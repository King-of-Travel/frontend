import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export function createStoreForArticles({ downloadArticles }) {
  let defaultValue = () => ({
    articles: [],
    isLoading: false,
    isLoaded: false
  });

  let articlesStore = writable(defaultValue());

  function updateOneValue(name, value) {
    articlesStore.update(store => {
      store[name] = value;

      return store;
    });
  }

  function addArticles(newArticles) {
    articlesStore.update(articlesStore => {
      articlesStore.articles.push(...newArticles);

      return articlesStore;
    });
  }

  function reset() {
    articlesStore.set(defaultValue());
  }

  async function downloadFollowingArticles(options) {
    let store = get(articlesStore);

    if (store.isLoaded || store.isLoading) return;

    updateOneValue('isLoading', true);

    let offset = store.articles.length;

    let newArticles = await downloadArticles({ offset, ...options });

    if (newArticles.length < 20) {
      updateOneValue('isLoaded', true);
    }

    addArticles(newArticles);

    updateOneValue('isLoading', false);
  }

  return {
    subscribe: articlesStore.subscribe,
    reset,
    addArticles,
    downloadFollowingArticles
  };
}
