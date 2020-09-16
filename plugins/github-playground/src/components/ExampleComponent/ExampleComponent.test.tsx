import React from 'react';
import { render } from '@testing-library/react';
import mockFetch from 'jest-fetch-mock';
import ExampleComponent from './ExampleComponent';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme } from '@backstage/theme';

describe('ExampleComponent', () => {
  it('should render', () => {
    mockFetch.mockResponse(() => new Promise(() => {}));
    const rendered = render(
      <ThemeProvider theme={lightTheme}>
        <ExampleComponent />
      </ThemeProvider>,
    );
    expect(rendered.getByText('Welcome to github-playground!')).toBeInTheDocument();
  });
});
