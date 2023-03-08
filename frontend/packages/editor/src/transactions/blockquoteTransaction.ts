import {EditorState, TextSelection, Transaction} from "prosemirror-state";
import {schema} from "@src/model";

export function blockquoteTransaction(state: EditorState, prevTextLength: number): Transaction | null {
  const blockquote = schema.nodes.blockquote.createAndFill();

  if (!blockquote) return null;

  const from = state.selection.$head.pos - prevTextLength - 1;
  const to = state.selection.$head.pos + 1;

  const {tr} = state;
  tr.replaceWith(from, to, blockquote);
  tr.setSelection(new TextSelection(tr.doc.resolve(from), tr.doc.resolve(from)));

  return tr;
}
