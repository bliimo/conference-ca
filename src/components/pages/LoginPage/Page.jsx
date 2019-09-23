import React, { Component } from 'react';
import { Page, Link, Toolbar, Tab, Tabs, ListInput, List, ListButton, LoginScreenTitle, Preloader } from 'framework7-react';

import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';
import Account from '../../Tabs/Account/Account';

import style from './style.css';

import DashboardIcon from '../../../img/icons/activities.png';
import BoothsIcon from '../../../img/icons/booths.png';
import AccountIcon from '../../../img/icons/account.png';

import { connect } from 'react-redux';
import { auth, setStorage, getStorage } from '../../../reducers/reducer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      logging: false
    };
  }

  componentWillMount() {
    const email = getStorage('email');
    alert('You have already logged in, redirecting to homepage');
    if (email) this.$f7router.navigate('/home');
  }

  HandleLogin = async () => {
    const { email, password } = this.state;
    this.setState({ logging: true });
    const data = await auth(email, password);
    this.setState({ logging: false });
    if (data.response == 'success') {
      setStorage({ email, password });
      alert('Successfully logged in');
      this.$f7router.navigate('/home');
    } else {
      alert(data);
    }
  };

  render() {
    return (
      <Page pageContent={false} loginScreen>
        <div className="page no-navbar no-toolbar no-swipeback">
          <div className="page-content login-screen-content login-page">
            <Preloader
              color="white"
              className="loading"
              style={{ display: this.state.logging ? 'block' : 'none', position: 'absolute', top: '50%', left: '50%' }}
            ></Preloader>
            <LoginScreenTitle>Log in</LoginScreenTitle>
            <List form style={{ display: this.state.logging ? 'none' : 'block' }}>
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
              <ListButton onClick={() => this.HandleLogin()}>Login</ListButton>
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
  auth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
