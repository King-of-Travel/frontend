<auto-check {src} {required} csrf="none" bind:this="{element}">
  <FieldWithLabel {label} {id} bind:error="{$dataErrors[name]}">
    <slot />
  </FieldWithLabel>
</auto-check>

<script>
  import { onMount } from 'svelte';

  import { dataForm, dataErrors } from './_stores';
  import FieldWithLabel from 'components/form/field/label.svelte';

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
