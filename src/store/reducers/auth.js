import get from 'lodash.get';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FACEBOOK_REQUEST,
  LOG_IN_FACEBOOK_FAILURE,
  LOG_IN_FACEBOOK_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  RESEND_VERIFICATION_REQUEST,
  RESEND_VERIFICATION_FAILURE,
  RESEND_VERIFICATION_SUCCESS,
  LOG_OUT_REQUEST,
} from '../actions/actionTypes';

const initialState = {
  isSendingResetPass: false,
  isResendingVerification: false,
  isLoggingIn: false,
  isLoggedIn: false,
  signedUp: false,
  hasError: false,
  error: {
    message: '',
  },
  accessToken: null,
  forgotPassData: {
    message: '',
  },
  resendVerificationData: {
    message: '',
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
    case LOG_IN_REQUEST:
    case LOG_IN_FACEBOOK_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        hasError: false,
        error: { message: '' },
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isSendingResetPass: true,
        hasError: false,
        error: { message: '' },
      };

    case RESEND_VERIFICATION_REQUEST:
      return {
        ...state,
        isResendingVerification: true,
        hasError: false,
        error: { message: '' },
      };

    case LOG_IN_SUCCESS:
    case LOG_IN_FACEBOOK_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        accessToken: get(action, 'payload.accessToken'),
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        signedUp: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSendingResetPass: false,
        forgotPassData: get(action, 'payload'),
      };

    case RESEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        isResendingVerification: false,
        resendVerificationData: get(action, 'payload'),
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        signedUp: false,
        isLoggingIn: false,
        hasError: true,
        error: get(action, 'payload'),
      };
    case LOG_IN_FAILURE:
    case LOG_IN_FACEBOOK_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        hasError: true,
        error: get(action, 'payload'),
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isSendingResetPass: false,
        forgotPassData: {
          message: '',
        },
        hasError: true,
        error: {
          ...get(action, 'payload'),
          type: 'resetPass',
        },
      };

    case RESEND_VERIFICATION_FAILURE:
      return {
        ...state,
        isResendingVerification: false,
        resendVerificationData: {
          message: '',
        },
        hasError: true,
        error: {
          ...get(action, 'payload'),
          type: 'resendVerification',
        },
      };

    case LOG_OUT_REQUEST:
      return initialState;

    default:
      return state;
  }
};

export default auth;
