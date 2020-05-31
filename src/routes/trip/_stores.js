import { writable, derived } from 'svelte/store';

export let dataForm = writable({
  countryCode: null,
  city: '',
  startDate: null,
  endDate: null
});

export let isFormValid = derived(dataForm, $data => {
  if (!$data.countryCode || !$data.city || !$data.startDate || !$data.endDate) {
    return false;
  }

  return true;
});
