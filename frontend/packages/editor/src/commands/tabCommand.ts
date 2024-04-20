import {Command, TextSelection} from "prosemirror-state";
import {Node} from "prosemirror-model";
import {schema} from "@src/model";

export const tabCommand: Command = (state, dispatch) => {
  if (!dispatch) return false;

  const currentNode = state.tr.selection.$head.node();
  const currentDepth = state.tr.selection.$head.depth;
  const parentNode = state.tr.selection.$head.node(currentDepth - 1);
  const isFirstChild = parentNode.firstChild === currentNode;
  if (isFirstChild) return false;

  const currentNodeIndex = getCurrentNodeIndex(currentNode, parentNode);

  if (currentNodeIndex !== -1 && currentNodeIndex > 0) {
    const frontNode = parentNode.child(currentNodeIndex - 1);
    if (frontNode.type.name === 'bulletList') {
      const startPos = state.tr.selection.$head.start(currentDepth);
      const endPos = state.tr.selection.$head.end(currentDepth);
      let nodeToMove = state.tr.doc.cut(startPos, endPos)?.firstChild?.firstChild;
      const deleteTr = state.tr.delete(startPos - 1, endPos);
      if (nodeToMove) {
        nodeToMove = getFirstChildUntilListItem(nodeToMove);
        const moveTr = deleteTr.insert(startPos - 2, nodeToMove);
        const selectPos = moveTr.doc.resolve(moveTr.selection.$head.pos - 3);
        const selectTr = moveTr.setSelection(new TextSelection(selectPos));
        dispatch(selectTr);
        return true;
      }
      return false;
    }
  }

  const range = state.selection.$head.blockRange();
  const currentType = state.selection.$head.node().type.name;
  const isListType = currentType === 'listItem';

  const bulletList = schema.nodes.bulletList.createAndFill(null);
  const isParentBulletedList = parentNode.type.name === 'bulletList';

  const numberList = schema.nodes.numberList.createAndFill(null);
  const isParentNumberedList = parentNode.type.name === 'numberList';

  if (isListType && isParentBulletedList && bulletList && range) {
    const wrapTr = state.tr.wrap(range, [bulletList]);
    dispatch(wrapTr);
    return true;
  }

  if (isListType && isParentNumberedList && numberList && range) {
    const wrapTr = state.tr.wrap(range, [numberList]);
    dispatch(wrapTr);
    return true;
  }

  return false;
}

function getCurrentNodeIndex(currentNode: Node, parentNode: Node): number {
  for (let i = 0; i < parentNode.childCount; i++) {
    if (parentNode.child(i) === currentNode) return i;
  }
  return -1;
}

function getFirstChildUntilListItem(node: Node): Node {
  if (node.type.name === 'listItem') return node;
  if (!node.firstChild) return node;
  return getFirstChildUntilListItem(node.firstChild);
}
