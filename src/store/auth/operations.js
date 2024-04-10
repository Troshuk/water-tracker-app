import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const USERS_ENDPOINT = 'users/';

const getToken = state => state.authReducer.token;

const setToken = (token = null) =>
  (api.defaults.headers.Authorization = token && `Bearer ${token}`);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { getState }) => {
    setToken(getToken(getState()));

    return (await api.get(USERS_ENDPOINT + 'current')).data;
  }
);

export const logIn = createAsyncThunk('auth/logIn', async contact => {
  const data = (await api.post(USERS_ENDPOINT + 'login', contact)).data;

  setToken(data.token);

  return data;
});

export const signUp = createAsyncThunk('auth/signUp', async contact => {
  const data = (await api.post(USERS_ENDPOINT + 'signup', contact)).data;

  setToken(data.token);

  return data;
});

export const logOut = createAsyncThunk('auth/logOut', async contact => {
  const data = (await api.post(USERS_ENDPOINT + 'logout', contact)).data;

  setToken();

  return data;
});
