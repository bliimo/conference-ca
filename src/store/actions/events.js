import firebase from 'react-native-firebase';
import { get } from 'lodash';
import {
  GET_EVENTS_REQUEST,
} from './actionTypes';

export const getEvents = (data = {}) => {
  return {
    type: GET_EVENTS_REQUEST,
    data,
  };
};
