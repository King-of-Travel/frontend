<form on:submit|preventDefault="{handleSubmit}" class="form" autocomplete="off">
  <div class="form_group">
    <AutoCheckField
      bind:value="{data.username}"
      bind:error="{$dataErrors.username}"
      src="api/check/signup/username"
      label="Username"
      type="text"
      id="username"
      name="username"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      required
    />
  </div>
  <div class="form_group">
    <AutoCheckField
      bind:value="{data.email}"
      bind:error="{$dataErrors.email}"
      src="api/check/signup/email"
      label="Email"
      type="email"
      id="email"
      name="email"
      autocomplete="off"
      spellcheck="false"
      required
    />
  </div>
  <div class="form_group">
    <AutoCheckField
      bind:value="{data.password}"
      bind:error="{$dataErrors.password}"
      src="api/check/signup/password"
      label="Password"
      type="password"
      id="password"
      name="password"
      autocomplete="new-password"
      required
    />
  </div>
  <div class="form_group form_buttons">
    <button disabled="{!$isFormValid}">Sign up</button>
  </div>
</form>

<script>
  import { goto, stores } from '@sapper/app';
  import { request } from 'api.js';
  import { dataForm, dataErrors, isFormValid } from './_stores';
  import AutoCheckField from 'components/text-field/auto-check.svelte';

  const { session } = stores();

  const data = $dataForm;

  async function handleSubmit() {
    await request('POST', 'user', data);

    const loginReq = await request('POST', 'session', {
      username: data.username,
      password: data.password
    });

    $session.user = loginReq.data;
    goto('/');
  }
</script>
