import * as React from 'react';
import App from 'next/app';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../index.css';

export default class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}
