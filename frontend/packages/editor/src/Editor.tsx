/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {schema} from "@src/model";
import {placeholderPlugin} from "@src/plugins";
import {androidKeymap} from "./android/androidKeymap";
import {backspaceCommand, enterCommand} from "@src/commands";
import "./Editor.css";

interface Props {
  placeholder?: string;
}

export function Editor({placeholder}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  const state = EditorState.create({
    schema,
    plugins: [
      keymap({'Enter': enterCommand}),
      keymap(baseKeymap),
      keymap({"Backspace": backspaceCommand}),
      placeholderPlugin(placeholder),
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
    <div spellCheck={false} ref={editorRef}/>
  )
}
