<ListErrors {errors} />
<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group">
    <FieldWithLabel id="username" label="Username or email">
      <input
        bind:value="{data.username}"
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
    </FieldWithLabel>
  </div>
  <div class="form_group">
    <FieldWithLabel id="password" label="Password">
      <input
        bind:value="{data.password}"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        autocomplete="password"
        minlength="6"
        maxlength="64"
        required
      />
    </FieldWithLabel>
  </div>
  <div class="form_group form_buttons">
    <button>Log in</button>
  </div>
</form>

<script>
  import { goto, stores } from '@sapper/app';
  import { request } from 'api.js';

  import FieldWithLabel from 'components/form/field/label.svelte';
  import ListErrors from 'components/list-errors.svelte';

  const { session } = stores();

  let data = { username: '', password: '' };
  let errors = {};

  async function handleSubmit() {
    errors = {};

    let loginReq = await request('POST', 'session', data);

    if (!loginReq.ok) {
      errors = loginReq.data.errors;

      window.navigator.vibrate(2);

      return;
    }

    $session.user = loginReq.data;
    goto('/');
  }
</script>
