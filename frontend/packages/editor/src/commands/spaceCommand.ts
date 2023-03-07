import {Command} from "prosemirror-state";
import {headerTransaction} from "../transactions/headerTransaction";
import {blockquoteTransaction} from "../transactions/blockquoteTransaction";

export const spaceCommand: Command = (state, dispatch) => {
  if (!dispatch) return false;

  const prevTextContent = state.selection.$head.parent.textContent;
  const isHeadingCommand = prevTextContent.length > 0 && prevTextContent.length < 4 &&
    prevTextContent.split('').every(c => c === "#");
  const isBlockquoteCommand = prevTextContent.length === 1 && prevTextContent === '"';

  if (isHeadingCommand) {
    const headerTr = headerTransaction(state, prevTextContent.length);
    if (!headerTr) return false;

    dispatch(headerTr);
    return true;
  }

  if (isBlockquoteCommand) {
    const blockquoteTr = blockquoteTransaction(state, prevTextContent.length);
    if (!blockquoteTr) return false;

    dispatch(blockquoteTr);
    return true;
  }

  return false;
}
