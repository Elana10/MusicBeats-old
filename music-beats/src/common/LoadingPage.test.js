import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner component', () => {
  test('renders loading message and spinner', () => {
    const { getByText, getByTitle } = render(<LoadingSpinner />);
    expect(getByText('This may take a minute...')).toBeInTheDocument();
    const spinner = getByTitle('Giphy Embed');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('src', 'https://giphy.com/embed/xTk9ZvMnbIiIew7IpW');
    expect(spinner).toHaveAttribute('width', '300');
    expect(spinner).toHaveAttribute('height', '300');
    expect(spinner).toHaveAttribute('frameBorder', '0');
    expect(spinner).toHaveAttribute('class', 'giphy-embed');
    expect(spinner).toHaveAttribute('allowFullScreen');
  });
});
