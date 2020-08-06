import { writable , get } from 'svelte/store';


export function createStoreForArticles({ downloadArticles }) {
  let defaultValue = () => ({
    articles: [],
    isLoading: false,
    isLoaded: false
  });

  let articlesStore = writable(defaultValue());

  function updateValue(key, value) {
    articlesStore.update(store => {
      store[key] = value;

      return store;
    });
  }

  function addArticles(newArticles) {
    let store = get(articlesStore);
    let articles = store.articles.concat(newArticles);

    updateValue('articles', articles);

    if (articles.length >= 20) return;
    updateValue('isLoaded', true);
  }

  function reset() {
    articlesStore.set(defaultValue());
  }

  async function downloadFollowingArticles(options) {
    let store = get(articlesStore);

    if (store.isLoaded || store.isLoading) return;

    updateValue('isLoading', true);

    let offset = store.articles.length;

    let newArticles = await downloadArticles({ offset, ...options });

    if (newArticles.length < 20) {
      updateValue('isLoaded', true);
    }

    addArticles(newArticles);

    updateValue('isLoading', false);
  }

  return {
    subscribe: articlesStore.subscribe,
    reset,
    addArticles,
    downloadFollowingArticles
  };
}
