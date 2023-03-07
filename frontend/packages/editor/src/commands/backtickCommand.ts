import {Command} from "prosemirror-state";
import {inlineCodeTransaction} from "../transactions/inlineCodeTransaction";

export const backtickCommand: Command = (state, dispatch) => {
  const tr = inlineCodeTransaction(state);
  if (!dispatch || !tr) return false;
  dispatch(tr);
  return true;
}
