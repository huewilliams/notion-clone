/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {css} from "@emotion/react";
import {schema} from "./model/schema";
import PlaceholderPlugin from "./plugins/placeholderPlugin";
import {spaceCommand} from "./commands/spaceCommand";
import {androidKeymap} from "./android/androidKeymap";
import {backspaceCommand} from "./commands/backspaceCommand";
import "./Editor.css";

interface Props {
  placeholder?: string;
}

export function Editor({placeholder}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  const state = EditorState.create({
    schema,
    plugins: [
      keymap(baseKeymap),
      keymap({" ": spaceCommand}),
      keymap({"Backspace": backspaceCommand}),
      PlaceholderPlugin(placeholder),
    ]
  });

  useEffect(() => {
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction: tr => {
        const newTr = androidKeymap(tr, view.state);
        newTr.removeStoredMark(schema.marks.inlineCode);
        const newState = view.state.apply(newTr);
        view.updateState(newState);
      },
    });
    return () => {
      view.destroy();
    }
  }, [state]);

  return (
    <div spellCheck={false} css={divStyle} ref={editorRef}/>
  )
}

const divStyle = css`
  div {
    outline: none;
  }
`;
