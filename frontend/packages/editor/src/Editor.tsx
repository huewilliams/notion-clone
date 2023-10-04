/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {schema} from "@src/model";
import {handlePastePlugin, placeholderPlugin} from "@src/plugins";
import {androidKeymap} from "./android/androidKeymap";
import {backspaceCommand, enterCommand, tabCommand} from "@src/commands";
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
      keymap({'Tab': tabCommand}),
      keymap({"Backspace": backspaceCommand}),
      keymap(baseKeymap),
      placeholderPlugin(placeholder),
      handlePastePlugin(),
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
        location.hash = btoa(JSON.stringify(newState.toJSON()));
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
