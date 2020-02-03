<ListErrors {errors} />
<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group">
    <TextField
      bind:value="{data.username}"
      label="Username or email"
      id="username"
      name="username"
      type="text"
      placeholder="Username or email"
      autocomplete="username"
      autocapitalize="off"
      spellcheck="false"
      minlength="4"
      maxlength="255"
      required
    />
  </div>
  <div class="form_group">
    <TextField
      bind:value="{data.password}"
      label="Password"
      id="password"
      name="password"
      type="password"
      placeholder="Password"
      autocomplete="password"
      minlength="6"
      maxlength="64"
      required
    />
  </div>
  <div class="form_group form_buttons">
    <button class="button">Log in</button>
  </div>
</form>

<script>
  import { goto, stores } from '@sapper/app';
  import { request } from 'api.js';
  import TextField from 'components/text-field/index.svelte';
  import ListErrors from 'components/list-errors.svelte';

  const { session } = stores();

  let data = { username: '', password: '' };
  let errors = {};

  async function handleSubmit() {
    errors = {};

    let loginReq = await request('POST', 'session', data);

    if (!loginReq.ok) {
      errors = loginReq.data.errors;
      return;
    }

    $session.user = loginReq.data;
    goto('/');
  }
</script>
