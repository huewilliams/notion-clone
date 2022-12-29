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
      content: "text*",
      group: 'block',
      toDOM(node) {
        return ['h' + node.attrs.level, 0]
      }
    },
    text: {
      group: 'inline'
    },
  },
});
