<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group editor">
    <textarea
      bind:value="{$articleData.title}"
      on:input="{changeHeaderHeight}"
      placeholder="My trip to Moscow"
      rows="1"
      maxlength="120"
    ></textarea>
    <Editor />

    <div class="editor__text-length">
      Article length: {$articleTextLength}/20000
    </div>
  </div>

  <div class="form_group form_buttons">
    <button disabled="{!$isFormValid}">Publish</button>
  </div>
</form>

<script>
  import { goto } from '@sapper/app';
  import { articleData, articleTextLength, isFormValid } from './_stores.js';
  import { request } from 'api.js';

  import Editor from './_editor.svelte';

  function changeHeaderHeight(element) {
    element.target.style.height = '5px';
    element.target.style.height = element.target.scrollHeight + 'px';
  }

  async function handleSubmit() {
    let addArticle = await request('POST', 'article', $articleData);

    goto(`/t/${addArticle.data}`);
  }
</script>

<style>
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

  .editor__text-length {
    position: sticky;
    bottom: 0;
    padding: 10px;
    text-align: end;
    user-select: none;
    font-size: calc(var(--base-unit) * 1.5);
    font-weight: 600;
    background-image: linear-gradient(
      170deg,
      rgba(243, 248, 255, 0.03) 63.45%,
      rgba(207, 214, 229, 0.27) 98%
    );
  }

  .form_buttons {
    margin-top: 20px;
  }
</style>
