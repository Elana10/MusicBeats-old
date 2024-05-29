import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchAppleMusic from './SearchAppleMusic';
import { UserContext } from '../auth/UserContext';

describe('SearchAppleMusic component', () => {
  const appleMusicSearch = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', bpm: 120 },
    { id: 2, name: 'Song 2', artist: 'Artist 2', bpm: 110 },
  ];

  test('renders search results when there are songs', () => {
    const { getByText } = render(
      <SearchAppleMusic />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ appleMusicSearch }}>{children}</UserContext.Provider> }
    );
    expect(getByText('Song Name')).toBeInTheDocument();
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByText('Beats Per Minute')).toBeInTheDocument();
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Artist 1')).toBeInTheDocument();
    expect(getByText('120')).toBeInTheDocument();
    expect(getByText('Song 2')).toBeInTheDocument();
    expect(getByText('Artist 2')).toBeInTheDocument();
    expect(getByText('110')).toBeInTheDocument();
  });

  test('does not render search results when there are no songs', () => {
    const { queryByText } = render(
      <SearchAppleMusic />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ appleMusicSearch: [] }}>{children}</UserContext.Provider> }
    );
    expect(queryByText('Song Name')).not.toBeInTheDocument();
    expect(queryByText('Artist')).not.toBeInTheDocument();
    expect(queryByText('Beats Per Minute')).not.toBeInTheDocument();
  });
});
