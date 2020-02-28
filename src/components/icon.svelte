<svg
  {viewBox}
  width="{size}"
  height="{size}"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="{color}"
  stroke-width="2"
  stroke-linecap="round"
>
  {#if name}
    <svelte:component this="{icons[name]}" />
  {:else}
    <slot />
  {/if}
</svg>

<script>
  import heart from 'components/icons/heart.svelte';
  import settings from 'components/icons/settings.svelte';
  import check from 'components/icons/check.svelte';
  import chevronDown from 'components/icons/chevron-down.svelte';
  import chevronUp from 'components/icons/chevron-up.svelte';
  import loader from 'components/icons/loader.svelte';
  import share from 'components/icons/share.svelte';
  import x from 'components/icons/x.svelte';
  import trash from 'components/icons/trash.svelte';

  export let name = '',
    size = 24,
    color = 'currentColor',
    viewBox = '0 0 24 24';

  let icons = {
    'chevron-up': chevronUp,
    'chevron-down': chevronDown,
    heart,
    settings,
    check,
    loader,
    share,
    x,
    trash
  };
</script>
