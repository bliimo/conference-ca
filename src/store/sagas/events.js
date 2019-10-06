import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
} from '../actions/actionTypes';

import {
  getEvents,
} from '../api/events';

/* FETCH OTHER USER'S BUDDIES */
function* getEventsWorker(action) {
  try {
    const result = yield call(getUserBuddies, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: GET_EVENTS_SUCCESS, payload: result });
    } else {
      yield put({ type: GET_EVENTS_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: GET_EVENTS_FAILURE });
  }
}

export function* getEventsWatcher() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsWorker);
}
