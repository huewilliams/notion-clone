import React from "react";
import "../styles/reset.css";
import "../styles/global.css";
import {AppProps} from "next/app";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
