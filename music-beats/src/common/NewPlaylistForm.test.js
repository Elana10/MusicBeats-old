import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewPlaylistForm from './NewPlaylistForm';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';

// Mocking useContext hook
jest.mock('../auth/UserContext', () => ({
  __esModule: true,
  default: {
    userInfo: { id: 'user123' },
    appleMUT: 'mockedAppleMUT',
    music: {
      setQueue: jest.fn(),
      play: jest.fn(),
    },
    setPlayingNow: jest.fn(),
    setMusic: jest.fn(),
  },
}));

// Mocking axios and port3000Api
jest.mock('axios');
jest.mock('../api/port3000Api');

describe('NewPlaylistForm component', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<NewPlaylistForm />);
    expect(getByLabelText('Playlist Name:')).toBeInTheDocument();
    expect(getByLabelText('Enter a description of your playlist:')).toBeInTheDocument();
    expect(getByLabelText('Tempo:')).toBeInTheDocument();
    expect(getByLabelText('Search genre/style/inspiration:')).toBeInTheDocument();
    expect(getByText('Create Playlist')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const setPlayingNow = jest.fn();
    const setQueue = jest.fn();
    const play = jest.fn();
    const setMusic = jest.fn();
    UserContext.default.setPlayingNow.mockImplementation(setPlayingNow);
    UserContext.default.music.setQueue.mockImplementation(setQueue);
    UserContext.default.music.play.mockImplementation(play);
    UserContext.default.setMusic.mockImplementation(setMusic);

    const createPlaylist = jest.fn(() => ({ result: { id: 'playlist123' } }));
    const getPlaylist = jest.fn(() => ({
      data: [{ id: 'song1' }, { id: 'song2' }],
    }));
    port3000Api.createPlaylist.mockImplementation(createPlaylist);
    port3000Api.getPlaylist.mockImplementation(getPlaylist);

    const { getByLabelText, getByText } = render(<NewPlaylistForm />);

    fireEvent.change(getByLabelText('Playlist Name:'), { target: { value: 'My Playlist' } });
    fireEvent.change(getByLabelText('Enter a description of your playlist:'), {
      target: { value: 'This is a test playlist' },
    });
    fireEvent.change(getByLabelText('Search genre/style/inspiration:'), {
      target: { value: 'rock' },
    });

    fireEvent.submit(getByText('Create Playlist'));

    await waitFor(() => {
      expect(createPlaylist).toHaveBeenCalledTimes(1);
      expect(getPlaylist).toHaveBeenCalledTimes(1);
      expect(setPlayingNow).toHaveBeenCalledWith([{ id: 'song1' }, { id: 'song2' }]);
      expect(setQueue).toHaveBeenCalledWith({ items: [{ id: 'song1' }, { id: 'song2' }] });
      expect(play).toHaveBeenCalledTimes(1);
      expect(setMusic).toHaveBeenCalledWith(UserContext.default.music);
    });
  });
});
