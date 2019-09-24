import React, { Component } from 'react';
import { Page, Link, Toolbar, Tab, Tabs, Preloader, LoginScreen, LoginScreenTitle, List, ListButton, ListInput } from 'framework7-react';

import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';
import Account from '../../Tabs/Account/Account';

import style from './style.css';

import DashboardIcon from '../../../img/icons/activities.png';
import BoothsIcon from '../../../img/icons/booths.png';
import AccountIcon from '../../../img/icons/account.png';

import { connect } from 'react-redux';
import { addAuth, setData, setStorage, getStorage } from '../../../reducers/reducer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      middlename: '',
      lastname: '',
      repassword: '',
      logging: false
    };
  }

  componentWillMount() {
    const email = getStorage('email');
    if (email) {
      this.$f7router.navigate('/Home');
    }
  }

  onHandleRegister = async () => {
    let { email, password, firstname, middlename, lastname, repassword } = this.state;
    this.setState({ logging: true });
    if (password != repassword) {
      alert('Password and re-type password should same ');
    } else {
      const data = await addAuth(email, password);
      if (data.response == 'success') {
        let userData = { accountID: data.id, firstname, middlename, lastname, email, status: false, profilePicture: '' };
        await setData(`user/${data.id}`, userData);
        setStorage({ email });
        alert('Registration successful!');
        this.$f7router.navigate('/');
      } else if (data.error.code == 'auth/network-request-failed') {
        alert('No internet');
      } else if (data.error.code == 'auth/email-already-in-use') {
        alert('Email already used !');
      } else {
        alert('Something went wrong');
        console.log('Something went wrong', data);
      }
    }
    this.setState({ logging: false });
  };

  render() {
    return (
      <Page pageContent={false}>
        <div className="page no-navbar no-toolbar no-swipeback">
          <div className="page-content login-screen-content signup-page">
            <Preloader color="white" className="loading" style={{ display: this.state.logging ? 'block' : 'none', position: 'absolute', top: '50%', left: '50%' }}></Preloader>
            <LoginScreenTitle>Register</LoginScreenTitle>
            <List form style={{ display: this.state.logging ? 'none' : 'block' }}>
              <ListInput
                value={this.state.firstname}
                onInput={e => {
                  this.setState({ firstname: e.target.value });
                }}
                label="Firstname"
                type="text"
                placeholder="Firstname"
              />
              <ListInput
                value={this.state.lastname}
                onInput={e => {
                  this.setState({ lastname: e.target.value });
                }}
                label="Lastname"
                type="text"
                placeholder="Lastname"
              />
              <ListInput
                value={this.state.middlename}
                onInput={e => {
                  this.setState({ middlename: e.target.value });
                }}
                label="Middlename"
                type="text"
                placeholder="Middlename"
              />
              <ListInput
                value={this.state.email}
                onInput={e => {
                  this.setState({ email: e.target.value });
                }}
                label="Email"
                type="email"
                placeholder="Email"
              />
              <ListInput
                value={this.state.password}
                onInput={e => {
                  this.setState({ password: e.target.value });
                }}
                label="Password"
                type="password"
                placeholder="Password"
              />
              <ListInput
                value={this.state.repassword}
                onInput={e => {
                  this.setState({ repassword: e.target.value });
                }}
                label="Re-type Password"
                type="password"
                placeholder="Re-type Password"
              />
              <ListButton onClick={() => this.onHandleRegister()}>Register</ListButton>
            </List>
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
