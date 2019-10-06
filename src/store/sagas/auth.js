import { takeLatest, call, put } from 'redux-saga/effects';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_FACEBOOK_REQUEST,
  LOG_IN_FACEBOOK_SUCCESS,
  LOG_IN_FACEBOOK_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESEND_VERIFICATION_REQUEST,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAILURE,
} from '../actions/actionTypes';

import {
  logIn,
  logInFacebook,
  signUp,
  forgotPassword,
  resendVerification,
} from '../api/auth';

/* SIGN-UP */
function* signUpWorker(action) {
  try {
    const result = yield call(signUp, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: SIGN_UP_SUCCESS, payload: result });
    } else {
      yield put({ type: SIGN_UP_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: SIGN_UP_FAILURE });
  }
}

export function* signUpWatcher() {
  yield takeLatest(SIGN_UP_REQUEST, signUpWorker);
}

/* LOG-IN */
function* logInWorker(action) {
  try {
    const result = yield call(logIn, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: LOG_IN_SUCCESS, payload: result });
    } else {
      yield put({ type: LOG_IN_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: LOG_IN_FAILURE });
  }
}

export function* logInWatcher() {
  yield takeLatest(LOG_IN_REQUEST, logInWorker);
}

/* FACEBOOK LOG-IN */
export function* loginFacebook(action) {
  try {
    const result = yield call(logInFacebook, action.data);
    if (result.ok) {
      yield put({ type: LOG_IN_FACEBOOK_SUCCESS, payload: result });
    } else {
      yield put({ type: LOG_IN_FACEBOOK_FAILURE, payload: result });
    }
  } catch (error) {
    yield put({ type: LOG_IN_FACEBOOK_FAILURE });
  }
}

export function* logInFacebookWatcher() {
  yield takeLatest(LOG_IN_FACEBOOK_REQUEST, loginFacebook);
}

/* FORGOT PASSWORD */
function* forgotPasswordWorker(action) {
  try {
    const result = yield call(forgotPassword, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: result });
    } else {
      yield put({ type: FORGOT_PASSWORD_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: FORGOT_PASSWORD_FAILURE });
  }
}

export function* forgotPasswordWatcher() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordWorker);
}

/* RESEND EMAIL VERIFICATION */
function* resendVerificationWorker(action) {
  try {
    const result = yield call(resendVerification, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: RESEND_VERIFICATION_SUCCESS, payload: result });
    } else {
      yield put({ type: RESEND_VERIFICATION_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: RESEND_VERIFICATION_FAILURE });
  }
}

export function* resendVerificationWatcher() {
  yield takeLatest(RESEND_VERIFICATION_REQUEST, resendVerificationWorker);
}
