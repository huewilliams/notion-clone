/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {css} from "@emotion/react";
import {schema} from "./model/schema";
import PlaceholderPlugin from "./plugins/placeholderPlugin";

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  const state = EditorState.create({
    schema,
    plugins: [
      keymap(baseKeymap),
      PlaceholderPlugin(),
    ]
  });

  useEffect(() => {
    const view = new EditorView(editorRef.current, {state});
    return () => {
      view.destroy();
    }
  }, [state]);

  return (
    <div css={divStyle} ref={editorRef}/>
  )
}

const divStyle = css`
  div {
    outline: none;
  }
`;
