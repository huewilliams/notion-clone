import {EditorState, TextSelection, Transaction} from "prosemirror-state";
import {schema} from "@src/model";
import {isEqualDifferencePartToExpectChar} from "@src/utils";

export function inlineCodeTransaction(state: EditorState, tr: Transaction): Transaction | null {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.selection.$head.parent.textContent;
  const currentBacktickOffset = isEqualDifferencePartToExpectChar(currentTextContent, prevTextContent, "`");

  const textContentBeforeCurrent = prevTextContent.slice(0, currentBacktickOffset);
  const isPrevBacktickExist = textContentBeforeCurrent.includes("`");
  if (!isPrevBacktickExist) return null;

  const prevBacktickOffset = prevTextContent.lastIndexOf("`");
  const targetText = currentTextContent.slice(prevBacktickOffset + 1, currentBacktickOffset);
  if (targetText.length < 1) return null;

  const startPos = tr.selection.$anchor.start();
  const currentPos = tr.selection.$anchor.pos;
  tr.replaceWith(startPos + prevBacktickOffset, currentPos, schema.text(targetText));
  tr.addMark(startPos + prevBacktickOffset, currentPos - 2, schema.marks.inlineCode.create());
  tr.removeStoredMark(schema.marks.inlineCode);
  tr.setSelection(new TextSelection(tr.doc.resolve(currentPos - 2)));

  return tr;
}
