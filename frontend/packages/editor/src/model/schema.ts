import {Schema} from "prosemirror-model";
import {updateImageNode, defaultSettings} from "prosemirror-image-plugin";

const _schema = new Schema({
    nodes: {
        doc: {
            content: '(block | test)+',
        },
        paragraph: {
            content: 'inline*',
            group: 'block',
            parseDOM: [{tag: "p"}],
            toDOM() {
                return ['p', 0]
            }
        },
        heading: {
            attrs: {level: {default: 1}},
            content: 'inline*',
            group: 'block',
            toDOM(node) {
                return ['h' + node.attrs.level, 0]
            }
        },
        blockquote: {
            content: 'inline*',
            group: 'block',
            toDOM() {
                return ['blockquote', {class: "editor-blockquote"}, 0]
            }
        },
        divider: {
            group: 'test',
            selectable: false,
            toDOM() {
                return ['div', {class: "editor-divider"}, ['hr']]
            }
        },
        listItem: {
            content: 'inline*',
            group: 'block',
            parseDOM: [{tag: 'li'}],
            toDOM() {
                return ['li', 0]
            }
        },
        bulletList: {
            content: '(listItem | bulletList)*',
            group: 'block',
            parseDOM: [{tag: 'ul'}],
            toDOM() {
                return ['ul', {class: "editor-bulletList"}, 0]
            }
        },
        numberList: {
            content: '(listItem | numberList)*',
            group: 'block',
            attrs: {start: {default: 1}},
            parseDOM: [{tag: 'ol'}],
            toDOM(node) {
                return ['ol', {class: "editor-numberList", start: node.attrs.start}, 0]
            }
        },
        text: {
            group: 'inline'
        },
        link: {
            content: 'text*',
            selectable: false,
            attrs: {href: {default: ''}},
            inline: true,
            group: 'inline',
            toDOM(node) {
                return ['a', {class: "editor-link", href: node.attrs.href, contentEditable: false}, 0]
            }
        },
    },
    marks: {
        inlineCode: {
            toDOM() {
                return ["code", {class: "editor-inlineCode"}]
            }
        },
    }
});

export const schema: Schema = new Schema({
    nodes: updateImageNode(_schema.spec.nodes, {...defaultSettings}),
    marks: _schema.spec.marks
});
