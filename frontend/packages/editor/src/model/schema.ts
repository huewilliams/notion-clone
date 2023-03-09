import {Schema} from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: {
      content: '(block | test)+',
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{tag: "p"}],
      toDOM() { return ['p', 0] }
    },
    heading: {
      attrs: {level: {default: 1}},
      content: 'inline*',
      group: 'block',
      toDOM(node) { return ['h' + node.attrs.level, 0] }
    },
    blockquote: {
      content: 'inline*',
      group: 'block',
      toDOM() { return ['blockquote', {class: "editor-blockquote"}, 0] }
    },
    divider: {
      group: 'test',
      selectable: false,
      toDOM() { return ['div', {class: "editor-divider"}, ['hr']] }
    },
    text: {
      group: 'inline'
    },
    link: {
      content: 'text*',
      selectable: false,
      attrs: {href: {default: ''}},
      inline: true,
      group: 'inline',
      toDOM(node) { return ['a', {class: "editor-link", href: node.attrs.href, contentEditable: false}, 0]}
    },
  },
  marks: {
    inlineCode: {
      toDOM() {return ["code", {class: "editor-inlineCode"}]}
    },
  }
});
