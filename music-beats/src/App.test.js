import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<App />, div);
    });
    ReactDOM.unmountComponentAtNode(div);
  });

  test('renders the component correctly', () => {
    const { getByTestId } = render(<App />);
    const appComponent = getByTestId('app-component');
    expect(appComponent).toBeInTheDocument();
  });
});
