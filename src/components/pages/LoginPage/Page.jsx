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
    return <Page pageContent={false}>Login Page</Page>;
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
