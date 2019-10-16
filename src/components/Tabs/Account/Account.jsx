import React from 'react';
import { App, Button, Row, Col, Block, Link } from 'framework7-react';

import style from './style.css';

import HarleyLogo from '../../../img/Booths/HarleyLogo.png';
import InquirerLogo from '../../../img/Booths/InquirerLogo.png';
import JackAndJillLogo from '../../../img/Booths/JackAndJillLogo.png';
import PepsiLogo from '../../../img/Booths/PepsiLogo.png';
import UratexLogo from '../../../img/Booths/UratexLogo.png';
import FritolayLogo from '../../../img/Booths/FritolayLogo.png';
import { firebaseIni, setStorage, setData,getVisitedBooths, getStorage, getBooths } from '../../../reducers/reducer';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { async } from 'q';
firebaseIni();

const auth = firebase.auth;
const provider = new firebase.auth.FacebookAuthProvider();

const HandleDisplayBooth = props => {
  return (
    <Row>
      {props.list.map((booth, key) => {
        return (
          <Col width="25" key={key}>
            <div className={`booth ${booth.isActive}`} key={key}>
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
  };

  logout = async () => {
    await auth().signOut();
  };

  HandleGetVisitedBooths = async() =>{
    const uid = getStorage("uid");
    const visitedJSON = await this.props.getVisitedBooths(`/visitedBooths`);
    const boothJSON = await this.props.getBooths('/booths');
    const visitedBooths = visitedJSON.payload.data[uid];
    const booths = []
     
    Object.keys(boothJSON.payload.data).map(bj=>{
      visitedBooths.map(vb=>{
        if(vb == bj){
          booths.push({...boothJSON.payload.data[bj],isActive:'active'})
          delete boothJSON.payload.data[bj]
        }
      })
    })
    
    Object.keys(boothJSON.payload.data).map(bj=>{
      booths.push({...boothJSON.payload.data[bj],isActive:'inactive'})
    })
    this.setState({booths})
  }

  componentWillMount = () => {
    this.HandleGetVisitedBooths();
  };

  componentDidMount = () => {};

  render() {
    return (
      <Block>
        <div className="account">
          <HandleDisplayAccount data={this.state} />
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

const mapDispatchToProps =(dispatch)=>{
  return {
    setData:()=>{return dispatch(setData())},
    getVisitedBooths:()=>{ return dispatch(getVisitedBooths()) },
    getBooths:()=>{ return dispatch(getBooths()) },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
