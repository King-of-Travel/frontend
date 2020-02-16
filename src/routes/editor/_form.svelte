<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group editor">
    <textarea
      on:keypress="{focusEditorPressEnter}"
      bind:value="{article.title}"
      on:input="{changeHeaderHeight}"
      placeholder="{isNewArticle ? 'My trip to Moscow' : defaultArticle.title}"
      rows="1"
      minlength="3"
      maxlength="120"
    ></textarea>
    <div id="editorjs" class="editor__container"></div>
  </div>

  <div class="form_group form_buttons">
    <button disabled="{!isFormValid}">
      {isNewArticle ? 'Publish' : 'Edit'}
    </button>
  </div>
</form>

<script>
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import { request } from 'api.js';

  export let defaultArticle = { title: '', body: [] };

  let article = defaultArticle;

  $: isFormValid = article.title.length >= 3;
  let isNewArticle = article.title ? false : true;

  let editor;

  onMount(async () => {
    let { createEditor } = await import('./_editor.js');

    editor = createEditor({
      holder: 'editorjs',
      config: {
        data: { blocks: article.body }
      }
    });
  });

  function changeHeaderHeight(element) {
    element.target.style.height = '5px';
    element.target.style.height = element.target.scrollHeight + 'px';
  }

  async function handleSubmit() {
    let dataEditor = await editor.save();

    if (isNewArticle) {
      let addArticle = await request('POST', 'article', {
        ...article,
        body: dataEditor.blocks
      });

      return goto(`/a/${addArticle.data}`);
    }

    await request('POST', `article/edit?id=${article.id}`, {
      ...article,
      body: dataEditor.blocks
    });

    goto(`/a/${article.id}`);
  }

  function focusEditorPressEnter(e) {
    if (e.keyCode === 13) {
      editor.focus();
      e.preventDefault();
    }
  }
</script>

<style>
  @import './_editor.css';

  .editor {
    position: relative;
    border-radius: var(--base-border-r);
    box-shadow: var(--base-box-shadow);
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
