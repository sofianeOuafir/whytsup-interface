import "../styles/globals.css";
import React from "react";
import { wrapper } from "./../store/configureStore";
import { startAutoLogin } from "../actions/auth";
import App from "next/app";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const server = !!ctx.req;
    const cookie =
      server && ctx.req.headers.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined;
    await ctx.store.dispatch(startAutoLogin(cookie));
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
