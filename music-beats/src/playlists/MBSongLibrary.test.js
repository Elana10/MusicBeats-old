import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MBSongLibrary from './MBSongLibrary';
import port3000Api from '../api/port3000Api';

jest.mock('../api/port3000Api');

describe('MBSongLibrary component', () => {
  beforeEach(() => {
    port3000Api.getAllMusicBeatsSongsByName.mockResolvedValue([
      { id: 1, name: 'Song 1', artist: 'Artist 1', bpm: 120 },
      { id: 2, name: 'Song 2', artist: 'Artist 2', bpm: 140 },
    ]);
  });

  test('renders loading spinner while fetching data', async () => {
    const { getByTestId } = render(<MBSongLibrary />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(port3000Api.getAllMusicBeatsSongsByName).toHaveBeenCalledTimes(1));
  });

  test('renders song list after fetching data', async () => {
    const { getByText } = render(<MBSongLibrary />);
    await waitFor(() => expect(port3000Api.getAllMusicBeatsSongsByName).toHaveBeenCalledTimes(1));
    expect(getByText('Song Name')).toBeInTheDocument();
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByText('Beats Per Minute')).toBeInTheDocument();
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Song 2')).toBeInTheDocument();
  });

  test('handles click events for sorting options', async () => {
    const { getByText } = render(<MBSongLibrary />);
    await waitFor(() => expect(port3000Api.getAllMusicBeatsSongsByName).toHaveBeenCalledTimes(1));

    getByText('Song Name').click();
    await waitFor(() => expect(port3000Api.getAllMusicBeatsSongsByName).toHaveBeenCalledTimes(2));

    getByText('Artist').click();
    await waitFor(() => expect(port3000Api.getAllMusicBeatsSongsByArtist).toHaveBeenCalledTimes(1));

    getByText('Beats Per Minute').click();
    await waitFor(() => expect(port3000Api.getAllMusicBeatsSongsByBPM).toHaveBeenCalledTimes(1));
  });
});
