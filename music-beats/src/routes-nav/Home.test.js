import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  test('renders welcome message', () => {
    const { getByText } = render(<Home />);
    const welcomeMessage = getByText('Welcome to MusicBeats');
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders resource references', () => {
    const { getByText } = render(<Home />);
    const resourceReferencesHeader = getByText('Resource References');
    expect(resourceReferencesHeader).toBeInTheDocument();
  });

  test('renders multiple resource links', () => {
    const { getAllByRole } = render(<Home />);
    const resourceLinks = getAllByRole('link');
    expect(resourceLinks.length).toBe(3);
  });
});
