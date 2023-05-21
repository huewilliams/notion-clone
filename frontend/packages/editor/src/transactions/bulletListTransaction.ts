import {EditorState, TextSelection} from "prosemirror-state";
import {schema} from "@src/model";

export function bulletListTransaction(state: EditorState) {
  const listItem = schema.nodes.listItem.createAndFill();
  const bulletList = schema.nodes.bulletList.createAndFill(null, listItem);
  if (!bulletList || !listItem) return null;

  const from = state.selection.$head.pos - 2;
  const to = state.selection.$head.pos + 1;

  const {tr} = state;
  tr.replaceWith(from, to, bulletList);
  tr.setSelection(new TextSelection(tr.doc.resolve(from), tr.doc.resolve(from)));

  return tr;
}
