<form on:submit|preventDefault="{handleSubmit}" class="form">
  <div class="form_group editor">
    <textarea
      use:changeHeightTextArea
      on:keypress="{focusEditorPressEnter}"
      bind:value="{$article.title}"
      placeholder="My trip to Moscow"
      rows="1"
      minlength="3"
      maxlength="120"
    ></textarea>
    <div id="editorjs" class="editor__container"></div>
  </div>

  {#if isSettingsOpen}
    <div class="form_group settings-block">
      <div class="form_group">
        <FieldWithLabel id="country" label="The country you are writing about">
          <FieldSelect
            bind:value="{$article.countryCode}"
            defaultSelected="{defaultCountryCode}"
            items="{Countries}"
            isVirtualList="{true}"
            listAutoWidth="{false}"
            inputAttributes="{{ id: 'country', name: 'country' }}"
            placeholder="Russian Federation"
          />
        </FieldWithLabel>

      </div>

      <div class="form_group">
        <FieldWithLabel label="The city you are writing about" id="city">
          <input
            bind:value="{$article.city}"
            id="city"
            type="text"
            placeholder="Moscow"
            autocomplete="off"
            maxlength="300"
          />
        </FieldWithLabel>
      </div>

      <div class="form_group">
        <Tags />
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

  import { article } from '../_stores.js';
  import FieldWithLabel from 'components/form/field/label.svelte';
  import FieldSelect from 'components/form/field/select.svelte';
  import Countries from 'components/locales/countries/en.json';
  import Icon from 'components/icon.svelte';
  import Tags from './tags.svelte';

  let isNewArticle = $article.id ? false : true;

  let defaultCountryCode =
    $article.countryCode &&
    Countries.find(country => country.value === $article.countryCode);

  $: isFormValid = $article.title.length >= 3;

  let editor;

  let isSettingsOpen = false;

  onMount(async () => {
    let { createEditor } = await import('./editor.js');

    editor = createEditor({
      holder: 'editorjs',
      config: {
        data: { blocks: $article.body }
      }
    });
  });

  function changeHeightTextArea(element) {
    function change() {
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + 'px';
    }

    change();

    element.addEventListener('input', change);

    return {
      destroy() {
        element.removeEventListener('input', change);
      }
    };
  }

  async function handleSubmit() {
    let editorData = await editor.save();

    article.saveArticle(editorData.blocks);
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
    padding: 15px var(--editor-padding);
    overflow: hidden;
    font-size: var(--base-h1);
    font-weight: 700;
    resize: none;
    border: none;
  }

  textarea::-webkit-input-placeholder {
    line-height: 1.2;
  }

  .settings-block {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    margin: 30px auto;
    border-radius: var(--base-border-r);
    box-shadow: var(--base-box-shadow);
  }

  .form_buttons {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }

  .button__open-settings {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
