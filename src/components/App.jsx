import React, { Component } from 'react';
import { App, Panel, View, Statusbar, Popup, Page, Navbar, NavRight, Link, Block, LoginScreen, LoginScreenTitle, List, ListInput, ListButton, BlockFooter } from 'framework7-react';

import routes from '../routes';

import { firebaseIni, reducer, getStorage } from '../reducers/reducer';
import axios from 'axios';
import multiClientMiddleware from 'redux-axios-middleware';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {env} from '../keys';

const client = axios.create({
  method: 'POST',
  baseURL: env,
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(multiClientMiddleware(client)));

const f7params = {
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes
};
export default class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  componentWillMount() {}

  componentDidMount() {
    firebaseIni();
  }
  // Framework7 parameters here

  render() {
    return (
      <Provider store={store}>
        <App params={f7params}>
          <Statusbar />
          <Panel left cover themeDark>
            <View url="/panel-left/" />
          </Panel>
          <Panel right reveal themeDark>
            <View url="/panel-right/" />
          </Panel>
          <View id="main-view" url="/" main className="safe-areas" />
          <Popup id="popup">
            <View>
              <Page>
                <Navbar title="Popup">
                  <NavRight>
                    <Link popupClose>Close</Link>
                  </NavRight>
                </Navbar>
                <Block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</Block>
              </Page>
            </View>
          </Popup>

          {/* Login Screen */}
          <LoginScreen id="login-screen">
            <View>
              <Page loginScreen>
                <LoginScreenTitle>Login</LoginScreenTitle>
                <List form>
                  <ListInput label="Username" name="username" placeholder="Username" type="text" />
                  <ListInput label="Password" name="password" placeholder="Password" type="password" />
                </List>
                <List>
                  <ListButton title="Sign In" loginScreenClose></ListButton>
                  <BlockFooter>
                    <p>Click Sign In to close Login Screen</p>
                  </BlockFooter>
                </List>
              </Page>
            </View>
          </LoginScreen>
        </App>
      </Provider>
    );
  }
}
