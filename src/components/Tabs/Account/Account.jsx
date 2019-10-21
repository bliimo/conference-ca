import React from 'react';
import { App, Button, Row, Col, Block, BlockTitle } from 'framework7-react';

import style from './style.css';

import HarleyLogo from '../../../img/Booths/HarleyLogo.png';
import InquirerLogo from '../../../img/Booths/InquirerLogo.png';
import JackAndJillLogo from '../../../img/Booths/JackAndJillLogo.png';
import PepsiLogo from '../../../img/Booths/PepsiLogo.png';
import UratexLogo from '../../../img/Booths/UratexLogo.png';
import FritolayLogo from '../../../img/Booths/FritolayLogo.png';
import {
  firebaseIni,
  setStorage,
  setData,
  getVisitedBooths,
  getStorage,
  getBooths,
  getData
} from '../../../reducers/reducer';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { async } from 'q';
import image from '../../../img/HomePage/profilePicture.png';
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
              {booth.isActive === 'inactive' ? (
                <Button sheetOpen=".sheet" onClick={() => props.HandleBoothChoose(booth)}>
                  <img src={booth.logo} alt={booth.booth} />
                </Button>
              ) : (
                <img src={booth.logo} alt={booth.booth} />
              )}
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
      <HandleDisplayBooth HandleBoothChoose={props.data.HandleBoothChoose} list={booths} />
      <div className="divider"></div>
      <Button onClick={props.logout}>Logout</Button>
    </div>
  );
};

class HomePage extends React.Component {
  state = {
    booths: [],
    boothChoose: {
      code: '',
      company: '',
      description: '',
      isActive: '',
      logo: '',
      phone: '',
      website: '',
      boothKey:''
    },
    profile: null,
    user: null,
    HandleBoothChoose: null,
    isOpen: false,
    code: '',
    visitedBooths: []
  };

  login = async () => {
    const user = await auth().signInWithPopup(provider);
    this.setState({ user });
    let userData = {
      accountID: user.user.uid,
      firstname: user.additionalUserInfo.profile.first_name,
      middlename: '',
      lastname: user.additionalUserInfo.profile.last_name,
      email: user.additionalUserInfo.profile.email,
      status: false,
      profilePicture: user.additionalUserInfo.profile.picture.data.url
    };
    await setData(`user/${user.user.uid}`, userData);
    setStorage({ uid: user.user.uid });
  };

  HandleBoothChoose = boothChoose => {
    this.setState({ isOpen: true, code: '' });
    this.setState({ boothChoose });
  };

  logout = async () => {
    await auth().signOut();
    this.setState({user:null,profile:null})
    localStorage.clear();
  };

  HandleGetVisitedBooths = async () => {
    const uid = getStorage('uid');
    const visitedJSON = await this.props.getVisitedBooths(`/visitedBooths`);
    const boothJSON = await this.props.getBooths('/booths');
    let visitedBooths = []
    if(visitedJSON.payload.data){
      visitedBooths = visitedJSON.payload.data[uid]
    }
    const booths = [];  


    Object.keys(boothJSON.payload.data).map(bj => {
      if(visitedBooths){
        visitedBooths.map(vb => {
          if (vb === bj) {
            booths.push({ ...boothJSON.payload.data[bj], isActive: 'active' });
            delete boothJSON.payload.data[bj];
          }
        });
      }
    });

    Object.keys(boothJSON.payload.data).map(bj => {
      booths.push({ ...boothJSON.payload.data[bj], isActive: 'inactive', boothKey:bj });
    });
    this.setState({ booths, visitedBooths : visitedBooths ? visitedBooths : [] });
  };

  setModal = isOpen => {
    this.setState({ isOpen });
  };

  handleSubmitCode = async () => {
    const uid = getStorage('uid');
    if (this.state.code === this.state.boothChoose.code) {
      const visitedBooths = this.state.visitedBooths;
      visitedBooths.push(this.state.boothChoose.boothKey);
      await setData(`visitedBooths/${uid}`, visitedBooths);
      alert('Nice one!');
      this.HandleGetVisitedBooths();
      this.setState({ HandleBoothChoose: this.HandleBoothChoose });
      this.setModal(false)
    } else {
      alert("Code doesn't match!");
    }
  };
 
  handleGetUser = async() =>{
    const uid = getStorage("uid");
    const profile = await getData(`user/${uid}`);
    this.setState({profile});
  }

  componentWillMount = () => {
    this.HandleGetVisitedBooths();
    this.setState({ HandleBoothChoose: this.HandleBoothChoose });
    this.handleGetUser();
  };

  componentDidMount = () => {};

  render() {
    return (
      <Block>
        <div className="account">
          {this.state.profile && (<HandleDisplayAccount data={this.state} logout={this.logout} />)}
          <div className={`modal-sheet ${this.state.isOpen ? 'show' : 'hide'}`}>
            <Block style={{ width: '100%' }}>
              <BlockTitle style={{ textTransform: 'capitalize' }}>
                <p style={{fontSize:"18px",color:"#222"}}>
                {this.state.boothChoose.company}
                </p>
                <input
                  style={{ color: '#222' }}
                  type="text"
                  placeholder="Code"
                  clearButton
                  value={this.state.code}
                  onInput={e => {
                    this.setState({ code: e.target.value });
                  }}
                />
                <div className="sheet-div">
                  <Button
                    className="sheet-btn"
                    onClick={() => {
                      this.handleSubmitCode();
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    className="sheet-btn"
                    color="red"
                    onClick={() => {
                      this.setModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </BlockTitle>
            </Block>
          </div>
          {this.state.profile === null &&(<Row>
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
          </Row>)}
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

const mapDispatchToProps = dispatch => {
  return {
    setData: (query, data) => {
      return dispatch(setData(query, data));
    },
    getData: (query)=>{
      return dispatch(getData(query))
    },
    getVisitedBooths: () => {
      return dispatch(getVisitedBooths());
    },
    getBooths: () => {
      return dispatch(getBooths());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
