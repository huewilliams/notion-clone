import React, { useState } from 'react';
import {createEditor, Descendant} from "slate";
import {Slate, Editable} from "slate-react";

export default function Slim() {
  const [editor] = useState(createEditor());
  const initialValue: Descendant[] = [];

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable/>
    </Slate>
  )
}
