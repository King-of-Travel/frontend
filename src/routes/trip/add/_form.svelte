<ListErrors {errors} />
<form on:submit|preventDefault="{handleSubmit}" class="form" novalidate>
  <div class="form_group">
    <TextField label="Country" id="country">
      <Select
        bind:value="{$dataForm.countryCode}"
        items="{Countries}"
        isVirtualList="{true}"
        listAutoWidth="{false}"
        inputAttributes="{{ id: 'country', name: 'country' }}"
        placeholder="Country trip"
      />
    </TextField>
  </div>
  <div class="form_group">
    <TextField label="City" id="city">
      <input
        bind:value="{$dataForm.city}"
        id="city"
        name="city"
        type="text"
        placeholder="City trip"
        autocomplete="off"
        maxlength="300"
      />
    </TextField>
  </div>
  <div class="form_group">
    <TextField label="Date(optional)" id="date">
      <DatePicker
        pickerOptions="{{ mode: 'range', onChange: changeDate }}"
        label="Date(optional)"
        id="date"
        name="date-range"
        placeholder="Choose a start and end date for your trip"
      />
    </TextField>
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
  import Countries from 'components/locales/countries/en.json';

  let errors = {};

  function changeDate(date) {
    $dataForm.startDate = date[0];
    $dataForm.endDate = date[1];
  }

  async function handleSubmit() {
    let addTripReq = await request('POST', 'trip', $dataForm);

    if (!addTripReq.ok) {
      errors = addTripReq.data.errors;
      return;
    }

    goto('/profile/trips');
  }
</script>
