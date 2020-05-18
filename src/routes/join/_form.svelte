<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group">
    <AutoCheckField
      src="api/check/signup/username"
      label="Username"
      id="username"
      name="username"
      required
    >
      <input
        bind:value="{$dataForm.username}"
        id="username"
        type="text"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Username"
      />
    </AutoCheckField>
  </div>

  <div class="form_group">
    <AutoCheckField
      src="api/check/signup/email"
      label="Email"
      id="email"
      name="email"
      autocomplete="new-password"
      required
    >
      <input
        bind:value="{$dataForm.email}"
        id="email"
        type="email"
        placeholder="Email"
        autocomplete="off"
        spellcheck="false"
      />
    </AutoCheckField>
  </div>

  <div class="form_group">
    <FieldWithLabel label="Password" id="password">
      <input
        bind:value="{$dataForm.password}"
        id="password"
        type="password"
        minlength="6"
        maxlength="64"
        autocomplete="new-password"
        placeholder="Password"
      />
    </FieldWithLabel>
  </div>

  <div class="form_group form_buttons">
    <button disabled="{!$isFormValid}">Sign up</button>
  </div>
</form>

<script>
  import { goto, stores } from '@sapper/app';

  import { request } from 'api.js';
  import { dataForm, isFormValid } from './_stores';
  import AutoCheckField from './_auto-check.svelte';
  import FieldWithLabel from 'components/form/field/label.svelte';

  const { session } = stores();

  async function handleSubmit() {
    let data = $dataForm;

    await request('POST', 'user', { body: data });

    let loginReq = await request('POST', 'session', {
      body: {
        username: data.username,
        password: data.password
      }
    });

    $session.user = loginReq.data;
    goto('/');
  }
</script>
