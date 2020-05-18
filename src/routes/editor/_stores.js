import { writable, get } from 'svelte/store';
import { goto } from '@sapper/app';

import { request } from 'api.js';

function createArticle() {
  let store = writable(createDefaultValue());

  function createDefaultValue() {
    return {
      title: '',
      countryCode: null,
      city: null,
      tags: new Set()
    };
  }

  function reset() {
    article.set(createDefaultValue());
  }

  function addArticleToEdit(article) {
    let tags = new Set(article.tags.map(tag => tag.value));

    store.set({ ...article, tags });
  }

  async function saveArticle(editorBlocks) {
    let articleStore = get(store);

    let dataToSend = {
      ...articleStore,
      tags: Array.from(articleStore.tags),
      body: editorBlocks
    };

    /* Check that we're editing articles,
     * and not creating a new one
     */
    if (articleStore.id) {
      await request('POST', `article/edit?id=${articleStore.id}`, {
        body: dataToSend
      });

      goto(`/${articleStore.id}`);

      return;
    }

    let requestToCreateArticle = await request('POST', 'article', {
      body: dataToSend
    });

    goto(`/${requestToCreateArticle.data}`);
  }

  function addTag(tagName) {
    tagName = tagName.replace(/\s+/g, '');

    let articleStore = get(store);

    if (articleStore.tags.has(tagName)) return;

    store.update(article => {
      article.tags.add(tagName);

      return article;
    });
  }

  function deleteTag(tagName) {
    store.update(article => {
      article.tags.delete(tagName);

      return article;
    });
  }

  return {
    ...store,
    reset,
    addTag,
    deleteTag,
    saveArticle,
    addArticleToEdit
  };
}

export let article = createArticle();
