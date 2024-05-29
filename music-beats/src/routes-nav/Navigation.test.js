import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import Navigation from './Navigation';

describe('Navigation component', () => {
  test('renders Home link', () => {
    const { getByText } = render(<Navigation />, { wrapper: MemoryRouter });
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('renders Sign Up link', () => {
    const { getByText } = render(<Navigation />, { wrapper: MemoryRouter });
    const signUpLink = getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();
  });

  test('renders Login link when user is not logged in', () => {
    const { getByText } = render(<Navigation />, { wrapper: MemoryRouter });
    const loginLink = getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  test('does not render Login link when user is logged in', () => {
    const userInfo = { username: 'testuser' };
    const { queryByText } = render(
      <UserContext.Provider value={{ userInfo }}>
        <Navigation />
      </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const loginLink = queryByText('Login');
    expect(loginLink).toBeNull();
  });

  test('calls handleAppleAuth on click of Authorize Apple Music link', () => {
    const handleAppleAuth = jest.fn();
    const { getByText } = render(
      <UserContext.Provider value={{ isAppleAuth: false, handleAppleAuth }}>
        <Navigation />
      </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const authLink = getByText('Authorize Apple Music');
    fireEvent.click(authLink);
    expect(handleAppleAuth).toHaveBeenCalledTimes(1);
  });

  test('calls handleAppleLogout on click of Apple Music Logout link', () => {
    const handleAppleLogout = jest.fn();
    const { getByText } = render(
      <UserContext.Provider value={{ isAppleAuth: true, userInfo: { username: 'testuser' }, handleAppleLogout }}>
        <Navigation />
      </UserContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const logoutLink = getByText('Apple Music Logout');
    fireEvent.click(logoutLink);
    expect(handleAppleLogout).toHaveBeenCalledTimes(1);
  });
});
