import {EditorState, TextSelection} from "prosemirror-state";
import {schema} from "@src/model";

export function numberListTransaction(state: EditorState, frontNumber: string) {
    const listItem = schema.nodes.listItem.createAndFill();
    const numberList = schema.nodes.numberList.create({start: Number(frontNumber)}, listItem);
    if (!listItem || !numberList) return null;

    const from = state.selection.$head.pos - 2 - frontNumber.length;
    const to = state.selection.$head.pos + 1;

    const {tr} = state;
    tr.replaceWith(from, to, numberList);
    tr.setSelection(new TextSelection(tr.doc.resolve(from), tr.doc.resolve(from)));

    return tr;
}
