import {EditorState, TextSelection, Transaction} from "prosemirror-state";
import {schema} from "../model/schema";

export function wrapTransaction(tr: Transaction, state: EditorState): Transaction {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.selection.$head.parent.textContent;
  const lastText = currentTextContent.length > 0 ? currentTextContent[currentTextContent.length - 1] : null;

  const isWhiteSpaceContent = lastText && /\s/g.test(lastText);
  const isSpace = isWhiteSpaceContent && currentTextContent.length > prevTextContent.length;
  const isHeadingCommand = prevTextContent.length > 0 && prevTextContent.split('').every(c => c === "#");
  const isBlockquoteCommand = prevTextContent === '"';

  const from = state.selection.$head.pos - prevTextContent.length;
  const to = state.selection.$head.pos;

  if (isSpace && isHeadingCommand) {
    const header = schema.nodes.heading.createAndFill({level: prevTextContent.length});

    if (!header) return tr;

    tr.replaceWith(from - 1, to + 1, header);
    tr.setSelection(new TextSelection(tr.doc.resolve(from - 1), tr.doc.resolve(from - 1)));
  }

  if (isSpace && isBlockquoteCommand) {
    const blockquote = schema.nodes.blockquote.createAndFill();

    if (!blockquote) return tr;

    tr.replaceWith(from - 1, to + 1, blockquote);
    tr.setSelection(new TextSelection(tr.doc.resolve(from - 1), tr.doc.resolve(from - 1)));
  }

  return tr;
}
