import {Schema} from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+',
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      toDOM() {
        return ['p', 0]
      }
    },
    text: {
      group: 'inline'
    },
  },
});
