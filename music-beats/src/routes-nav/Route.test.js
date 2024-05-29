import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RouteList from './RouteList';
import Home from './Home';
import SignUp from '../common/SignUp';
import Login from '../common/Login';
import SearchAppleMusic from '../playlists/SearchAppleMusic';
import CreatePlaylists from '../playlists/CreatePlaylist';
import MBSongLibrary from '../playlists/MBSongLibrary';
import PlayingNow from '../playlists/PlayingNow';
import IndividualPlaylists from '../playlists/IndividualPlaylist';

describe('RouteList component', () => {
  test('renders Home component for / route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('renders SignUp component for /signup route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const signUpLink = getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();
  });

  test('renders Login component for /login route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const loginLink = getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  test('renders SearchAppleMusic component for /searchapplemusic route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const searchLink = getByText('Search Apple Music');
    expect(searchLink).toBeInTheDocument();
  });

  test('renders CreatePlaylists component for /playlists route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const playlistsLink = getByText('Playlists');
    expect(playlistsLink).toBeInTheDocument();
  });

  test('renders MBSongLibrary component for /mbsonglibrary route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const libraryLink = getByText('MusicBeats Song Library');
    expect(libraryLink).toBeInTheDocument();
  });

  test('renders PlayingNow component for /playingnow route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    const playingNowLink = getByText('Currently Playing');
    expect(playingNowLink).toBeInTheDocument();
  });

  test('renders IndividualPlaylists component for /playlist/:id route', () => {
    const { getByText } = render(<RouteList />, { wrapper: MemoryRouter });
    // Replace :id with a valid ID if you have one
    const individualPlaylistLink = getByText('Individual Playlist');
    expect(individualPlaylistLink).toBeInTheDocument();
  });
});
