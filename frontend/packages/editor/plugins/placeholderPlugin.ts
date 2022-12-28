import {Plugin} from "prosemirror-state";
import {Decoration, DecorationSet} from "prosemirror-view";

export default function placeholderPlugin () {
  return new Plugin({
    props: {
      decorations: state => {
        const decorations = [];

        const decorate = (node, pos) => {
          const isSelectedPos = state.selection.anchor === pos + 1;
          if (node.type.isBlock && node.childCount === 0 && isSelectedPos) {
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: 'empty-node'
              })
            )
          }
        };

        state.doc.descendants(decorate);

        return DecorationSet.create(state.doc, decorations);
      }
    }
  })
}
