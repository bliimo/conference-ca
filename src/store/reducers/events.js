import get from 'lodash.get';
import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  requesting: false,
  hasError: false,
  result: null,
  receivedRequests: [],
  sentRequests: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUDDY_REQUEST:
    case CANCEL_BUDDY_REQUEST_REQUEST:
    case DECLINE_BUDDY_REQUEST_REQUEST:
    case ACCEPT_BUDDY_REQUEST_REQUEST:
    case UNBUDDY_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_BUDDIES_FAILURE:
    case GET_REQUESTS_FAILURE:
    case GET_USER_BUDDIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        result: get(action, 'payload'),
      };

    case ADD_BUDDY_FAILURE:
    case CANCEL_BUDDY_REQUEST_FAILURE:
    case DECLINE_BUDDY_REQUEST_FAILURE:
    case ACCEPT_BUDDY_REQUEST_FAILURE:
    case UNBUDDY_FAILURE:
      return {
        ...state,
        requesting: false,
        hasError: true,
        result: get(action, 'payload'),
      };

    case GET_BUDDIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        buddies: get(action, 'payload.buddies'),
      };

    case GET_USER_BUDDIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        userBuddies: get(action, 'payload.buddies'),
      };

    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        receivedRequests: get(action, 'payload.buddyRequests'),
        sentRequests: get(action, 'payload.sentBuddyRequests'),
        mutualBuddiesFromReceived: get(action, 'payload.mutualBuddies'),
        mutualBuddiesFromSent: get(
          action,
          'payload.currentUserAsSendermutualBuddies',
        ),
      };

    case ADD_BUDDY_SUCCESS:
    case CANCEL_BUDDY_REQUEST_SUCCESS:
    case DECLINE_BUDDY_REQUEST_SUCCESS:
    case ACCEPT_BUDDY_REQUEST_SUCCESS:
    case UNBUDDY_SUCCESS:
      return {
        ...state,
        requesting: false,
        hasError: false,
        result: get(action, 'payload'),
      };

    case LOG_OUT_REQUEST:
      return initialState;

    default:
      return {
        ...state,
      };
  }
};

export default events;
