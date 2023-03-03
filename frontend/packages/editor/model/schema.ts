import {Schema} from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+',
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{tag: "p"}],
      toDOM() {
        return ['p', 0]
      }
    },
    heading: {
      attrs: {level: {default: 1}},
      content: 'text*',
      group: 'block',
      toDOM(node) {
        return ['h' + node.attrs.level, 0]
      }
    },
    blockquote: {
      content: 'text*',
      group: 'block',
      toDOM() {
        return ['blockquote', {class: "editor-blockquote"}, 0]
      }
    },
    text: {
      group: 'inline'
    },
    inlineCode: {
      inline: true,
      content: 'text*',
      group: 'inline',
      toDOM() {
        return ['span', {class: "editor-inlineCode"}, 0]
      }
    },
  },
  marks: {
    code: {
      toDOM() {return ["code", {class: "editor-inlineCode"}]}
    }
  }
});
