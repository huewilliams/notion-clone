import {BaseEditor} from "slate";
import {ReactEditor} from "slate-react";

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
  }
}
