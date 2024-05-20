/** @jsxImportSource @emotion/react */
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {EditorState, Transaction} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {schema} from "@src/model";
import {handlePastePlugin, imagePlugin, placeholderPlugin} from "@src/plugins";
import {androidKeymap} from "./android/androidKeymap";
import {backspaceCommand, enterCommand, tabCommand} from "@src/commands";
import "./Editor.css";
import {bulletListTransaction, dividerTransaction, insertHeaderTransaction, numberListTransaction} from "@src/transactions";
import "prosemirror-image-plugin/dist/styles/common.css";

interface Props {
  placeholder?: string;
  slashCommand?: (isSingle: boolean) => void;
  defaultState?: JSON | null;
  onChange?: () => void;
}

export type InsertNodeCommand = 'divider' | 'bulletedList' | 'numberedList' | 'h1' | 'h2' | 'h3';

export interface EditorRef {
  insertNode: (command: InsertNodeCommand) => void;
  getData: () => any;
}

export const Editor = forwardRef<EditorRef, Props>((props, ref) => {
  const {defaultState, placeholder, slashCommand} = props;

  const editorRef = useRef<HTMLDivElement>(null);
  const plugins = [
    keymap({'Enter': enterCommand}),
    keymap({'Tab': tabCommand}),
    keymap({"Backspace": backspaceCommand}),
    keymap(baseKeymap),
    placeholderPlugin(placeholder),
    handlePastePlugin(),
    imagePlugin()
  ];

  const [state, setState] = useState(() => {
    if (defaultState) {
      return EditorState.fromJSON({schema, plugins,}, defaultState);
    }

    return EditorState.create({schema, plugins});
  });
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
        props.onChange?.();
      },
    });
    setInnerView(view);

    return () => {
      view.destroy();
    }
  }, [defaultState, props, slashCommand, state]);

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
            applyTransaction(dividerTransaction(innerView.state.tr, 3));
            break;
          case "bulletedList":
            applyTransaction(bulletListTransaction(innerView.state, true));
            break;
          case "numberedList":
            applyTransaction(numberListTransaction(innerView.state, '1', true));
            break;
          case "h1":
            applyTransaction(insertHeaderTransaction(innerView.state, 1));
            break;
          case "h2":
            applyTransaction(insertHeaderTransaction(innerView.state, 2));
            break;
          case "h3":
            applyTransaction(insertHeaderTransaction(innerView.state, 3));
            break;
        }
      },
      getData: () => {
        return innerView?.state.toJSON();
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
