import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import UserContext from '../auth/UserContext';

// Mocking useContext hook
jest.mock('../auth/UserContext', () => ({
  __esModule: true,
  default: {
    setJWT: jest.fn(),
    setUserInfo: jest.fn(),
  },
}));

describe('Login component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    const { getByLabelText, getByText } = render(<Login />, { wrapper: MemoryRouter });
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('submits login form with valid credentials', async () => {
    const setJWT = jest.fn();
    const setUserInfo = jest.fn();
    UserContext.setJWT.mockImplementation(setJWT);
    UserContext.setUserInfo.mockImplementation(setUserInfo);

    const { getByLabelText, getByText } = render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(setJWT).toHaveBeenCalledTimes(1);
      expect(setUserInfo).toHaveBeenCalledTimes(1);
    });
  });
});
