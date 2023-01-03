import {Command} from "prosemirror-state";
import {schema} from "../model/schema";

export const backspaceCommand: Command = (state, dispatch) => {
  const isEmptyContent = state.selection.$head.parent.textContent.length < 1;
  if (!isEmptyContent) return false;

  const from = state.selection.$head.pos;
  const to = state.selection.$head.pos;
  const paragraph = schema.nodes.paragraph.createAndFill();

  if (!paragraph) return false;

  const tr = state.tr;
  tr.replaceWith(from - 1, to, paragraph);
  dispatch(tr);

  return true;
}
