/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from "react";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {schema} from "@src/model";
import {handlePastePlugin, placeholderPlugin} from "@src/plugins";
import {androidKeymap} from "./android/androidKeymap";
import {backspaceCommand, enterCommand, tabCommand} from "@src/commands";
import {base64ToUtf8, utf8ToBase64} from "@src/utils";
import "./Editor.css";

interface Props {
  placeholder?: string;
}

export function Editor({placeholder}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const plugins = [
    keymap({'Enter': enterCommand}),
    keymap({'Tab': tabCommand}),
    keymap({"Backspace": backspaceCommand}),
    keymap(baseKeymap),
    placeholderPlugin(placeholder),
    handlePastePlugin(),
  ];

  const [state, setState] = useState(
    EditorState.create({
      schema,
      plugins,
    })
  );

  useEffect(() => {
    if (location.hash.length > 1) {
      const decodedState = base64ToUtf8(location.hash.substring(1));
      const stateFromHash = JSON.parse(decodedState);
      setState(EditorState.fromJSON({schema, plugins}, stateFromHash));
    }
  }, []);

  useEffect(() => {
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction: tr => {
        const newTr = androidKeymap(tr, view.state);
        newTr.removeStoredMark(schema.marks.inlineCode);
        const newState = view.state.apply(newTr);
        view.updateState(newState);
        location.hash = utf8ToBase64(JSON.stringify(newState.toJSON()));
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
