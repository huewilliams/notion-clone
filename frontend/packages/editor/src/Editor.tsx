/** @jsxImportSource @emotion/react */
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {EditorState, Transaction} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {schema} from "@src/model";
import {handlePastePlugin, placeholderPlugin} from "@src/plugins";
import {androidKeymap} from "./android/androidKeymap";
import {backspaceCommand, enterCommand, tabCommand} from "@src/commands";
import {base64ToUtf8, utf8ToBase64} from "@src/utils";
import "./Editor.css";
import {dividerTransaction} from "@src/transactions";

interface Props {
  placeholder?: string;
}

export interface EditorRef {
  insertDivide: () => void;
}

export const Editor = forwardRef<EditorRef, Props>(({placeholder}, ref) => {
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
  const [newState, setNewState] = useState<EditorState | null>(null);
  const [innerView, setInnerView] = useState<EditorView | null>(null);

  useEffect(() => {
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction: tr => {
        const newTr = androidKeymap(tr, view.state);
        // newTr.removeStoredMark(schema.marks.inlineCode);
        const newState = view.state.apply(newTr);
        view.updateState(newState);
        location.hash = utf8ToBase64(JSON.stringify(newState.toJSON()));
      },
    });
    setInnerView(view);

    return () => {
      view.destroy();
    }
  }, [state]);

  useEffect(() => {
    if (location.hash.length > 1) {
      const decodedState = base64ToUtf8(location.hash.substring(1));
      const stateFromHash = JSON.parse(decodedState);
      setState(EditorState.fromJSON({schema, plugins}, stateFromHash));
    }
  }, []);

  const applyTransaction = useCallback((tr: Transaction | null) => {
    if (!tr || !innerView) return;
    setNewState(innerView.state.apply(tr));
  }, [innerView]);

  useImperativeHandle(ref, () => {
    return {
      insertDivide: () => {
        if (!innerView) return;
        applyTransaction(dividerTransaction(innerView.state.tr));
      }
    }
  }, [applyTransaction, innerView]);

  useEffect(() => {
    if (newState) {
      innerView?.updateState(newState);
    }
  }, [innerView, newState]);

  return (
    <div spellCheck={false} ref={editorRef}/>
  )
});

Editor.displayName = 'Editor';
