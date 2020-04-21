{#if isOpen}
  <div
    bind:this="{contentElement}"
    transition:fly="{{ y: contentElement.offsetHeight, duration: 200 }}"
    class="content"
  >
    <header on:click|stopPropagation="{closeCard}" class="{headerClass}">
      <slot name="header" />
    </header>
    <slot />
  </div>

  <div
    on:click="{closeCard}"
    transition:fade="{{ duration: 200 }}"
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
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(2.5px);
  }

  .background::after {
    content: '';
  }

  .content {
    z-index: 101;
    padding: 10px 20px;
    background-color: var(--base-background);
    border-top: 1px solid var(--base-border);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  header {
    padding-bottom: 10px;
  }
</style>
