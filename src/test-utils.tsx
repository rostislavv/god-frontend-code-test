import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { StyleProvider, ThemePicker } from 'vcc-ui';
import { QueryClient, QueryClientProvider } from 'react-query';

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  const Wrapper: React.FC = ({ children }: any) => {
    const queryClient = new QueryClient();

    return (
      <React.StrictMode>
        <StyleProvider>
          <ThemePicker variant="light">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemePicker>
        </StyleProvider>
      </React.StrictMode>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
