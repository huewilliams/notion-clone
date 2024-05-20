import {EditorState, TextSelection, Transaction} from "prosemirror-state";
import {schema} from "@src/model";

export function insertHeaderTransaction(state: EditorState, level: number): Transaction | null {
    const header = schema.nodes.heading.createAndFill({level});
    if (!header) return null;

    const {tr} = state;
    const to = tr.selection.$head.end();

    tr.split(tr.selection.$head.pos);
    tr.replaceWith(to - 3, to, header);
    tr.deleteRange(to, to + 2);
    tr.setSelection(new TextSelection(tr.doc.resolve(to - 1), tr.doc.resolve(to - 1)));
    return tr;
}
