import {EditorState, Transaction} from "prosemirror-state";
import isUrl from "is-url";
import {schema} from "@src/model";

export function linkTransaction(state: EditorState, tr: Transaction): Transaction {
  const beforeNode = state.tr.selection.$head.nodeBefore;
  if (beforeNode?.type.name !== 'text') return tr;

  const nodeText = (beforeNode.text ?? "").split(" ");
  const lastWord = nodeText[nodeText.length - 1];
  const wordHasScheme = lastWord.includes(':');
  const linkText = wordHasScheme ? lastWord : 'https://' + lastWord;
  const textIsUrl = isUrl(linkText);

  if (textIsUrl) {
    const startPos = state.tr.selection.$head.pos - lastWord.length;
    const endPos = state.tr.selection.$head.pos;
    const linkNode = schema.nodes.link.create({href: linkText}, schema.text(linkText));
    tr.replaceWith(startPos, endPos, linkNode);
  }

  return tr;
}
