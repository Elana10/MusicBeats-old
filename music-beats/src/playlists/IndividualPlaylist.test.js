import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useParams, useNavigate } from 'react-router-dom';
import IndividualPlaylists from './IndividualPlaylists';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';

jest.mock('../api/port3000Api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('IndividualPlaylists component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
    port3000Api.getAllSongsOnThePlaylist.mockResolvedValue([
      { id: 1, name: 'Song 1', artist: 'Artist 1', bpm: 120 },
      { id: 2, name: 'Song 2', artist: 'Artist 2', bpm: 140 },
    ]);
    port3000Api.getIndividualPlaylist.mockResolvedValue({
      id: '1',
      name: 'Playlist 1',
      description: 'Description 1',
      userid: '1',
    });
  });

  test('renders loading spinner while fetching data', async () => {
    const { getByTestId } = render(<IndividualPlaylists />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(port3000Api.getAllSongsOnThePlaylist).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(port3000Api.getIndividualPlaylist).toHaveBeenCalledTimes(1));
  });

  test('renders playlist details and songs after fetching data', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ userInfo: { id: '1' }, music: {}, setPlayingNow: jest.fn() }}>
        <IndividualPlaylists />
      </UserContext.Provider>
    );
    await waitFor(() => expect(port3000Api.getAllSongsOnThePlaylist).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(port3000Api.getIndividualPlaylist).toHaveBeenCalledTimes(1));
    expect(getByText('Playlist: Playlist 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('Song Name')).toBeInTheDocument();
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByText('Beats Per Minute')).toBeInTheDocument();
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Song 2')).toBeInTheDocument();
  });

  test('renders playlist options buttons for user playlist', async () => {
    useParams.mockReturnValue({ id: '1' });
    const mockSetRefresh = jest.fn();
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const { getByText } = render(
      <UserContext.Provider value={{ userInfo: { id: '1' }, music: {}, setPlayingNow: jest.fn() }}>
        <IndividualPlaylists />
      </UserContext.Provider>
    );
    await waitFor(() => expect(port3000Api.getAllSongsOnThePlaylist).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(port3000Api.getIndividualPlaylist).toHaveBeenCalledTimes(1));
    expect(getByText('Play The Playlist!')).toBeInTheDocument();
    expect(getByText('Delete Playlist')).toBeInTheDocument();
    getByText('Play The Playlist!').click();
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/playingnow'));
  });

  test('renders playlist without delete option for non-user playlist', async () => {
    useParams.mockReturnValue({ id: '2' });
    const { queryByText } = render(
      <UserContext.Provider value={{ userInfo: { id: '1' }, music: {}, setPlayingNow: jest.fn() }}>
        <IndividualPlaylists />
      </UserContext.Provider>
    );
    await waitFor(() => expect(port3000Api.getAllSongsOnThePlaylist).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(port3000Api.getIndividualPlaylist).toHaveBeenCalledTimes(1));
    expect(queryByText('Delete Playlist')).not.toBeInTheDocument();
  });
});
