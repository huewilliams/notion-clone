import {EditorState, TextSelection} from "prosemirror-state";
import {schema} from "@src/model";

export function bulletListTransaction(state: EditorState, isInsert: boolean = false) {
  const listItem = schema.nodes.listItem.createAndFill();
  const bulletList = schema.nodes.bulletList.createAndFill(null, listItem);
  if (!bulletList || !listItem) return null;

  const from = state.selection.$head.pos - (isInsert ? 3 : 2);
  const to = state.selection.$head.pos + 1;

  const {tr} = state;
  tr.replaceWith(from, to, bulletList);
  const pos = tr.doc.resolve(isInsert ? to : from);
  tr.setSelection(new TextSelection(pos));

  return tr;
}
