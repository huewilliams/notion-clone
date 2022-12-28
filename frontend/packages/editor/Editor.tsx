import React, {useEffect, useRef} from "react";
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  const state = EditorState.create({schema});

  useEffect(() => {
    new EditorView(editorRef.current, {state});
  });

  return (
    <div ref={editorRef}/>
  )
}
