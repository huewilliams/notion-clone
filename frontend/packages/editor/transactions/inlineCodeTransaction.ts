import {EditorState, TextSelection, Transaction} from "prosemirror-state";
import {schema} from "../model/schema";

export function inlineCodeTransaction(state: EditorState): Transaction | null {
  const prevTextContent = state.selection.$head.parent.textContent;

  const {tr} = state;
  const currentPos = tr.selection.$anchor.pos;

  const textContentBeforeCurrent = prevTextContent.slice(0, currentPos - 1);
  const isBacktickExist = textContentBeforeCurrent.includes("`");
  if (!isBacktickExist) return null;

  const backtickOffset = prevTextContent.lastIndexOf("`");
  const targetText = prevTextContent.slice(backtickOffset + 1, currentPos);
  if (targetText.length < 1) return null;

  const startPos = tr.selection.$anchor.start();
  tr.replaceWith(startPos + backtickOffset, currentPos + 1, schema.text(targetText));
  tr.addMark(startPos + backtickOffset, currentPos - 1, schema.marks.inlineCode.create());
  tr.removeStoredMark(schema.marks.inlineCode);
  tr.setSelection(new TextSelection(tr.doc.resolve(currentPos - 1)));

  return tr;
}
