import React from 'react';
import { App, Button, Row, Col, Block, Link } from 'framework7-react';

import style from './style.css';

import { firebaseIni, setStorage, setData, getStorage, getData } from '../../../reducers/reducer';
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
      <img src={profile.profilePicture} alt={profile.firstname ? `${profile.firstname} ${profile.lastname}` : ''} />
      <div className="account-name">{profile.firstname ? `${profile.firstname} ${profile.lastname}` : ''}</div>
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

  state = {
    booths: [],
    profile:{},
    user: null
  };

  login = async () => {
    const user = await auth().signInWithPopup(provider);
    this.setState({ user });
    let userData = { accountID: user.user.uid, firstname: user.additionalUserInfo.profile.first_name, middlename: '', lastname: user.additionalUserInfo.profile.last_name, email: user.additionalUserInfo.profile.email, status: false, profilePicture: user.additionalUserInfo.profile.picture.data.url };
    await setData(`user/${user.user.uid}`, userData);
    setStorage({ uid: user.user.uid });
  };

  logout = async () => {
    await auth().signOut();
  };

  handleGetUser = async() =>{
    const uid = getStorage("uid");
    const profile = await getData(`user/${uid}`);
    this.setState({profile});
  }

  componentWillMount = () => {
    this.handleGetUser();
  };

  componentDidMount = () => {};

  render() {
    return (
      <Block>
        <div className="account">
          {this.state.profile && <HandleDisplayAccount data={this.state} />}
          {/* <Row>
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
          </Row> */}
        </div>
      </Block>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: state.authState
  };
};

const mapDispatchToProps = {
  setData,
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
