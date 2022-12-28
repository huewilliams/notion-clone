import {BaseEditor, createEditor, Descendant} from "slate";
import {Editable, ReactEditor, Slate, withReact} from "slate-react";
import React, {useState} from "react";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [{
  type: 'paragraph',
  children: [{ text: '' }],
},];

export default function Slim() {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable placeholder={"placeholder"} />
    </Slate>
  )
}
