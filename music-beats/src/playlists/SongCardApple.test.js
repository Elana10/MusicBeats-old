import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SongCardApple from './SongCardApple';
import { UserContext } from '../auth/UserContext';

describe('SongCardApple component', () => {
  const song = {
    id: 1,
    attributes: {
      name: 'Song Name',
      artistName: 'Artist',
    },
    bpm: 120,
  };

  const deleteSong = jest.fn();
  const refresh = false;
  const setRefresh = jest.fn();
  const refreshPlaylist = false;
  const setRefreshPlaylist = jest.fn();

  test('renders with delete song option', () => {
    const { getByText } = render(
      <SongCardApple
        song={song}
        deleteSong={deleteSong}
        refresh={refresh}
        setRefresh={setRefresh}
        refreshPlaylist={refreshPlaylist}
        setRefreshPlaylist={setRefreshPlaylist}
      />
    );
    expect(getByText('Song Name')).toBeInTheDocument();
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByText('120')).toBeInTheDocument();
    fireEvent.click(getByText('Remove Song'));
    expect(deleteSong).toHaveBeenCalledWith(song.id);
  });

  test('renders without delete song option', () => {
    const { getByText } = render(
      <SongCardApple
        song={song}
        refresh={refresh}
        setRefresh={setRefresh}
        refreshPlaylist={refreshPlaylist}
        setRefreshPlaylist={setRefreshPlaylist}
      />
    );
    expect(getByText('Song Name')).toBeInTheDocument();
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByText('120')).toBeInTheDocument();
    fireEvent.click(getByText('Add to Playlist'));
    fireEvent.click(getByText('Play'));
    expect(setRefreshPlaylist).toHaveBeenCalled();
    expect(setRefresh).toHaveBeenCalled();
  });
});
