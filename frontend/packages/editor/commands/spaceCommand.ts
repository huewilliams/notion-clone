import {Command, TextSelection} from "prosemirror-state";
import {schema} from "../model/schema";

export const spaceCommand: Command = (state, dispatch) => {
  if (!dispatch) return false;

  const prevTextContent = state.selection.$head.parent.textContent;
  const isHeadingCommand = prevTextContent.length > 0 && prevTextContent.length < 4 &&
    prevTextContent.split('').every(c => c === "#");
  const isBlockquoteCommand = prevTextContent.length === 1 && prevTextContent === '"';

  const from = state.selection.$head.pos - prevTextContent.length;
  const to = state.selection.$head.pos;

  if (isHeadingCommand) {
    const header = schema.nodes.heading.createAndFill({level: prevTextContent.length});
    if (!header) return false;

    const tr = state.tr;
    tr.replaceWith(from - 1, to, header);
    tr.setSelection(new TextSelection(tr.doc.resolve(from - 1), tr.doc.resolve(from - 1)));
    dispatch(tr);

    return true;
  }

  if (isBlockquoteCommand) {
    const blockquote = schema.nodes.blockquote.createAndFill();
    if (!blockquote) return false;

    const tr = state.tr;
    tr.replaceWith(from - 1, to, blockquote);
    dispatch(tr);

    return true;
  }

  return false;
}
