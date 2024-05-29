import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlaylistCard from './PlaylistCard';
import { UserContext } from '../auth/UserContext';
import { useNavigate } from 'react-router-dom';
import port3000Api from '../api/port3000Api';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../api/port3000Api', () => ({
  getAllSongsOnThePlaylist: jest.fn(),
  deleteUsersPlaylist: jest.fn(),
}));

describe('PlaylistCard component', () => {
  const userInfo = { id: 1 };
  const music = {
    setQueue: jest.fn(),
    play: jest.fn(),
  };

  test('renders playlist card with play button', () => {
    const playlist = { id: 1, name: 'Test Playlist', tempo: 'Medium', userid: userInfo.id };
    const { getByText } = render(
      <PlaylistCard playlist={playlist} refresh={false} setRefresh={() => {}} />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ userInfo, music }}>{children}</UserContext.Provider> }
    );
    expect(getByText('Test Playlist')).toBeInTheDocument();
    expect(getByText('Medium')).toBeInTheDocument();
    expect(getByText('Play')).toBeInTheDocument();
  });

  test('calls handlePlay when play button is clicked', async () => {
    const playlist = { id: 1, name: 'Test Playlist', tempo: 'Medium', userid: userInfo.id };
    port3000Api.getAllSongsOnThePlaylist.mockResolvedValue([{ id: 1, name: 'Song 1', artist: 'Artist 1', bpm: 120 }]);
    const { getByText } = render(
      <PlaylistCard playlist={playlist} refresh={false} setRefresh={() => {}} />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ userInfo, music }}>{children}</UserContext.Provider> }
    );
    fireEvent.click(getByText('Play'));
    expect(port3000Api.getAllSongsOnThePlaylist).toHaveBeenCalledWith(playlist.id);
    expect(music.setQueue).toHaveBeenCalledWith({ items: [{ id: 1, name: 'Song 1', artist: 'Artist 1', bpm: 120 }] });
    expect(music.play).toHaveBeenCalled();
  });

  test('calls handleView when view details button is clicked', () => {
    const playlist = { id: 1, name: 'Test Playlist', tempo: 'Medium', userid: userInfo.id };
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { getByText } = render(
      <PlaylistCard playlist={playlist} refresh={false} setRefresh={() => {}} />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ userInfo, music }}>{children}</UserContext.Provider> }
    );
    fireEvent.click(getByText('View Details'));
    expect(navigate).toHaveBeenCalledWith(`/playlist/${playlist.id}`);
  });

  test('calls handleDeletePlaylist when delete playlist button is clicked', () => {
    const playlist = { id: 1, name: 'Test Playlist', tempo: 'Medium', userid: userInfo.id };
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const setRefresh = jest.fn();
    const { getByText } = render(
      <PlaylistCard playlist={playlist} refresh={false} setRefresh={setRefresh} />,
      { wrapper: ({ children }) => <UserContext.Provider value={{ userInfo, music }}>{children}</UserContext.Provider> }
    );
    fireEvent.click(getByText('Delete Playlist'));
    expect(port3000Api.deleteUsersPlaylist).toHaveBeenCalledWith(playlist.id);
    expect(setRefresh).toHaveBeenCalled();
  });
});
