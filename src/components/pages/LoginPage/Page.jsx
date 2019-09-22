import React, { Component } from 'react';
import { Page, Link, Toolbar, Tab, Tabs } from 'framework7-react';

import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';
import Account from '../../Tabs/Account/Account';

import style from './style.css';

import DashboardIcon from '../../../img/icons/activities.png';
import BoothsIcon from '../../../img/icons/booths.png';
import AccountIcon from '../../../img/icons/account.png';

import { connect } from 'react-redux';
import { auth } from '../../../reducers/reducer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'erwin.doria@bliimo.com',
      password: '12345678'
    };
  }

  HandleLogin = async () => {
    const { email, password } = this.state;
    auth(email, password)
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.HandleLogin();
  }

  render() {
    return (
      <Page pageContent={false}>
        <div className="page no-navbar no-toolbar no-swipeback">
          <div className="page-content login-screen-content login-page">
            <div className="login-screen-title">Login</div>
            <form>
              <div className="list">
                <ul>
                  <li className="item-content item-input">
                    <div className="item-inner">
                      <div className="item-title item-label">Email</div>
                      <div className="item-input">
                        <input type="text" name="email" placeholder="Email" />
                      </div>
                    </div>
                  </li>
                  <li className="item-content item-input">
                    <div className="item-inner">
                      <div className="item-title item-label">Password</div>
                      <div className="item-input">
                        <input type="password" name="password" placeholder="Password" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="list">
                <ul>
                  <li>
                    <a href="#" className="item-link list-button signin-link">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: state.authState
  };
};

const mapDispatchToProps = {
  auth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
