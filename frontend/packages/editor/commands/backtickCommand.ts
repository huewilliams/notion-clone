import {Command} from "prosemirror-state";
import {schema} from "../model/schema";

export const backtickCommand: Command = (state, dispatch) => {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentPos = state.tr.selection.$head.pos;
  const textContentBeforeCurrent = prevTextContent.slice(0, currentPos - 1);

  const isBacktickExist = textContentBeforeCurrent.includes("`");
  if (!isBacktickExist) return false;

  const from = prevTextContent.lastIndexOf("`") + 1;
  const {tr} = state;
  const targetText = prevTextContent.slice(from, currentPos);
  if (targetText.length < 1 || !dispatch) return false;

  tr.replaceWith(from, currentPos, schema.text(targetText));
  tr.addMark(from, currentPos, schema.marks.inlineCode.create());
  tr.removeStoredMark(schema.marks.inlineCode);
  dispatch(tr);

  return true;
}
