import { createSelector } from '@reduxjs/toolkit';

import {
  fetchUser,
  logIn,
  logOut,
  signUp,
  updateUser,
  updateAvatar,
  forgotPassword,
  updatePassword,
  verifyEmail,
  updateWaterGoal,
  resendEmail,
} from './operations';

export const AuthReducerSelector = ({ authReducer }) => authReducer;

export const tokenSelector = createSelector(
  AuthReducerSelector,
  state => state.token
);

export const isLoggedInSelector = createSelector(
  AuthReducerSelector,
  state => state.isLoggedIn
);

export const userSelector = createSelector(
  AuthReducerSelector,
  state => state.user
);

export const dailyWaterGoalSelector = createSelector(
  userSelector,
  state => state.dailyWaterGoal
);

export const signUpSelector = createSelector(
  AuthReducerSelector,
  state => state[signUp.typePrefix]
);

export const logInSelector = createSelector(
  AuthReducerSelector,
  state => state[logIn.typePrefix]
);

export const logOutSelector = createSelector(
  AuthReducerSelector,
  state => state[logOut.typePrefix]
);

export const fetchUserSelector = createSelector(
  AuthReducerSelector,
  state => state[fetchUser.typePrefix]
);

export const forgotPasswordSelector = createSelector(
  AuthReducerSelector,
  state => state[forgotPassword.typePrefix]
);

export const updatePasswordSelector = createSelector(
  AuthReducerSelector,
  state => state[updatePassword.typePrefix]
);

export const verifyEmailSelector = createSelector(
  AuthReducerSelector,
  state => state[verifyEmail.typePrefix]
);
export const updateUserSelector = createSelector(
  AuthReducerSelector,
  state => state[updateUser.typePrefix]
);

export const updateAvatarSelector = createSelector(
  AuthReducerSelector,
  state => state[updateAvatar.typePrefix]
);

export const updateWaterGoalSelector = createSelector(
  AuthReducerSelector,
  state => state[updateWaterGoal.typePrefix]
);

export const resendEmailSelector = createSelector(
  AuthReducerSelector,
  state => state[resendEmail.typePrefix]
);
