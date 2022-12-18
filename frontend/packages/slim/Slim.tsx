import React, { useState } from 'react';
import {BaseEditor, createEditor, Descendant} from "slate";
import {Slate, Editable, ReactEditor} from "slate-react";

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
  }
}

export default function Slim() {
  const [editor] = useState(createEditor());
  const initialValue: Descendant[] = [];

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable/>
    </Slate>
  )
}
