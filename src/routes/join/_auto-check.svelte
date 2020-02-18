<auto-check {src} {required} csrf="none" bind:this="{element}">
  <TextField {label} {id} bind:error="{$dataErrors[name]}">
    <slot />
  </TextField>
</auto-check>

<script>
  import { onMount } from 'svelte';

  import { dataForm, dataErrors } from './_stores';
  import TextField from 'components/text-field/index.svelte';

  export let src,
    required = false,
    name,
    label,
    id;

  let element;

  $: if ($dataForm[name].length === 0) $dataErrors[name] = '';

  onMount(async () => {
    await import('@github/auto-check-element');

    element.addEventListener('auto-check-success', () => {
      $dataErrors[name] = '';
    });

    element.addEventListener('auto-check-error', async event => {
      let { response } = event.detail;

      $dataErrors[name] = await response.text();
    });
  });
</script>
