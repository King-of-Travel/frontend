import { writable, derived } from 'svelte/store';

export let dataForm = writable({
  countryCode: null,
  city: '',
  startDate: null,
  endDate: null
});

export let isFormValid = derived(dataForm, $data => {
  if (!$data.countryCode || !$data.city) return false;

  return true;
});
