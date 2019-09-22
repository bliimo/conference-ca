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
import { addAuth, setData } from '../../../reducers/reducer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'erwin.doria@bliimo.com',
      password: '12345678',
      firstname: 'Erwin',
      middlename: 'Barayuga',
      lastname: 'Doria'
    };
  }

  onHandleRegister = () => {
    let { email, password, firstname, middlename, lastname } = this.state;
    addAuth(email, password)
      .then(e => {
        console.log(e, e.response);
        if (e.response == 'success') {
          let userData = { accountID: e.id, firstname, middlename, lastname, email, status: false, profilePicture: '' };
          setData(`user/${e.id}`, userData)
            .then(e => {
              setTimeout(() => {
                console.log('Registration successful!');
              }, 1000);
              this.setState({ signing: false, email: '', mobilenumber: '', password: '', firstname: '', middlename: '', lastname: '', username: '' });
            })
            .catch(e => {
              console.log('Something went wrong', e);
            });
        } else if (e.error.code == 'auth/network-request-failed') {
          console.log('No internet');
        } else if (e.error.code == 'auth/email-already-in-use') {
          console.log('Email already used !');
        }
      })
      .catch(e => {
        console.log('Something went wrong', e);
      });
  };

  render() {
    return (
      <Page pageContent={false}>
        <div className="page no-navbar no-toolbar no-swipeback">
          <div className="page-content login-screen-content signup-page">
            <div className="login-screen-title">Sign Up</div>
            <form>
              <div className="list">
                <ul>
                  <li className="item-content item-input">
                    <div className="item-inner">
                      <div className="item-title item-label">Firstname</div>
                      <div className="item-input">
                        <input type="text" name="firstname" placeholder="Firstname" />
                      </div>
                    </div>
                  </li>
                  <li className="item-content item-input">
                    <div className="item-inner">
                      <div className="item-title item-label">Lastname</div>
                      <div className="item-input">
                        <input type="text" name="lastname" placeholder="Lastname" />
                      </div>
                    </div>
                  </li>
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
                    <a href="#" className="item-link list-button signup-link">
                      Sign Up
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
  addAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
