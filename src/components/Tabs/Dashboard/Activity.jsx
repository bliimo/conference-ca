import React from 'react';
import { Link, Toolbar, Tabs, Tab, Block, Button } from 'framework7-react';

import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';
import { getData, getStorage, pushData, setData } from '../../../reducers/reducer';
import { connect } from 'react-redux';
import style from './style.css';

class Activity extends React.Component {
  state = {
    user: {
      firstname: '',
      lastname: '',
      profilePicture: ''
    },
    questionAndAswer: {
      question: null,
      answer: null
    },
    rate: 0,
    isRated: false,
    question: '',
    display: 'dashboard',
    featured: null,
    stars: [],
    modalText: '',
    rated: 0
  };

  HandleGetFeaturedData = () => {
    this.setState({ featured: this.props.featured });
    this.HandleGetQuestion(this.props.featured);
  };

  HandleGetQuestion = async featured => {
    const { eventId } = featured[1];
    const uid = getStorage('uid');
    const questionAndAswer = await getData(`/questions/${eventId}/${uid}`);
    if (questionAndAswer) this.setState({ questionAndAswer });
  };

  HandleSendQuestion = async () => {
    const { question } = this.state;
    const { eventId } = this.state.featured[1];
    const uid = getStorage('uid');
    if (question) {
      const data = await setData(`/questions/${eventId}/${uid}/question`, question);
      this.setState({
        modalText: data.response ? 'Successfully send questions' : 'Unable to send questions'
      });
      this.HandleGetFeaturedData();
    } else {
      this.setState({ modalText: 'Required questions' });
    }
  };

  handleRate = async rate => {
    const { eventId } = this.state.featured[1];
    const uid = getStorage('uid');
    const data = await setData(`/rates/${eventId}/${uid}`, rate);
    if (data.response === 'success') {
      this.setState({ rate, isRated: true });
    } else {
      this.setState({ rate: 0 });
    }
      this.handleStar(rate);
  };

  handleGetRate = async () => {
    const { eventId } = this.props.featured[1];
    const uid = getStorage('uid');
    const rate = await getData(`/rates/${eventId}/${uid}`);
    if (rate) {
      this.setState({ rate, isRated: true });
    } else {
      this.setState({ rate: 0, isRated: false });
    }
    this.handleStar();
  };

  componentWillMount = () => {
    this.HandleGetFeaturedData();
    this.handleGetRate();
  };

  componentWillReceiveProps() {
    this.HandleGetFeaturedData();
    this.handleGetRate();
  }

  componentDidMount = () => {};

  setStars = rate => {
    this.setState({
      rated: rate,
      modalText: 'Are you sure you want to rate this with ' + rate + ' stars?'
    });
  };

  handleStar = (ratings = 0) => {
    let stars = [];
    let { rate, isRated } = this.state;
    rate = rate ? rate : ratings;
      for (let i = 1; i <= rate; i++) {
        stars.push(
          !isRated ? (
            <span
              style={{ color: 'yellow' }}
              key={Math.floor(Math.random() * 100)}
              onClick={() => {
                this.setStars(i);
              }}
            >
              &#9733;
            </span>
          ) : (
            <span style={{ color: 'yellow' }}>&#9733;</span>
          )
        );
      }
      for (let i = 1; i <= 5 - rate; i++) {
        stars.push(
          !isRated ? (
            <span
              style={{ color: 'gray' }}
              key={Math.floor(Math.random() * 100)}
              onClick={() => {
                this.setStars(i);
              }}
            >
              &#9733;
            </span>
          ) : (
            <span style={{ color: 'gray' }}>&#9733;</span>
          )
        );
      }
      
    if(stars.length > 5) stars.shift();
    stars.push(` (${rate ? rate : 0})`);
    stars.push(
      isRated ? (
        <p key={0}>
          Thank you so much for taking the time to leave this excellent review. We really appreciate
          that. Please let us know what we can do for you in the future.
        </p>
      ) : (
        <p key={0}> Please rate me if you enjoy the talk.</p>
      )
    );
    const uid = getStorage('uid');
    if (uid) {
      this.setState({ stars });
    } else {
      const login = (
        <div>
          <span>You need to </span>
          <Link color="blue" raised fill tabLink="#account">
            login
          </Link>
          <span> to rate this segment.</span>
        </div>
      );
      this.setState({ stars: login });
    }
  };

  HandleDisplayModal = rated => {
    if (rated > 0) {
      this.setState({ modalText: '', rate: this.state.rated });
      this.handleRate(this.state.rated);
    } else {
      this.setState({ modalText: '' });
    }
  };

  render() {
    const { longDescription, name, speakerDP, thumbnail } = this.state.featured[1];
    const { question, answer } = this.state.questionAndAswer;
    const uid = getStorage('uid');

    return (
      <div>
       { this.state.modalText === '' && <div className="container activity">
          <Link
            iconF7="chevron_left"
            color="white"
            className="back-button"
            onClick={() => {
              this.props.event(true);
            }}
            style={{ marginTop: '2.1em' }}
          ></Link>

          {thumbnail && <img src={thumbnail} alt="event bg" className="bg-image" />}

          <div className="profile">
            <img src={MPossibleLogo} alt="logo" className="logo" />
            <img
              alt=""
              src={
                speakerDP !== ''
                  ? speakerDP
                  : 'https://api.adorable.io/avatars/285/abott@adorable.png'
              }
              className="picture circle-img"
              id="profilePicture-activity"
            />
            <p className="name">{name}</p>
          </div>

          <div className="description" dangerouslySetInnerHTML={{ __html: longDescription }}></div>

          <div className="get-data-from-user">
            <Toolbar id="tabs" tabbar bottom>
              <Link tabLink="#tab-1" href="#tab-1" tabLinkActive>
                Give feedback
              </Link>
              <Link tabLink="#tab-2" href="#tab-2">
                Rate the talk
              </Link>
            </Toolbar>
            <Tabs>
              <Tab id="tab-1" className="page-content" tabActive>
                {question === null && uid && (
                  <div>
                    <textarea
                      onChange={e => {
                        this.setState({ question: e.target.value, rated: 0 });
                      }}
                      placeholder="Your question"
                      style={{
                        width: '100%',
                        height: '30vh',
                        background: '#fff',
                        color: '#222',
                        padding: '1em'
                      }}
                    ></textarea>
                    <Button
                      fill
                      small
                      className="btn-Question"
                      onClick={() => this.HandleSendQuestion()}
                    >
                      Send question
                    </Button>
                  </div>
                )}
                {question !== null && uid && (
                  <div>
                    <p>
                      Q:{' '}
                      {question
                        ? question.slice(question.length - 1) === '?'
                          ? question
                          : `${question}?`
                        : ''}
                    </p>{' '}
                    {answer && <p>A: {answer}</p>}
                  </div>
                )}
                {uid === null && (
                  <div>
                    <span style={{ color: '#fff !important' }}>You need to </span>
                    <Link color="blue" raised fill tabLink="#account">
                      login
                    </Link>
                    <span style={{ color: '#fff !important' }}> to ask questions.</span>
                  </div>
                )}
              </Tab>
              <Tab id="tab-2" className="page-content">
                <div className={uid != null ? 'wrapper-star' : ''}>{this.state.stars}</div>
              </Tab>
            </Tabs>
          </div>
        </div>}
        {this.state.modalText !== '' && (
          <div className="modal-alert-wrapper" id="modal-alert-wrapper-activities">
            <div className="modal-alert" id="modal-alert-activities">
              <span>{this.state.modalText}</span>
              {this.state.rated > 0 && (
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    this.setState({ rated: 0 });
                    this.HandleDisplayModal();
                  }}
                  style={{ background: 'red', float: 'left' }}
                >
                  Cancel
                </a>
              )}
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.HandleDisplayModal(this.state.rated);
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

const mapDispatchToProps = {
  getData,
  pushData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
