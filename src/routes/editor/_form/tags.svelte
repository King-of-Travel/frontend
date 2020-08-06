<FieldWithLabel label="Tags" id="tags">
  <input
    bind:this="{inputElement}"
    on:keypress="{add}"
    id="tags"
    disabled="{tags.length > 5}"
    type="text"
    placeholder="food, finance"
    autocomplete="off"
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    minlength="2"
    maxlength="15"
  />
</FieldWithLabel>

{#if tags.length}
  <div class="tag-list">
    {#each tags as tagName (tagName)}
      <button
        in:fade="{{ duration: 200 }}"
        on:click="{() => article.deleteTag(tagName)}"
        class="tag button"
        type="button"
        title="Click to remove tag"
      >
        {tagName}
      </button>
    {/each}
  </div>
{/if}

<script>
  import { fade } from 'svelte/transition';

  import FieldWithLabel from 'components/form/label.svelte';

  import { article } from '../_stores.js';

  $: tags = [...$article.tags];

  let inputElement;

  function add(event) {
    if (event.keyCode !== 13) return;
    event.preventDefault();

    let value = event.target.value;

    event.target.value = '';

    article.addTag(value);
  }
</script>

<style>
  .tag {
    padding: 5px 10px;
    margin: 10px 5px 0 0;
  }
</style>
