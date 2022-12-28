/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {css} from "@emotion/react";
import {schema} from "./model/schema";

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  const state = EditorState.create({schema});

  useEffect(() => {
    new EditorView(editorRef.current, {state});
  });

  return (
    <div css={divStyle} ref={editorRef}/>
  )
}

const divStyle = css`
  div {
    outline: none;
  }
`;
