import {EditorState, Transaction} from "prosemirror-state";
import {headerTransaction} from "../transactions/headerTransaction";
import {blockquoteTransaction} from "../transactions/blockquoteTransaction";

export function androidKeymap(tr: Transaction, state: EditorState): Transaction {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.selection.$head.parent.textContent;
  const lastText = currentTextContent.length > 0 ? currentTextContent[currentTextContent.length - 1] : null;

  const isWhiteSpaceContent = lastText && /\s/g.test(lastText);
  const isSpace = isWhiteSpaceContent && currentTextContent.length > prevTextContent.length;
  const isHeadingCommand = prevTextContent.length > 0 && prevTextContent.split('').every(c => c === "#");
  const isBlockquoteCommand = prevTextContent === '"';

  if (isSpace && isHeadingCommand) {
    return headerTransaction(state, prevTextContent.length) ?? tr;
  }

  if (isSpace && isBlockquoteCommand) {
    return blockquoteTransaction(state, prevTextContent.length) ?? tr;
  }

  return tr;
}
