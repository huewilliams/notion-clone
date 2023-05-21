import {Command} from "prosemirror-state";
import {chainCommands, createParagraphNear, liftEmptyBlock, newlineInCode, splitBlock} from "prosemirror-commands";
import {schema} from "@src/model";

export const enterCommand: Command = (state, dispatch) => {
  if (!dispatch) return false;
  const parentType = state.selection.$head.parent.type.name;
  const nodeType = state.selection.$head.nodeAfter?.type.name;

  const isListType = parentType === 'listItem';
  const parentTextContent = state.selection.$head.parent.textContent;
  let isEmptyText = parentTextContent.length < 1;
  const paragraph = schema.nodes.paragraph.createAndFill();

  const isBeforeBulletType = nodeType === 'bulletList';

  const range = state.selection.$head.blockRange();
  const currentDepth = state.tr.selection.$head.depth;
  if (isListType && isEmptyText && range && paragraph) {
    if (currentDepth === 2) {
      const pos = state.tr.selection.$head.pos;
      const replaceTr = state.tr.replaceWith(pos - 2, pos + 2, paragraph);
      dispatch(replaceTr);
      return true;
    } else {
      const newTr = state.tr.lift(range, currentDepth - 2);
      dispatch(newTr);
      return true;
    }
  }

  isEmptyText = state.selection.$head.nodeAfter?.content.firstChild?.content.size === 0;
  if (isBeforeBulletType && isEmptyText && paragraph) {
    const pos = state.tr.selection.$head.pos;
    dispatch(state.tr.replaceWith(pos, pos + 4, paragraph));
    return true;
  }

  const baseEnterCommand = chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock);
  return baseEnterCommand(state, dispatch);
}
