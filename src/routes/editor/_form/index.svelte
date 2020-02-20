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

  {#if isSettingsOpen}
    <div class="form_group settings-block">
      <div class="form_group">
        <TextField id="country" label="The country you are writing about">
          <Select
            bind:value="{article.countryCode}"
            defaultSelected="{defaultCountryCode}"
            items="{Countries}"
            isVirtualList="{true}"
            listAutoWidth="{false}"
            inputAttributes="{{ id: 'country', name: 'country' }}"
            placeholder="Russian Federation"
          />
        </TextField>

      </div>

      <div class="form_group">
        <TextField label="The city you are writing about" id="city">
          <input
            bind:value="{article.city}"
            id="city"
            type="text"
            placeholder="Moscow"
            autocomplete="off"
            maxlength="300"
          />
        </TextField>
      </div>

      <div class="form_group">
        <Tags bind:tags="{article.tags}" />
      </div>
    </div>
  {/if}

  <div class="form_group form_buttons">
    <button disabled="{!isFormValid}">
      {isNewArticle ? 'Publish' : 'Edit'}
    </button>
    <button
      on:click="{() => (isSettingsOpen = !isSettingsOpen)}"
      type="button"
      class="button button__open-settings"
      title="Article settings"
    >
      <Icon name="settings" size="17" />
    </button>
  </div>
</form>

<script>
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import { request } from 'api.js';

  import TextField from 'components/text-field/index.svelte';
  import Select from 'components/text-field/select.svelte';
  import Countries from 'components/locales/countries/en.json';
  import Icon from 'components/icon.svelte';
  import Tags from './tags.svelte';

  export let defaultArticle = {};

  let article = {
    title: '',
    body: [],
    countryCode: null,
    city: null,
    tags: [],
    ...defaultArticle
  };

  let isNewArticle = article.title ? false : true,
    defaultCountryCode =
      article.countryCode &&
      Countries.find(country => country.value === article.countryCode);

  $: isFormValid = article.title.length >= 3;

  let editor;

  let isSettingsOpen = false;

  onMount(async () => {
    let { createEditor } = await import('./editor.js');

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
      e.preventDefault();
      editor.focus();
    }
  }
</script>

<style>
  @import './editor.css';

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

  .settings-block {
    max-width: 400px;
    width: 100%;
    margin: 30px auto;
    padding: 20px;
    box-shadow: var(--base-box-shadow);
    border-radius: var(--base-border-r);
  }

  .form_buttons {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }

  .button__open-settings {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
