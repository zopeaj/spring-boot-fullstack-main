import { createEntityAdapter } from "@reduxjs/toolkit";

export const initialState = createEntityAdapter.getInitialState({
  token: '',
  isLoggedIn: false,
  logInError: false,
  isAdmin: false,
  isAuthenticated: false,
  isAuthorized: false,
  registrationError: '',
  status: '',
  apiError: '',
  statusText: '',
  passwordRecovery: null,
  userProfile: {
    usernameOrEmail: '',
    age: null,
    password: '',
    email: '',
    isActive: false,
    id: null,
    fullName: ''
  },
});

