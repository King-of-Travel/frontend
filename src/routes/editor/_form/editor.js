import EditorJS from '@editorjs/editorjs';
import header from '@editorjs/header';
import table from '@editorjs/table';
import marker from '@editorjs/marker';
import list from '@editorjs/list';
import images from '@editorjs/image';

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
      image: {
        class: images,
        config: {
          endpoints: {
            byFile: '/api/article/image'
          }
        }
      },
      table,
      list
    },
    ...config
  });
}

export { createEditor };
