import {Command} from "prosemirror-state";
import {schema} from "@src/model";
import {chainCommands, deleteSelection, joinBackward, selectNodeBackward} from "prosemirror-commands";

export const backspaceCommand: Command = (state, dispatch) => {
  if (!dispatch) return false;

  const isEmptyContent = state.selection.$head.parent.textContent.length < 1;
  const from = state.selection.$head.pos;
  const to = state.selection.$head.pos;
  const paragraph = schema.nodes.paragraph.createAndFill();

  const parentType = state.selection.$head.parent.type.name;
  const isParentHeading = parentType === 'heading';
  if (isEmptyContent && isParentHeading && paragraph) {
    const replaceTr = state.tr.replaceWith(from - 1, to, paragraph);
    dispatch(replaceTr);
    return true;
  }

  const isListItemType = parentType === 'listItem';
  if (isEmptyContent && isListItemType && paragraph) {
    const replaceTr = state.tr.replaceWith(from - 2, to, paragraph);
    dispatch(replaceTr);
    return true;
  }

  const isDoc = parentType === 'doc';
  const afterNode = state.selection.$head.nodeAfter;
  const afterType = afterNode?.type.name;
  const isAfterHeading = afterType === 'heading';
  const isAfterEmpty = (afterNode?.textContent.length ?? 0) < 1;
  if (isDoc && isAfterEmpty && isAfterHeading && paragraph) {
    const replaceTr = state.tr.replaceWith(from - 1, to + 2, paragraph);
    dispatch(replaceTr);
    return true;
  }

  const baseBackspaceCommand = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
  return baseBackspaceCommand(state, dispatch);
}
