import ajax from './ajax';
import { API } from '../../../constants/api';

export const getEvents = () => {
  const url = `${API}/events.json`;
  return ajax(
    url,
    {
      method: 'GET',
    },
    {},
  );
};
