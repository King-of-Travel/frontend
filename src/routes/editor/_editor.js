import EditorJS from '@editorjs/editorjs';
import header from '@editorjs/header';
import table from '@editorjs/table';
import marker from '@editorjs/marker';
import list from '@editorjs/list';

class customHeader extends header {
  get levels() {
    return super.levels.filter(l => [2, 3].includes(l.number));
  }

  get defaultLevel() {
    return this.levels[0];
  }
}

function createEditor({ holder, config }) {
  return new EditorJS({
    holder,
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
}

export { createEditor };
