import {EditorState, Transaction} from "prosemirror-state";
import {isEqualDifferencePartToExpectChar} from "@src/utils";
import {headerTransaction} from "../transactions/headerTransaction";
import {blockquoteTransaction} from "../transactions/blockquoteTransaction";
import {inlineCodeTransaction} from "../transactions/inlineCodeTransaction";
import {dividerTransaction} from "../transactions/dividerTransaction";

export function androidKeymap(tr: Transaction, state: EditorState): Transaction {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.selection.$head.parent.textContent;
  const lastText = currentTextContent.length > 0 ? currentTextContent[currentTextContent.length - 1] : null;

  const isWhiteSpaceContent = lastText && /\s/g.test(lastText);
  const isSpace = isWhiteSpaceContent && currentTextContent.length > prevTextContent.length;
  const isHeadingCommand = prevTextContent.length > 0 && prevTextContent.split('').every(c => c === "#");
  if (isSpace && isHeadingCommand) {
    return headerTransaction(state, prevTextContent.length) ?? tr;
  }

  const isBlockquoteCommand = prevTextContent === '"';
  if (isSpace && isBlockquoteCommand) {
    return blockquoteTransaction(state, prevTextContent.length) ?? tr;
  }

  const currentPos = tr.selection.$anchor.pos;
  const textContentBeforeCurrent = prevTextContent.slice(0, currentPos - 1);
  const isBacktickInput =
    isEqualDifferencePartToExpectChar(currentTextContent, textContentBeforeCurrent, "`") > 0;
  const isBacktickExist = textContentBeforeCurrent.includes("`");
  if (isBacktickInput && isBacktickExist) {
    return inlineCodeTransaction(state, tr) ?? tr;
  }

  const isDashInput =
    isEqualDifferencePartToExpectChar(currentTextContent, textContentBeforeCurrent, "-") > 0;
  const isDoubleDashExist = prevTextContent === "--";
  if (isDashInput && isDoubleDashExist) {
    return dividerTransaction(tr) ?? tr;
  }

  return tr;
}
