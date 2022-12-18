import React, { useState } from 'react';
import {createEditor} from "slate";
import {Slate, Editable} from "slate-react";

export default function Slim() {
  const [editor] = useState(createEditor());
  const initialValue = [];

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable/>
    </Slate>
  )
}
