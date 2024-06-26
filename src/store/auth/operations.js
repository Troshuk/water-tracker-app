import axios from 'axios';

import { createAsyncThunkWithCatch } from 'store/redux.helpers';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const USERS_ENDPOINT = 'users/';

const getToken = state => state.authReducer.token;

const setToken = (token = null) =>
  (api.defaults.headers.Authorization = token && `Bearer ${token}`);

const getUsersTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

const multipartHeaders = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

export const fetchUser = createAsyncThunkWithCatch(
  'auth/fetchUser',
  async (_, { getState }) => {
    setToken(getToken(getState()));

    return (await api.get(USERS_ENDPOINT + 'current')).data;
  }
);

export const logIn = createAsyncThunkWithCatch('auth/logIn', async body => {
  const data = (
    await api.post(USERS_ENDPOINT + 'login', {
      ...body,
      timezone: getUsersTimezone(),
    })
  ).data;

  setToken(data.token);

  return data;
});

export const signUp = createAsyncThunkWithCatch('auth/signUp', async body => {
  const data = (
    await api.post(USERS_ENDPOINT + 'register', {
      ...body,
      timezone: getUsersTimezone(),
    })
  ).data;

  return data;
});

export const logOut = createAsyncThunkWithCatch('auth/logOut', async body => {
  const data = (await api.post(USERS_ENDPOINT + 'logout', body)).data;

  setToken();

  return data;
});

export const forgotPassword = createAsyncThunkWithCatch(
  'auth/forgotPassword',
  async body => (await api.post(USERS_ENDPOINT + 'password/forgot', body)).data
);

export const updatePassword = createAsyncThunkWithCatch(
  'auth/updatePassword',
  async ({ token, ...body }) =>
    (await api.post(USERS_ENDPOINT + `password/reset/${token}`, body)).data
);

export const updateAvatar = createAsyncThunkWithCatch(
  'users/updateAvatar',
  async body =>
    (await api.patch(USERS_ENDPOINT + 'avatar', body, multipartHeaders)).data
);

export const deleteAvatar = createAsyncThunkWithCatch(
  'users/deleteAvatar',
  async body => (await api.delete(USERS_ENDPOINT + 'avatar', body)).data
);

export const updateUser = createAsyncThunkWithCatch(
  'users/update',
  async body => (await api.patch(USERS_ENDPOINT + 'current', body)).data
);

export const updateWaterGoal = createAsyncThunkWithCatch(
  'user/updateWaterGoal',
  async body => (await api.patch(USERS_ENDPOINT + 'water/goal', body)).data
);

export const verifyEmail = createAsyncThunkWithCatch(
  'auth/verifyEmail',
  async token => (await api.get(USERS_ENDPOINT + `verify/${token}`)).data
);

export const resendEmail = createAsyncThunkWithCatch(
  'auth/resendEmail',
  async body => (await api.post(USERS_ENDPOINT + 'verify', body)).data
);
