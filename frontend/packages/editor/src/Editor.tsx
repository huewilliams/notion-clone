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
import {bulletListTransaction, dividerTransaction, headerTransaction, numberListTransaction} from "@src/transactions";

interface Props {
  placeholder?: string;
  slashCommand?: (isSingle: boolean) => void;
}

export type InsertNodeCommand = 'divider' | 'bulletedList' | 'numberedList' | 'h1' | 'h2' | 'h3';

export interface EditorRef {
  insertNode: (command: InsertNodeCommand) => void;
}

export const Editor = forwardRef<EditorRef, Props>(({placeholder, slashCommand}, ref) => {
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
        const newTr = androidKeymap(tr, view.state, slashCommand);
        newTr.removeStoredMark(schema.marks.inlineCode);
        const newState = view.state.apply(newTr);
        view.updateState(newState);
        location.hash = utf8ToBase64(JSON.stringify(newState.toJSON()));
      },
    });
    setInnerView(view);

    return () => {
      view.destroy();
    }
  }, [slashCommand, state]);

  useEffect(() => {
    if (location.hash.length > 1) {
      const decodedState = base64ToUtf8(location.hash.substring(1));
      const stateFromHash = JSON.parse(decodedState);
      setState(EditorState.fromJSON({schema, plugins}, stateFromHash));
    }
  }, []);

  const applyTransaction = useCallback((tr: Transaction | null) => {
    if (!tr || !innerView) return;
    innerView.focus();
    setNewState(innerView.state.apply(tr));
  }, [innerView]);

  useImperativeHandle(ref, () => {
    return {
      insertNode: (command: InsertNodeCommand) => {
        if (!innerView) return;
        switch (command) {
          case "divider":
            applyTransaction(dividerTransaction(innerView.state.tr));
            break;
          case "bulletedList":
            applyTransaction(bulletListTransaction(innerView.state));
            break;
          case "numberedList":
            applyTransaction(numberListTransaction(innerView.state, '1'));
            break;
          case "h1":
            applyTransaction(headerTransaction(innerView.state, 1));
            break;
          case "h2":
            applyTransaction(headerTransaction(innerView.state, 2));
            break;
          case "h3":
            applyTransaction(headerTransaction(innerView.state, 3));
            break;
        }
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
