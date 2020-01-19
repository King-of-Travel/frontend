import { writable, derived } from 'svelte/store';

export let dataForm = writable({
  countryCode: null,
  city: '',
  date: { start: null, end: null }
});

export let isFormValid = derived(dataForm, $data => {
  if (!$data.countryCode || !$data.city) return false;

  return true;
});
