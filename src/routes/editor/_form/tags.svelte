<svelte:options immutable="{true}" />

<FieldWithLabel label="Tags" id="tags">
  <input
    bind:this="{inputElement}"
    on:keypress="{add}"
    disabled="{tags.length > 5}"
    id="tags"
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
    {#each tags as tag, i}
      <button
        in:fade="{{ duration: 200 }}"
        on:click="{() => remove(i)}"
        class="tag button"
        type="button"
        title="Click to remove tag"
      >
        {tag.value}
      </button>
    {/each}
  </div>
{/if}

<script>
  import { fade } from 'svelte/transition';

  import FieldWithLabel from 'components/form/field/label.svelte';

  export let tags;

  let inputElement;

  function add(element) {
    if (element.keyCode !== 13) return;
    element.preventDefault();

    let value = element.target.value;

    if (value.length < 2) return;
    if (tags.find(tag => tag === value)) return;

    tags = [...tags, { value }];

    element.target.value = '';
  }

  function remove(index) {
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    inputElement.focus();
  }
</script>

<style>
  .tag {
    padding: 5px 10px;
    margin: 10px 5px 0 0;
  }
</style>
