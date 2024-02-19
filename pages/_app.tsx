import React from "react";
import { AppProps } from 'next/app';
import { StyleProvider, ThemePicker } from "vcc-ui";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import "../public/css/styles.css";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />

          </QueryClientProvider>
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default MyApp;

