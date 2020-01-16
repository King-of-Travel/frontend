<auto-check {src} {required} csrf="none" bind:this="{element}">
  <TextField {...exclude($$props, ['value','src', 'error' ])} bind:value={value}
  bind:error="{error}" />
</auto-check>

<script>
  import { onMount } from 'svelte';
  import { exclude } from 'common/exclude';
  import TextField from './index.svelte';

  export let src,
    value,
    required = false,
    error;

  let element;

  $: if (value.length === 0) error = '';

  onMount(async () => {
    await import('@github/auto-check-element');

    element.addEventListener('auto-check-success', () => {
      error = '';
    });

    element.addEventListener('auto-check-error', async event => {
      const { response } = event.detail;
      const message = await response.text();

      error = message;
    });
  });
</script>
