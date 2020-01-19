<ListErrors {errors} />
<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group">
    <TextField
      component="{Select}"
      bind:value="{$dataForm.countryCode}"
      items="{countries}"
      isVirtualList="{true}"
      listAutoWidth="{false}"
      inputAttributes="{{ id: 'country', name: 'country' }}"
      label="Country"
      id="country"
      placeholder="Country trip"
    />
  </div>
  <div class="form_group">
    <TextField
      bind:value="{$dataForm.city}"
      label="City"
      id="city"
      name="city"
      type="text"
      placeholder="City trip"
      autocomplete="off"
      maxlength="300"
      required
    />
  </div>
  <div class="form_group">
    <TextField
      component="{DatePicker}"
      pickerOptions="{{ mode: 'range', onChange: changeDate }}"
      label="Date(optional)"
      id="date"
      name="date-range"
      placeholder="Choose a start and end date for your trip"
    />
  </div>

  <div class="form_group form_buttons">
    <button disabled="{!$isFormValid}">Add</button>
  </div>
</form>

<script>
  import { goto } from '@sapper/app';
  import { dataForm, isFormValid } from './_stores.js';
  import { request } from 'api.js';

  import TextField from 'components/text-field/index.svelte';
  import Select from 'components/text-field/select.svelte';
  import DatePicker from 'components/text-field/date-picker.svelte';
  import ListErrors from 'components/list-errors.svelte';
  import AllCountries from 'components/locales/countries/en.json';

  let countries = AllCountries.map(country => ({
    value: country.code,
    label: country.name
  }));

  let errors = {};

  function changeDate(date) {
    $dataForm.date = { start: date[0], end: date[1] };
  }

  async function handleSubmit() {
    let addTripReq = await request('POST', 'trip', $dataForm);

    if (!addTripReq.ok) {
      errors = addTripReq.data.errors;
      return;
    }

    goto('/profile');
  }
</script>
