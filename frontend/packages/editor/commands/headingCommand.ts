import {Command, TextSelection} from "prosemirror-state";
import {schema} from "../model/schema";

export const headingCommand: Command = (state, dispatch) => {
  const prevTextContent = state.selection.$head.parent.textContent;
  const isHeadingCommand = prevTextContent.length > 0 && prevTextContent.split('').every(c => c === "#");

  if (prevTextContent.length < 4 && isHeadingCommand && dispatch) {
    const from = state.selection.$head.pos - prevTextContent.length;
    const to = state.selection.$head.pos;
    const header = schema.nodes.heading.createAndFill({level: prevTextContent.length});

    if (!header) return false;

    const tr = state.tr;
    tr.replaceWith(from - 1, to, header);
    tr.setSelection(new TextSelection(tr.doc.resolve(from - 1), tr.doc.resolve(from - 1)));
    dispatch(tr);

    return true;
  }

  return false;
}
