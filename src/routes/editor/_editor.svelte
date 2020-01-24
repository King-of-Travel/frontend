<div on:input="{handleInput}" id="editorjs"></div>

<script>
  import { onMount } from 'svelte';
  import { articleData, articleTextLength } from './_stores.js';

  export let config = {};

  let editor;

  onMount(async () => {
    let EditorJS = await import('@editorjs/editorjs').then(m => m.default);
    let header = await import('@editorjs/header').then(m => m.default);
    let table = await import('@editorjs/table').then(m => m.default);
    let marker = await import('@editorjs/marker').then(m => m.default);
    let list = await import('@editorjs/list').then(m => m.default);

    class customHeader extends header {
      get levels() {
        return super.levels.filter(l => [2, 3].includes(l.number));
      }

      get defaultLevel() {
        return this.levels[0];
      }
    }

    editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'I have been to Moscow and want to tell you about...',
      tools: {
        header: {
          class: customHeader,
          shortcut: 'CMD+SHIFT+H'
        },
        marker: {
          class: marker,
          shortcut: 'CMD+SHIFT+M'
        },
        table,
        list
      },
      ...config
    });
  });

  function strip(html) {
    let parser = new DOMParser().parseFromString(html, 'text/html');
    return parser.body.textContent || '';
  }

  function handleInput() {
    editor.save().then(data => {
      let textLength = 0;

      data.blocks.map(block => {
        if (block.type == 'paragraph') {
          textLength += strip(block.data.text).length;
        }
      });

      $articleTextLength = textLength;
      $articleData.body = data.blocks;
    });
  }
</script>

<style>
  div {
    min-height: 350px;
    cursor: text;
  }

  div :global(.ce-block__content, .ce-toolbar__content) {
    max-width: var(--editor-width);
  }
</style>
