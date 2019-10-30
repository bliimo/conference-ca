import React, { Component } from 'react';
import { App, View } from 'framework7-react';
import routes from '../routes'; 
import { firebaseIni, reducer } from '../reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import multiClientMiddleware from 'redux-axios-middleware';
import axios from 'axios';

const client = axios.create({
  method: 'post',
  baseURL: 'https://msap-dev.firebaseio.com/',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(multiClientMiddleware(client)));
const f7params = {
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  routes // app routes
};
export default class Apps extends Component {
  componentDidMount() {
    firebaseIni();
  }
  render() {
    return (
      <Provider store={store}>
        <App params={f7params}>
          <View id="main-view" url="/" main className="safe-areas" />
        </App>
      </Provider>
    );
  }
}


