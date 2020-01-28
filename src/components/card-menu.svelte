{#if isOpen}
  <div
    bind:this="{contentElement}"
    transition:fly="{{ y: contentElement.offsetHeight, duration: 300 }}"
    class="content"
  >
    <header on:click|stopPropagation="{closeCard}" class="{headerClass}">
      <slot name="header" />
    </header>
    <slot />
  </div>

  <div
    on:click="{closeCard}"
    transition:fade="{{ duration: 300 }}"
    class="background"
  ></div>
{/if}

<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  export let isOpen = false,
    headerClass = undefined;

  let dispatch = createEventDispatcher();

  let contentElement;

  $: {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = null;
      }
    }
  }

  function closeCard() {
    dispatch('close');
  }
</script>

<style>
  div {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .background {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    overflow: hidden;
  }

  .content {
    padding: 10px 20px;
    background-color: var(--base-background);
    border-top: 1px solid var(--base-border);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 101;
  }

  header {
    padding-bottom: 10px;
  }
</style>
