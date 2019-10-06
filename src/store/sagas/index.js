import { fork, all } from 'redux-saga/effects';

import {
  getEventWatcher,
} from './events';

function* rootSaga() {

  /* EVENTS */
  yield all([fork(getEventWatcher)]);
}

export default rootSaga;
