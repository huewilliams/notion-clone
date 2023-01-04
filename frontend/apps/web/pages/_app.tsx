import React from "react";
import "../styles/reset.css";
import "../styles/global.css";
import "editor/Editor.css";
import {AppProps} from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
