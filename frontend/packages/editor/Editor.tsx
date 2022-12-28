import React, {useEffect, useRef} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {schema} from "./model/schema";

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
