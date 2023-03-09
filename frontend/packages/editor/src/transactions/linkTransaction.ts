import {EditorState, Transaction} from "prosemirror-state";
import {isEqualDifferencePartToExpectChar} from "@src/utils";
import isUrl from "is-url";
import {schema} from "@src/model";

export function linkTransaction(state: EditorState, tr: Transaction): Transaction {
  const prevTextContent = state.selection.$head.parent.textContent;
  const currentTextContent = tr.selection.$head.parent.textContent;
  console.log(prevTextContent, currentTextContent);
  const currentSpaceOffset = isEqualDifferencePartToExpectChar(currentTextContent, prevTextContent, " ");

  const textContentBeforeCurrent = currentTextContent.slice(0, currentSpaceOffset);
  if (textContentBeforeCurrent.length < 1) return tr;
  const lastSpaceIndex = textContentBeforeCurrent.lastIndexOf(" ");
  console.log('currentSpaceOffset : ', currentSpaceOffset, 'lastSpaceIndex : ', lastSpaceIndex);
  const lastSpaceOffset = lastSpaceIndex < 0 ? 0 : lastSpaceIndex + 1;
  let targetText = textContentBeforeCurrent.slice(lastSpaceOffset);

  const targetHasScheme = targetText.includes("://");
  if (!targetHasScheme) targetText = "https://" + targetText;
  const targetIsUrl = isUrl(targetText);
  if (!targetIsUrl) return tr;

  console.log('url!')
  const textNode = schema.text(targetText);
  const linkNode = schema.nodes.link.createAndFill({href: targetText}, textNode);
  const startPos = tr.selection.$anchor.start() + lastSpaceOffset;
  const endPos = tr.selection.$anchor.start() + currentSpaceOffset;
  console.log('startPos : ', startPos, ' endPos : ', endPos)
  if (!linkNode) return tr;
  tr.replaceWith(startPos, endPos, linkNode);

  return tr;
}
