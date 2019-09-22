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
    return <Page pageContent={false}>Registration Page</Page>;
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
