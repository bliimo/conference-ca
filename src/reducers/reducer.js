import firebase from 'firebase';
import { firebaseKeys } from '../keys';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL';

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAIL = 'GET_EVENTS_FAIL';


export const firebaseIni = () => {
  !firebase.apps.length &&
    firebase.initializeApp({
      apiKey: firebaseKeys.apiKey,
      authDomain: firebaseKeys.authDomain,
      databaseURL: firebaseKeys.databaseURL,
      storageBucket: firebaseKeys.storageBucket,
      projectId: firebaseKeys.projectId
    });
};

export const reducer = (
  state = {
    authState: [],
    eventsListState: {},
    picture: {}
  },
  action
) => {
  switch (action.type) {
    case GET_EVENTS:
      console.log('xxx');
      return { ...state, loading: true };
    case GET_EVENTS_SUCCESS:
      console.log('aaa');
      return { ...state, loading: false, eventsListState: action.payload.data };
    case GET_EVENTS_FAIL:
      console.log('sss');
      return {
        ...state,
        loading: false,
        authState: 'failed',
        error: 'Error while fetching data'
      };
    default:
      console.log(action);
      return state;
  }
};

export const getEvents = () => {
  return {
    type: GET_EVENTS, 
    url:'ddd',
    payload: {
      request: {
        method:"GET",
        url:'events.json'
      }
    }
  };
}

export const setData = (query, data) => {
  return firebase
    .database()
    .ref(query)
    .set(data)
    .then(e => {
      return { response: 'success' };
    })
    .catch(e => {
      return { response: 'failed', error: e };
    });
};

// Save email and password to firebase
export const addAuth = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(e => {
      return { response: 'success', id: e.user.uid };
    })
    .catch(e => {
      return { response: 'failed', error: e };
    });
};

// Sign in email and password in firebase and returns the key/id
export const auth = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(e => {
      return { response: 'success', id: e.user.uid };
    })
    .catch(e => {
      return { response: 'failed', error: e };
    });
};

export async function getFilteredData(query, key, value, continues, callback) {
  if (continues) {
    firebase
      .database()
      .ref(query)
      .orderByChild(key)
      .equalTo(value)
      .on('value', e => {
        callback(e.val());
      });
  } else {
    firebase
      .database()
      .ref(query)
      .orderByChild(key)
      .equalTo(value)
      .once('value', e => {
        callback(e.val());
      });
  }
}

export const setStorage = data => {
  // Object.keys(data).map(e => {
  //   localStorage.setItem([e], data[e]);
  // });
  // return {};
};

export const getStorage = key => {
  return localStorage.getItem(key);
};

export const getData = async query => {
  const ref = firebase.database().ref(query);
  const resp = await ref.once('value');
  return resp.val();
};
