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
      content: 'text*',
      group: 'block',
      toDOM(node) { return ['h' + node.attrs.level, 0] }
    },
    blockquote: {
      content: 'text*',
      group: 'block',
      toDOM() { return ['blockquote', {class: "editor-blockquote"}, 0] }
    },
    divider: {
      group: 'test',
      selectable: false,
      toDOM() { return ['div', ['hr']] }
    },
    text: {
      group: 'inline'
    },
  },
  marks: {
    inlineCode: {
      toDOM() {return ["code", {class: "editor-inlineCode"}]}
    }
  }
});
