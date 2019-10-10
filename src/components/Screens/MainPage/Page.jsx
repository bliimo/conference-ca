import React from 'react';
import { App, Button, Row, Col, Block, Link, Page } from 'framework7-react';

import style from './style.css';

import HarleyLogo from '../../../img/Booths/HarleyLogo.png';
import InquirerLogo from '../../../img/Booths/InquirerLogo.png';
import JackAndJillLogo from '../../../img/Booths/JackAndJillLogo.png';
import PepsiLogo from '../../../img/Booths/PepsiLogo.png';
import UratexLogo from '../../../img/Booths/UratexLogo.png';
import FritolayLogo from '../../../img/Booths/FritolayLogo.png';
import { firebaseIni, setStorage, setData, getStorage } from '../../../reducers/reducer';
import firebase from 'firebase';
import { connect } from 'react-redux';
firebaseIni();

const auth = firebase.auth;
const provider = new firebase.auth.FacebookAuthProvider();

const HandleDisplayBooth = props => {
  return (
    <Row>
      {props.list.map((booth, key) => {
        return (
          <Col width="25" key={key}>
            <div className="booth inactive" key={key}>
              <img src={booth.logo} alt={booth.booth} />
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

const HandleDisplayProfile = props => {
  let { profile } = props;
  return (
    <div className="profile">
      <img src={profile.image} alt={profile.name} />
      <div className="account-name">{profile.name}</div>
    </div>
  );
};

const HandleDisplayAccount = props => {
  let { booths, profile } = props.data;

  return (
    <div>
      <HandleDisplayProfile profile={profile} />
      <div className="divider"></div>
      <HandleDisplayBooth list={booths} />
      <div className="divider"></div>
      <Button>Logout</Button>
    </div>
  );
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    booths: [],
    profile: {
      name: 'Juan Dela Cruz',
      image: require('../../../img/HomePage/profilePicture.png')
    },
    user: null
  };

  login = async () => {
    const user = await auth().signInWithPopup(provider);
    this.setState({ user });
    let userData = { accountID: user.user.uid, firstname: user.additionalUserInfo.profile.first_name, middlename: '', lastname: user.additionalUserInfo.profile.last_name, email: user.additionalUserInfo.profile.email, status: false, profilePicture: user.additionalUserInfo.profile.picture.data.url };
    await setData(`user/${user.user.uid}`, userData);
    setStorage({ uid: user.user.uid });
    if (this.state.user) {
      this.$f7router.navigate('/home');
    }
  };
  
  autoLoggedIn = () => {
    const uid = getStorage('uid');
    if (uid) this.$f7router.navigate('/home');
  };

  logout = async () => {
    await auth().signOut();
  };

  componentWillMount = () => {};

  componentDidMount = () => {};

  render() {
    return (
      <Page id="mainpage" onPageBeforeIn={this.autoLoggedIn.bind(this)}>
        <Row>
          <div className="notice">Oh! Looks like you haven't logged in yet! Log in or Sign up now.</div>
          <div className="social-buttons">
            <Button color="blue" raised fill onClick={this.login}>
              Sign up with facebook
            </Button>
            <Button color="blue" raised fill href="/register">
              Sign up with email
            </Button>
            <Button color="blue" raised fill href="/login">
              Login
            </Button>
          </div>
        </Row>
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
  setData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
