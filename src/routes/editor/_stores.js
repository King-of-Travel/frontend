import { writable, derived } from 'svelte/store';

export let articleData = writable({
  title: '',
  body: []
});

export let articleTextLength = writable(0);

export const isFormValid = derived(
  [articleData, articleTextLength],
  ([$articleData, $articleTextLength]) => {
    if (!$articleData.title) return false;

    if (!$articleData.body.length) return false;

    if ($articleTextLength > 20000) return false;

    return true;
  }
);
