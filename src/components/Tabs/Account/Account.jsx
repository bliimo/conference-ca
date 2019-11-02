import React from 'react';
import { App, Button, Row, Col, Block, BlockTitle, Link, NavTitle, Navbar } from 'framework7-react';

import style from './style.css';
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
import poweredBy from '../../../img/icons/bliimo-white-msap.png';
import msapIcon from '../../../img/icons/avatar.png';
import Dotdotdot from 'react-dotdotdot';
firebaseIni();

const auth = firebase.auth;
const provider = new firebase.auth.FacebookAuthProvider();

const HandleDisplayBooth = props => {
  return (
    <Row>
      {props.list.map((booth, key) => {
        return (
          <Col width="33" key={key}>
            <div className={`booth ${booth.isActive}`} key={key}>
              <div className="booth-img-wrapper-account">
                {booth.isActive === 'inactive' ? (
                  <Button sheetOpen=".sheet" onClick={() => props.HandleBoothChoose(booth)}>
                    <img
                      src={booth.logo}
                      alt={booth.booth}
                      style={{ width: booth.company === 'Twitter' ? '70%' : '80%' }}
                    />
                  </Button>
                ) : (
                  <img
                    src={booth.logo}
                    alt={booth.booth}
                    style={{ width: booth.company === 'Twitter' ? '70%' : '80%' }}
                  />
                )}
              </div>
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
      <img
        id="account-pic"
        src={profile.profilePicture ? profile.profilePicture : msapIcon}
        alt={profile.firstname ? `${profile.firstname} ${profile.lastname}` : ''}
      />
      <div className="account-name">
        {profile.firstname ? `${profile.firstname} ${profile.lastname}` : ''}
      </div>
    </div>
  );
};

const HandleDisplayAccount = props => {
  let { booths, profile } = props.data;

  return (
    <div>
      <HandleDisplayProfile profile={profile} />
      <span className="range-booths">{props.range}</span>
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
      boothKey: ''
    },
    profile: null,
    user: null,
    HandleBoothChoose: null,
    isOpen: false,
    code: '',
    visitedBooths: [],
    modalText: ''
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
    this.handleGetUser();
  };

  HandleBoothChoose = boothChoose => {
    this.setState({ isOpen: true, code: '' });
    this.setState({ boothChoose });
  };

  logout = async () => {
    await auth().signOut();
    this.setState({ user: null, profile: null });
    localStorage.clear();
  };

  HandleGetVisitedBooths = async () => {
    const uid = getStorage('uid');
    const visitedJSON = await this.props.getVisitedBooths(`/visitedBooths`);
    const boothJSON = await this.props.getBooths('/booths');
    let visitedBooths = [];
    if (visitedJSON.payload.data) {
      visitedBooths = visitedJSON.payload.data[uid];
    }
    const booths = [];
    Object.keys(boothJSON.payload.data).map(bj => {
      if (visitedBooths) {
        visitedBooths.map(vb => {
          if (vb['booth'] === bj) {
            booths.push({ ...boothJSON.payload.data[bj], isActive: 'active' });
            delete boothJSON.payload.data[bj];
          }
        });
      }
    });

    Object.keys(boothJSON.payload.data).map(bj => {
      booths.push({ ...boothJSON.payload.data[bj], isActive: 'inactive', boothKey: bj });
    });
    this.setState({ booths, visitedBooths: visitedBooths ? visitedBooths : [] });
  };

  setModal = isOpen => {
    this.setState({ isOpen });
  };

  handleSubmitCode = async () => {
    const uid = getStorage('uid');
    if (this.state.code === this.state.boothChoose.code) {
      const visitedBooths = this.state.visitedBooths;
      visitedBooths.push({
        booth: this.state.boothChoose.boothKey,
        dateAvailable: firebase.database.ServerValue.TIMESTAMP
      });
      await setData(`visitedBooths/${uid}`, visitedBooths);
      this.HandleGetVisitedBooths();
      this.setState({
        HandleBoothChoose: this.HandleBoothChoose,
        modalText: 'Successfully entered codes'
      });
      this.setModal(false);
    } else {
      this.setState({
        HandleBoothChoose: this.HandleBoothChoose,
        modalText: "Code doesn't match!"
      });
    }
  };

  handleGetUser = async () => {
    const uid = getStorage('uid');
    const profile = await getData(`user/${uid}`);
    this.setState({ profile });
  };

  componentWillMount = () => {
    this.HandleGetVisitedBooths();
    this.setState({ HandleBoothChoose: this.HandleBoothChoose });
    this.handleGetUser();
  };

  componentDidMount = () => {};

  HandleDisplayModal = () => {
    this.setState({ modalText: '' });
  };

  render() {
    return (
      <div>
        {this.state.modalText === '' && (
          <Block className="block-content">
            <img src={poweredBy} alt="" className="poweredBy" style={{ top: '.1em !important' }} />
            <div id="top-nav" className="top-nav" style-={{ marginTop: '1em' }}>
              <Link
                iconF7="chevron_left"
                color="white"
                className="back-button"
                tabLink="#dashboard"
                href="#dashboard"
                style={{ padding: 0 }}
              ></Link>
              <span
                id="top-title"
                className="top-title"
                style={{
                  display: 'inline-block',
                  width: '100% !important',
                  textAlign: 'center',
                  fontSize: '1.5em !important'
                }}
              >
                {this.state.profile ? 'Your Profile' : 'Login/Register'}
              </span>
            </div>
            <div className="account">
              {this.state.profile && (
                <HandleDisplayAccount
                  data={this.state}
                  logout={this.logout}
                  range={`(${this.state.visitedBooths.length}/${this.state.booths.length})`}
                />
              )}
              <div className={`modal-sheet ${this.state.isOpen ? 'show' : 'hide'}`}>
                <Block className="block-account" style={{ width: '100%' }}>
                  <BlockTitle style={{ textTransform: 'capitalize' }}>
                    <span
                      style={{ fontSize: '18px', color: '#222', width: '100%', marginTop: '1em' }}
                    >
                      {this.state.boothChoose.company}
                    </span>
                    <input
                      style={{ color: '#222' }}
                      type="text"
                      placeholder="Code"
                      value={this.state.code}
                      onChange={e => {
                        this.setState({ code: e.target.value });
                      }}
                    />
                    <div className="sheet-div">
                      <Button
                        className="sheet-btn"
                        style={{ background: 'rgb(33, 84, 144)', marginRight: '.5em' }}
                        onClick={() => {
                          this.handleSubmitCode();
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        className="sheet-btn"
                        style={{ background: 'red' }}
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
              {this.state.profile === null && (
                <Row>
                  <div className="notice">
                    Oh! Looks like you haven't logged in yet! Log in or Sign up now.
                  </div>
                  <div className="social-buttons">
                    {/* <Button color="blue" raised fill onClick={this.login}>
                Sign up with facebook
              </Button> */}
                    <Button color="blue" raised fill href="/register">
                      Sign up with email
                    </Button>
                    <Button color="blue" raised fill href="/login">
                      Login
                    </Button>
                  </div>
                </Row>
              )}
            </div>
          </Block>
        )}
        {this.state.modalText !== '' && (
          <div className="modal-alert-wrapper">
            <div className="modal-alert">
              <span>{this.state.modalText}</span>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.HandleDisplayModal();
                }}
              >
                Ok
              </a>
            </div>
          </div>
        )}
      </div>
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
    getData: query => {
      return dispatch(getData(query));
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
