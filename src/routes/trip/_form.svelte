<ListErrors {errors} />
<form on:submit|preventDefault="{handleSubmit}" class="form" novalidate>
  <div class="form_group">
    <FieldWithLabel label="Country" id="country">
      <FieldSelect
        bind:value="{$dataForm.countryCode}"
        items="{Countries}"
        isVirtualList="{true}"
        listAutoWidth="{false}"
        inputAttributes="{{ id: 'country', name: 'country' }}"
        placeholder="Country trip"
      />
    </FieldWithLabel>
  </div>
  <div class="form_group">
    <FieldWithLabel label="City" id="city">
      <input
        bind:value="{$dataForm.city}"
        id="city"
        name="city"
        type="text"
        placeholder="City trip"
        autocomplete="off"
        maxlength="300"
      />
    </FieldWithLabel>
  </div>
  <div class="form_group">
    <FieldWithLabel label="Start and end date of the trip" id="date">
      <DatePicker
        options="{{ mode: 'range', onChange: changeDate }}"
        id="date"
        name="date-range"
        placeholder="Date"
      />
    </FieldWithLabel>
  </div>

  <div class="form_group form_buttons">
    <button disabled="{!$isFormValid}">Add</button>
  </div>
</form>

<script>
  import { goto } from '@sapper/app';

  import FieldWithLabel from 'components/form/label.svelte';
  import FieldSelect from 'components/form/select.svelte';
  import DatePicker from 'components/form/date-picker/index.svelte';
  import ListErrors from 'components/list-errors.svelte';
  import Countries from 'components/locales/countries/en.json';
  import { request } from 'request/api';

  import { dataForm, isFormValid } from './_stores.js';

  let errors = {};

  function changeDate(date) {
    $dataForm.startDate = date[0];
    $dataForm.endDate = date[1];
  }

  async function handleSubmit() {
    let addTripReq = await request('POST', 'trip', { body: $dataForm });

    if (!addTripReq.ok) {
      errors = addTripReq.data.errors;
      return;
    }

    goto('/profile/trips');
  }
</script>
