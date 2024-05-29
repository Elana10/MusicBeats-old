import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddToPlaylistBox from './AddToPlaylistBox';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';

jest.mock('../api/port3000Api');

describe('AddToPlaylistBox component', () => {
  beforeEach(() => {
    port3000Api.getUserPlaylists.mockResolvedValue([
      { id: 1, name: 'Playlist 1' },
      { id: 2, name: 'Playlist 2' },
    ]);
  });

  test('renders component with loading spinner before user playlists are fetched', async () => {
    const { getByTestId } = render(<AddToPlaylistBox />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(port3000Api.getUserPlaylists).toHaveBeenCalledTimes(1));
  });

  test('renders component with user playlists after fetching', async () => {
    const { getByLabelText, getByText } = render(<AddToPlaylistBox />);
    await waitFor(() => expect(port3000Api.getUserPlaylists).toHaveBeenCalledTimes(1));
    expect(getByLabelText(/Add/i)).toBeInTheDocument();
    expect(getByText('Playlist 1')).toBeInTheDocument();
    expect(getByText('Playlist 2')).toBeInTheDocument();
  });

  test('adds song to selected playlist when "Add To Playlist" button is clicked', async () => {
    const setVisiblePlaylistBox = jest.fn();
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={{ userInfo: { id: 1 } }}>
        <AddToPlaylistBox visiblePlaylistBox={true} setVisiblePlaylistBox={setVisiblePlaylistBox} song={{ id: 123, attributes: { name: 'Song Name', artistName: 'Artist Name' } }} />
      </UserContext.Provider>
    );
    await waitFor(() => expect(port3000Api.getUserPlaylists).toHaveBeenCalledTimes(1));

    fireEvent.change(getByLabelText(/Add/i), { target: { value: 1 } });
    fireEvent.click(getByText(/Add To Playlist/i));

    await waitFor(() => expect(port3000Api.addSongToUserPlaylist).toHaveBeenCalledTimes(1));
    expect(port3000Api.addSongToUserPlaylist).toHaveBeenCalledWith(1, 123);
    expect(setVisiblePlaylistBox).toHaveBeenCalledTimes(1);
  });

  test('cancels adding song to playlist when "Cancel" button is clicked', async () => {
    const setVisiblePlaylistBox = jest.fn();
    const { getByText } = render(
      <AddToPlaylistBox visiblePlaylistBox={true} setVisiblePlaylistBox={setVisiblePlaylistBox} />
    );

    fireEvent.click(getByText(/Cancel/i));

    expect(setVisiblePlaylistBox).toHaveBeenCalledTimes(1);
  });
});
