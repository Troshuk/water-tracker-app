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

  setToken(data.token);

  return data;
});

export const logOut = createAsyncThunkWithCatch('auth/logOut', async body => {
  const data = (await api.post(USERS_ENDPOINT + 'logout', body)).data;

  setToken();

  return data;
});

export const forgotPassword = createAsyncThunkWithCatch(
  'auth/forgotPassword',
  async ({email}, {getState}) => {
    setToken(getToken(getState()));
    const data = (await api.post(USERS_ENDPOINT + 'password/forgot', {email}))
      .data;

    return data;
  }
);

// export const forgotPassword = createAsyncThunkWithCatch(
//   'auth/forgotPassword',
//   async ({email}, {getState}) => {
//     setToken(getToken(getState()));
//     const data = (await api.post(USERS_ENDPOINT + 'password/forgot', {email}))
//       .data;

//     return data;
//   }
// );
