/* eslint-disable fp/no-let */
/* eslint-disable no-undef */
/* eslint-disable fp/no-mutation */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';

import rootReducer from './reducers';
import rootSaga from './sagas';

const migrations = {
  0: state => ({
    ...state,
  }),
  1: state => ({
    auth: state.auth,
  }),
  2: state => ({
    auth: state.auth,
  }),
  3: state => ({
    auth: state.auth,
  }),
  4: state => ({
    auth: state.auth,
  }),
  // version 2.7.1
  5: state => ({
    auth: state.auth,
  }),
  // version 2.7.2
  6: state => ({
    auth: state.auth,
  }),
  // version 2.7.3
  7: state => ({
    auth: state.auth,
  }),
  // version 2.7.5
  8: state => ({
    auth: state.auth,
  }),
  // version 2.7.6
  9: state => ({
    auth: state.auth,
  }),
  // version 3.0.0
  10: () => ({}),
  // version 3.0.1
  11: () => ({}),
  // version 3.0.2
  12: () => ({}),
  // version 3.0.3
  13: () => ({}),
  // version 3.0.5
  14: () => ({}),
  // version 3.0.7,
  15: state => ({
    auth: state.auth,
  }),
};

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = compose;
  const persistConfig = {
    key: 'root',
    version: 15,
    storage: AsyncStorage,
    migrate: createMigrate(migrations, { debug: false }),
    blacklist: ['nav'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  if (__DEV__) {
    const loggerMiddleware = createLogger({ collapsed: true });
    const store = {
      ...createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware)),
      ),
      runSaga: sagaMiddleware.run(rootSaga),
    };
    const persistor = persistStore(store);
    return { store, persistor };
  }

  const store = {
    ...createStore(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware)),
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
