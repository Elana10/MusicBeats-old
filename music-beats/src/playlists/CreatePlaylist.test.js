import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePlaylists from './CreatePlaylists';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';

jest.mock('../api/port3000Api');

describe('CreatePlaylists component', () => {
  beforeEach(() => {
    port3000Api.getAllPlaylists.mockResolvedValue([
      { id: 1, name: 'Playlist 1', userid: 1 },
      { id: 2, name: 'Playlist 2', userid: 2 },
    ]);
  });

  test('renders component with loading spinner before playlists are fetched', async () => {
    const { getByTestId } = render(<CreatePlaylists />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(port3000Api.getAllPlaylists).toHaveBeenCalledTimes(1));
  });

  test('renders component with user playlists after fetching', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ userInfo: { id: 1 } }}>
        <CreatePlaylists />
      </UserContext.Provider>
    );
    await waitFor(() => expect(port3000Api.getAllPlaylists).toHaveBeenCalledTimes(1));
    expect(getByText('My Playlists')).toBeInTheDocument();
    expect(getByText('Playlist 1')).toBeInTheDocument();
  });

  test('renders component with all playlists after fetching', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ userInfo: { id: 1 } }}>
        <CreatePlaylists />
      </UserContext.Provider>
    );
    await waitFor(() => expect(port3000Api.getAllPlaylists).toHaveBeenCalledTimes(1));
    expect(getByText('All Playlists')).toBeInTheDocument();
    expect(getByText('Playlist 2')).toBeInTheDocument();
  });
});
