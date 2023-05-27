import {Plugin} from "prosemirror-state";
import isUrl from "is-url";
import {schema} from "@src/model";

export function handlePastePlugin() {
  return new Plugin({
    props: {
      handlePaste(view, event, slice) {
        let dispatched = false;

        slice.content.descendants((node) => {
          if (node.type.name === 'text' && isUrl(node.textContent)) {
            let linkNode = schema.nodes.link.create({href: node.textContent}, node);
            view.dispatch(view.state.tr.replaceSelectionWith(linkNode));
            dispatched = true;
          }
        })
        return dispatched;
      }
    }
  })
}
