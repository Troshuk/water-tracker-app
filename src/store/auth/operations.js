import axios from 'axios';

import { createAsyncThunkWithCatch } from 'store/redux.helpers';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const USERS_ENDPOINT = 'users/';

const getToken = state => state.authReducer.token;

const setToken = (token = null) =>
  (api.defaults.headers.Authorization = token && `Bearer ${token}`);

export const fetchUser = createAsyncThunkWithCatch(
  'auth/fetchUser',
  async (_, { getState }) => {
    setToken(getToken(getState()));

    return (await api.get(USERS_ENDPOINT + 'current')).data;
  }
);

export const logIn = createAsyncThunkWithCatch('auth/logIn', async contact => {
  const data = (await api.post(USERS_ENDPOINT + 'login', contact)).data;

  setToken(data.token);

  return data;
});

export const signUp = createAsyncThunkWithCatch(
  'auth/signUp',
  async contact => {
    const data = (await api.post(USERS_ENDPOINT + 'register', contact)).data;

    setToken(data.token);

    return data;
  }
);

export const logOut = createAsyncThunkWithCatch(
  'auth/logOut',
  async contact => {
    const data = (await api.post(USERS_ENDPOINT + 'logout', contact)).data;

    setToken();

    return data;
  }
);
