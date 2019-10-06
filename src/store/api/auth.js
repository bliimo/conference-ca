import ajax from './ajax';
import { API } from '../../../constants/api';

export const logIn = data => {
  const url = `${API}/api/login`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const logInFacebook = ({ accessToken } = {}) => {
  const url = `${API}/api/facebook?id=${accessToken}`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signUp = data => {
  const url = `${API}/api/signup/customer`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const forgotPassword = data => {
  const url = `${API}/resetPassword`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const resendVerification = data => {
  const url = `${API}/resendVerification`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
