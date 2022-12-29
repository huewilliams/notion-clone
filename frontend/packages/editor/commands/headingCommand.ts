import {Command} from "prosemirror-state";
import {schema} from "../model/schema";

export const headingCommand: Command = (state, dispatch) => {
  const tr = state.tr;
  tr.insertText('space');
  if (dispatch) {
    dispatch(tr);
  }
  return false;
}
