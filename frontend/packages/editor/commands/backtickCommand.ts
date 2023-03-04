import {Command} from "prosemirror-state";
import {schema} from "../model/schema";

export const backtickCommand: Command = (state, dispatch) => {
  const prevTextContent = state.selection.$head.parent.textContent;
  const {tr} = state;
  const currentPos = tr.selection.$anchor.pos;

  const textContentBeforeCurrent = prevTextContent.slice(0, currentPos - 1);
  const isBacktickExist = textContentBeforeCurrent.includes("`");
  if (!isBacktickExist) return false;

  const backtickOffset = prevTextContent.lastIndexOf("`");
  const targetText = prevTextContent.slice(backtickOffset + 1, currentPos);
  if (targetText.length < 1 || !dispatch) return false;

  const startPos = tr.selection.$anchor.start();
  tr.replaceWith(startPos + backtickOffset, currentPos, schema.text(targetText));
  tr.addMark(startPos + backtickOffset, currentPos, schema.marks.inlineCode.create());
  tr.removeStoredMark(schema.marks.inlineCode);
  dispatch(tr);

  return true;
}
