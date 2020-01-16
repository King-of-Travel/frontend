import { writable, derived } from 'svelte/store';
import { checkFieldNoError } from 'common/validate';

export const dataForm = writable({ username: '', email: '', password: '' });
export const dataErrors = writable({ username: '', email: '', password: '' });

export const isFormValid = derived([dataForm, dataErrors], ([data, errors]) => {
  return checkFieldNoError(data, errors);
});
