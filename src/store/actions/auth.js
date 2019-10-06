/* eslint-disable import/prefer-default-export */
import {
  SIGN_UP_REQUEST,
  LOG_IN_REQUEST,
  LOG_IN_FACEBOOK_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESEND_VERIFICATION_REQUEST,
  LOG_OUT_REQUEST,
} from './actionTypes';

export const signUp = (data = {}) => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const logIn = (data = {}) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logInFacebook = (data = {}) => ({
  type: LOG_IN_FACEBOOK_REQUEST,
  data,
});

export const forgotPassword = (data = {}) => ({
  type: FORGOT_PASSWORD_REQUEST,
  data,
});

export const resendVerification = (data = {}) => ({
  type: RESEND_VERIFICATION_REQUEST,
  data,
});

export const logOut = (data = {}) => ({
  type: LOG_OUT_REQUEST,
  data,
});
