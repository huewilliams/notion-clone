import {EditorState, Transaction} from "prosemirror-state";
import {schema} from "../model/schema";

export function wrapTransaction(tr: Transaction, state: EditorState): Transaction {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.doc.textContent;
  const lastText = currentTextContent.length > 0 ? currentTextContent[currentTextContent.length - 1] : null;

  const isNotBackspace = currentTextContent.length > prevTextContent.length;
  const isWhiteSpaceContent = lastText && /\s/g.test(lastText);
  const isHeadingCommand = prevTextContent.split('').every(c => c === "#");

  if (isNotBackspace && isWhiteSpaceContent && isHeadingCommand) {
    const from = state.selection.$head.pos - prevTextContent.length;
    const to = state.selection.$head.pos;
    const header = schema.nodes.heading.createAndFill({level: prevTextContent.length});

    if (!header) return tr;

    tr.replaceWith(from - 1, to + 1, header);
  }

  return tr;
}
