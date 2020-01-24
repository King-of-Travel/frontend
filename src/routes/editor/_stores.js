import { writable, derived } from 'svelte/store';

export let articleData = writable({
  title: '',
  body: []
});

export const isFormValid = derived(articleData, $articleData => {
  if (!$articleData.title) return false;

  return true;
});
