import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlayingNow from './PlayingNow';
import { UserContext } from '../auth/UserContext';

describe('PlayingNow component', () => {
  test('renders playing now section with no songs added', () => {
    const { getByText } = render(
      <PlayingNow />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ playingNow: [] }}>{children}</UserContext.Provider> }
    );
    expect(getByText('Playing Now')).toBeInTheDocument();
    expect(getByText('No songs added yet.')).toBeInTheDocument();
  });

  test('renders playing now section with songs', async () => {
    const songs = [
      { id: 1, name: 'Song 1', artist: 'Artist 1', bpm: 120 },
      { id: 2, name: 'Song 2', artist: 'Artist 2', bpm: 140 },
    ];
    const { getByText } = render(
      <PlayingNow />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ playingNow: songs }}>{children}</UserContext.Provider> }
    );
    await waitFor(() => expect(getByText('Song Name')).toBeInTheDocument());
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Song 2')).toBeInTheDocument();
  });
});
