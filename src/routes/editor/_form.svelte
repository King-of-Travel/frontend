<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group editor">
    <textarea
      bind:value="{$articleData.title}"
      on:input="{changeHeaderHeight}"
      placeholder="My trip to Moscow"
      rows="1"
      maxlength="120"
    ></textarea>
    <div id="editorjs" class="editor__container"></div>
  </div>

  <div class="form_group form_buttons">
    <button disabled="{!$isFormValid}">Publish</button>
  </div>
</form>

<script>
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import { articleData, isFormValid } from './_stores.js';
  import { request } from 'api.js';

  let editor;

  onMount(async () => {
    let { createEditor } = await import('./_editor.js');

    editor = createEditor('editorjs');
  });

  function changeHeaderHeight(element) {
    element.target.style.height = '5px';
    element.target.style.height = element.target.scrollHeight + 'px';
  }

  async function handleSubmit() {
    let dataEditor = await editor.save();

    let addArticle = await request('POST', 'article', {
      ...$articleData,
      body: dataEditor.blocks
    });

    goto(`/a/${addArticle.data}`);
  }
</script>

<style>
  @import './_editor.css';

  .editor {
    position: relative;
    border-radius: var(--base-border-r);
    box-shadow: 0 0px 30px 0 rgba(44, 62, 80, 0.24);
  }

  textarea {
    width: 100%;
    padding: var(--editor-padding);
    font-weight: 700;
    border: none;
    font-size: var(--base-h1);
    resize: none;
    overflow: hidden;
  }

  .form_buttons {
    margin-top: 20px;
  }
</style>
