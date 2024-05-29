import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from './SearchForm';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';

// Mocking useContext hook
jest.mock('../auth/UserContext', () => ({
  __esModule: true,
  default: {
    appleMUT: 'mockedAppleMUT',
    music: {
      setQueue: jest.fn(),
      play: jest.fn(),
    },
    setMusic: jest.fn(),
    setPlayingNow: jest.fn(),
    setAppleMusicSearch: jest.fn(),
  },
}));

// Mocking axios and port3000Api
jest.mock('axios');
jest.mock('../api/port3000Api');

describe('SearchForm component', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<SearchForm />);
    expect(getByLabelText('Search genre/term/style/inspiration:')).toBeInTheDocument();
    expect(getByLabelText('Tempo:')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const setQueue = jest.fn();
    const play = jest.fn();
    const setMusic = jest.fn();
    const setPlayingNow = jest.fn();
    const setAppleMusicSearch = jest.fn();
    UserContext.default.music.setQueue.mockImplementation(setQueue);
    UserContext.default.music.play.mockImplementation(play);
    UserContext.default.setMusic.mockImplementation(setMusic);
    UserContext.default.setPlayingNow.mockImplementation(setPlayingNow);
    UserContext.default.setAppleMusicSearch.mockImplementation(setAppleMusicSearch);

    const getPlaylist = jest.fn(() => ({
      data: [{ id: 'song1' }, { id: 'song2' }],
    }));
    port3000Api.getPlaylist.mockImplementation(getPlaylist);

    const { getByLabelText, getByText } = render(<SearchForm />);

    fireEvent.change(getByLabelText('Search genre/term/style/inspiration:'), {
      target: { value: 'rock' },
    });

    fireEvent.change(getByLabelText('Tempo:'), { target: { value: 'fast' } });

    fireEvent.submit(getByText('Submit'));

    await waitFor(() => {
      expect(getPlaylist).toHaveBeenCalledWith('rock', 'mockedAppleMUT', 'fast');
      expect(setAppleMusicSearch).toHaveBeenCalledWith([{ id: 'song1' }, { id: 'song2' }]);
      expect(setPlayingNow).toHaveBeenCalledWith([{ id: 'song1' }, { id: 'song2' }]);
      expect(setQueue).toHaveBeenCalledWith({ items: [{ id: 'song1' }, { id: 'song2' }] });
      expect(play).toHaveBeenCalledTimes(1);
      expect(setMusic).toHaveBeenCalledWith(UserContext.default.music);
    });
  });
});
