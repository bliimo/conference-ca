import React from 'react';
import { App, Button, Row, Col, Block, Link } from 'framework7-react';

import style from './style.css';

import HarleyLogo from '../../../img/Booths/HarleyLogo.png';
import InquirerLogo from '../../../img/Booths/InquirerLogo.png';
import JackAndJillLogo from '../../../img/Booths/JackAndJillLogo.png';
import PepsiLogo from '../../../img/Booths/PepsiLogo.png';
import UratexLogo from '../../../img/Booths/UratexLogo.png';
import FritolayLogo from '../../../img/Booths/FritolayLogo.png';
import { firebaseIni, setStorage, setData } from '../../../reducers/reducer';
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

  console.log(booths, profile);
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
    booths: [
      {
        booth: 'V8 Engine Tuning Tutorials',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: HarleyLogo,
        website: 'https://www.harley-davidson.com/',
        contact: ''
      },
      {
        booth: 'Free Newspaper and Goodies',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: InquirerLogo,
        website: 'https://www.inquirer.net/',
        contact: '09661476295'
      },
      {
        booth: 'New Snack Sample Tasting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: JackAndJillLogo,
        website: 'http://www2.urc.com.ph/products/philippines/ph-jack-n-jill',
        contact: ''
      },
      {
        booth: 'Discount Vouchers',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: UratexLogo,
        website: 'https://www.uratex.com.ph/',
        contact: '09661476295'
      },
      {
        booth: 'Free Snack via Sign up',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: FritolayLogo,
        website: 'https://www.fritolay.com/',
        contact: '09661476295'
      },
      {
        booth: 'Soda Pong Challenge',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: PepsiLogo,
        website: 'https://www.pepsi.com/en-us/',
        contact: ''
      }
    ],
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
    setStorage({ email: user.additionalUserInfo.profile.email });
  };

  logout = async () => {
    await auth().signOut();
  };

  componentWillMount = () => {};

  componentDidMount = () => {};

  render() {
    return (
      <Block>
        <div className="account">
          {/* <HandleDisplayAccount data={this.state} /> */}
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
  setData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
