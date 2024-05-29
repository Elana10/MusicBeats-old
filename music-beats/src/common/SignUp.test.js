import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './SignUp';
import UserContext from '../auth/UserContext';
import port3000Api from '../api/port3000Api';

// Mocking useContext hook
jest.mock('../auth/UserContext', () => ({
  __esModule: true,
  default: {
    setJWT: jest.fn(),
    setUserInfo: jest.fn(),
  },
}));

// Mocking axios and port3000Api
jest.mock('axios');
jest.mock('../api/port3000Api');

describe('SignUp component', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const setJWT = jest.fn();
    const setUserInfo = jest.fn();
    UserContext.default.setJWT.mockImplementation(setJWT);
    UserContext.default.setUserInfo.mockImplementation(setUserInfo);

    const signUp = jest.fn(() => ({
      token: 'mockedToken',
      user: { id: 'mockedUserId', username: 'mockedUsername' },
    }));
    port3000Api.signUp.mockImplementation(signUp);

    const { getByLabelText, getByText } = render(<SignUp />);

    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('Password:'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(getByText('Sign Up'));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(setJWT).toHaveBeenCalledWith('mockedToken');
      expect(setUserInfo).toHaveBeenCalledWith({
        id: 'mockedUserId',
        username: 'mockedUsername',
      });
    });
  });

  test('displays error message for duplicate username', async () => {
    const signUp = jest.fn(() => {
      throw new Error('Username taken');
    });
    port3000Api.signUp.mockImplementation(signUp);

    const { getByLabelText, getByText } = render(<SignUp />);

    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'existinguser' },
    });
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('Password:'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Username taken. Please try a different username.')).toBeInTheDocument();
    });
  });
});
