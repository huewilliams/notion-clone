import {EditorState, TextSelection, Transaction} from "prosemirror-state";
import {schema} from "../model/schema";

export function headerTransaction(state: EditorState, prevTextLength: number): Transaction | null {
  const header = schema.nodes.heading.createAndFill({level: prevTextLength});
  if (!header) return null;

  const from = state.selection.$head.pos - prevTextLength - 1;
  const to = state.selection.$head.pos + 1;

  const {tr} = state;
  tr.replaceWith(from, to, header);
  tr.setSelection(new TextSelection(tr.doc.resolve(from), tr.doc.resolve(from)));

  return tr;
}
