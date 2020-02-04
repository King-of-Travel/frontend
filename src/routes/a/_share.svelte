{#if show}
  <button on:click="{share}" class="button share">
    <Icon size="18">
      <ShareIcon />
    </Icon>
  </button>
{/if}

<script>
  import { getContext } from 'svelte';
  import { onMount } from 'svelte';

  import Icon from 'components/icon.svelte';
  import ShareIcon from 'components/icons/share.svelte';

  let { title } = getContext('article');

  let show = false;

  onMount(() => {
    if (navigator.share) show = true;
  });

  function share() {
    navigator.share({
      title,
      url: window.location.href
    });
  }
</script>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background: transparent;
  }
</style>
