import {Transaction} from "prosemirror-state";
import {schema} from "@src/model";

export function dividerTransaction(tr: Transaction, deleteTextLength: number): Transaction | null {
  const divider = schema.nodes.divider.createAndFill();
  if (!divider) return tr;

  const to = tr.selection.$head.end();

  tr.split(tr.selection.$head.pos);
  tr.replaceWith(to - deleteTextLength, to, divider);

  return tr;
}
