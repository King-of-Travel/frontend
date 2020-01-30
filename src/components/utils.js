import { bubble, listen } from 'svelte/internal';

/*
 * Author
 * https://gitlab.com/az67128/svelte-atoms/blob/master/src/components/utils.js
 */
export function getEventsAction(component) {
  return node => {
    let events = Object.keys(component.$$.callbacks);
    let listeners = [];

    events.forEach(event =>
      listeners.push(listen(node, event, e => bubble(component, e)))
    );

    return {
      destroy: () => {
        listeners.forEach(listener => listener());
      }
    };
  };
}

export function getAttributesAction(component) {
  function isSet(value) {
    return value !== undefined && value !== false && value !== null;
  }

  function getArrayFromString(value) {
    if (typeof value != 'string') return [];
    return value
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
  }

  return (node, mixed) => {
    let props = component.$$.props;

    let attributes = Object.keys(mixed).filter(
      name => props.indexOf(name) === -1
    );

    let lastClasslist = [];

    let updateClasses = list => {
      let currentClasslist = [];
      if (isSet(list['class']))
        currentClasslist = currentClasslist.concat(
          getArrayFromString(list['class'])
        );

      for (let i in lastClasslist) {
        if (currentClasslist.indexOf(lastClasslist[i]) === -1)
          node.classList.remove(lastClasslist[i]);
      }

      for (let i in currentClasslist) {
        if (lastClasslist.indexOf(currentClasslist[i]) === -1)
          node.classList.add(currentClasslist[i]);
      }

      lastClasslist = currentClasslist;
    };

    let updateAttr = list => {
      attributes.forEach(name => {
        let value = list[name];
        if (name === 'class') {
          updateClasses(list);
        } else {
          if (isSet(value)) node.setAttribute(name, value);
          else node.removeAttribute(name);
        }
      });
    };

    updateAttr(mixed);

    return {
      update: mixed => updateAttr(mixed),
      destroy: () => {
        attributes.forEach(name => {
          node.removeAttribute(name);
        });
      }
    };
  };
}
