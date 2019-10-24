import React, { Component } from 'react';
import { Page, Link, Toolbar, Tab, Tabs, ListInput, List, ListButton, LoginScreenTitle, Preloader, Navbar, NavTitle } from 'framework7-react';

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
    const uid = getStorage('uid');
    if (uid) this.$f7router.navigate('/home');
  }

  HandleLogin = async () => {
    const { email, password } = this.state;
    this.setState({ logging: true });
    const data = await auth(email, password);
    this.setState({ logging: false });
    if (data.response == 'success') {
      setStorage({ uid: data.id });
      alert('Successfully logged in');
      this.$f7router.navigate('/');
    } else {
      alert('Invalid account')
    }
  };

  render() {
    return (
      <Page pageContent={false} loginScreen>
        <Navbar className="nav-account" style={{marginTop:'2em'}}>
          <Link
            iconMd="material:keyboard_arrow_left"
            color="white"
            className="back-button" 
            onClick={() => {
              this.$f7router.navigate('/');
            }}
          ></Link>
          <NavTitle className="top-title">Login</NavTitle>
          </Navbar>
        <div className="page no-navbar no-toolbar no-swipeback" style={{marginTop:'6em'}}>
          <div className="page-content login-screen-content login-page">
            <Preloader color="white" className="loading" style={{ display: this.state.logging ? 'block' : 'none', position: 'absolute', top: '50%', left: '50%' }}></Preloader>
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
              <ListButton className='btn-reg' onClick={() => this.HandleLogin()}>Login</ListButton>
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
