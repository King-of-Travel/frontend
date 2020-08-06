import { writable, derived } from 'svelte/store';

import { checkFieldForErrors } from 'utils/validator';

export const dataForm = writable({ username: '', email: '', password: '' });
export const dataErrors = writable({ username: '', email: '', password: '' });

export const isFormValid = derived([dataForm, dataErrors], ([data, errors]) => {
  return checkFieldForErrors(data, errors);
});
