import {EditorState, Transaction} from "prosemirror-state";
import {isEqualDifferencePartToExpectChar} from "@src/utils";
import {
  headerTransaction,
  blockquoteTransaction,
  inlineCodeTransaction,
  dividerTransaction,
  linkTransaction,
  bulletListTransaction,
  numberListTransaction
} from "@src/transactions";

export function androidKeymap(
  tr: Transaction, state: EditorState, slashCommand?: (isSingle: boolean) => void
): Transaction {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.selection.$head.parent.textContent;
  const lastText = currentTextContent.length > 0 ? currentTextContent[currentTextContent.length - 1] : null;

  const isWhiteSpaceContent = lastText && /\s/g.test(lastText);
  const isLastTextSpace = isWhiteSpaceContent && currentTextContent.length > prevTextContent.length;
  const isHeadingCommand =
    prevTextContent.length > 0
    && prevTextContent.length <= 3
    && prevTextContent.split('').every(c => c === "#");
  if (isLastTextSpace && isHeadingCommand) {
    return headerTransaction(state, prevTextContent.length) ?? tr;
  }

  const isBlockquoteCommand = prevTextContent === '"';
  if (isLastTextSpace && isBlockquoteCommand) {
    return blockquoteTransaction(state, prevTextContent.length) ?? tr;
  }

  const isBulletListCommand = prevTextContent === "*";
  if (isLastTextSpace && isBulletListCommand) {
    return bulletListTransaction(state) ?? tr;
  }

  const numberListRegEx = /[0-9]\.$/;
  const isNumberListCommand = numberListRegEx.test(prevTextContent);
  if (isLastTextSpace && isNumberListCommand) {
    const frontNumber = prevTextContent.split('.')[0];
    return numberListTransaction(state, frontNumber) ?? tr;
  }

  const isSpaceInput =
    isEqualDifferencePartToExpectChar(currentTextContent, prevTextContent, " ") !== -1;
  if (isSpaceInput) {
    return linkTransaction(state, tr);
  }

  const currentPos = tr.selection.$anchor.pos;
  const textContentBeforeCurrent = prevTextContent.slice(0, currentPos - 1);
  const isBacktickInput =
    isEqualDifferencePartToExpectChar(currentTextContent, textContentBeforeCurrent, "`") !== -1;
  const isBacktickExist = textContentBeforeCurrent.includes("`");
  if (isBacktickInput && isBacktickExist) {
    return inlineCodeTransaction(state, tr) ?? tr;
  }

  const isDashInput =
    isEqualDifferencePartToExpectChar(currentTextContent, textContentBeforeCurrent, "-") !== -1;
  const isDoubleDashExist = prevTextContent === "--";
  if (isDashInput && isDoubleDashExist) {
    return dividerTransaction(tr) ?? tr;
  }

  const isSlashInput = lastText === "/";
  const isSingle = currentTextContent === "/";
  const isInsert = prevTextContent < currentTextContent;
  if (isSlashInput && slashCommand && isInsert) {
    slashCommand(isSingle);
  }

  return tr;
}
