import {Command} from "prosemirror-state";
import {schema} from "../model/schema";

export const headingCommand: Command = (state, dispatch) => {
  const prevTextContent = state.selection.$head.parent.textContent;
  const isHeadingCommand = prevTextContent.split('').every(c => c === "#");

  if (prevTextContent.length < 4 && isHeadingCommand && dispatch) {
    const from = state.selection.$head.pos - prevTextContent.length;
    const to = state.selection.$head.pos;
    const header = schema.nodes.heading.createAndFill({level: prevTextContent.length});

    const tr = state.tr;
    tr.replaceWith(from - 1, to, header);
    dispatch(tr);

    return false;
  }

  return false;
}
