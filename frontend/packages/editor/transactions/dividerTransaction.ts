import {Transaction} from "prosemirror-state";
import {schema} from "../model/schema";

export function dividerTransaction(tr: Transaction): Transaction | null {
  const divider = schema.nodes.divider.createAndFill();
  if (!divider) return tr;

  const from = tr.selection.$head.start();
  const to = tr.selection.$head.end();

  tr.split(tr.selection.$head.pos);
  tr.replaceWith(from - 1, to, divider);

  return tr;
}
