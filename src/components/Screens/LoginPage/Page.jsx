import React, { Component } from 'react';
import { Page, Link, ListInput, List, ListButton, Preloader, Navbar, NavTitle } from 'framework7-react';
import { connect } from 'react-redux';
import { auth, setStorage, getStorage } from '../../../reducers/reducer';
import poweredBy from '../../../img/icons/bliimo-white-msap.png'
import style from './style.css';

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
    if (data.response === 'success') {
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
      <img src={poweredBy} alt='' className='poweredBy' style={{top:'.1em !important'}}/>
       <div id='top-nav' className='top-nav' style-={{marginTop:'1em'}}>
        <Link
            iconF7="chevron_left"
            color="white"
            className="back-button" 
            onClick={() => {
              this.$f7router.navigate('/');
            }}
            style={{padding:0}}
          ></Link>
        <span id="top-title" className="top-title" style={{display:'inline-block',width:'100% !important',textAlign:'center',fontSize:'2em !important'}}>Login</span>
       </div>
        <div>
          <div className="page-content login-screen-content login-page">
            <Preloader color="white" className="loading" style={{ display: this.state.logging ? 'block' : 'none', position: 'absolute', top: '50%', left: '50%' }}></Preloader>
            <List form style={{ display: this.state.logging ? 'none' : 'block',padding:'.5em'  }}>
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
