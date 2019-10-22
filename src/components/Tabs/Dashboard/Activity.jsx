import React from 'react';
import { Link, List, ListInput, Icon, Toolbar, Tabs, Tab, Block, Button } from 'framework7-react';

import style from './style.css';

import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';

import DigitalRevolution from '../../../img/HomePage/DigitalRevolution.png';
import InvestoMania from '../../../img/HomePage/InvestoMania.png';
import MPossible from '../../../img/HomePage/MPossible.png';
import MillenialTalks from '../../../img/HomePage/MillenialTalks.png';
import SaveMoney from '../../../img/HomePage/SaveMoney.png';
import { getData, getStorage, pushData, setData } from '../../../reducers/reducer';
import { connect } from 'react-redux';
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
    rate: 1,
    isRated:false,
    question: null,
    display: 'dashboard',
    description: `<h1 style='font-family: var(--font-light)'>The <span style='font-family: var(--font-bold)'>Heck</span></h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h1 style='font-family: var(--font-light)'>The <span style='font-family: var(--font-bold)'>Place</span></h1><p>
    <div class="swiper-container swiper-init demo-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src='${DigitalRevolution}' alt=''></div>
        <div class="swiper-slide"><img src='${InvestoMania}' alt=''></div>
        <div class="swiper-slide"><img src='${MPossible}' alt=''></div>
        <div class="swiper-slide"><img src='${MillenialTalks}' alt=''></div>
        <div class="swiper-slide"><img src='${SaveMoney}' alt=''></div>
      </div>
    </div>
    </p>`,
    featured: null
  };

  HandleGetFeaturedData = () => {
    this.setState({ featured: this.props.featured[0] });
    this.HandleGetQuestion(this.props.featured[0]);
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
      alert(data.response);
      this.HandleGetFeaturedData();
    } else {
      alert('Required questions');
    }
  };

  
  handleRate = async()=>{
    const { eventId } = this.state.featured[1];
    const uid = getStorage('uid');
    const { rate } = this.state;
    const data = await setData(`/rates/${eventId}/${uid}`, rate);
    if(data.response === "success"){
      this.setState({rate, isRated:true})
    } 
  }

  handleGetRate = async ()=>{
    const { eventId } = this.props.featured[0][1];
    const uid = getStorage('uid');
    const rate = await getData(`/rates/${eventId}/${uid}`);
    if(rate){
      this.setState({rate,isRated:true})
    }else{
      this.setState({rate,isRated:false})
    }
  }

  componentWillMount = () => {
    this.HandleGetFeaturedData();
    this.handleGetRate();

  };

  componentWillReceiveProps() {
    this.HandleGetFeaturedData();
  }

  componentDidMount = () => {};

  handleStar = ()=>{
    let stars = []
    const {rate} = this.state;
    for(let i = 0; i < rate; i++){
      stars.push(<span style={{color:"yellow"}}>&#9733;</span>);
    }
    for(let i = 0; i < 5 - rate; i++){
      stars.push(<span style={{color:"gray"}}>&#9733;</span>);
    }
    return stars;
  }

  render() {
    const {
      longDescription,
      name,
      speakerDP,
      thumbnail,
    } = this.state.featured[1];
    const { question, answer } = this.state.questionAndAswer;
    const {isRated} = this.state;

    return (
      <div className="container activity">
        <Link
          iconMd="material:keyboard_arrow_left"
          color="white"
          className="back-button"
          onClick={() => {
            this.props.event(true);
          }}
        ></Link>
        <img src={thumbnail} alt="event bg" className="bg-image" />
        <div className="profile">
          <img src={MPossibleLogo} alt="logo" className="logo" />
          <img
            alt=""
            src={speakerDP ? speakerDP : 'https://i.pravatar.cc/300'}
            className="picture circle-img"
            id="profilePicture-activity"
          />
          <p className="name">{name}</p>
        </div>
        <div className="description" dangerouslySetInnerHTML={{ __html: longDescription }}></div>
        <div className="get-data-from-user">
          <Toolbar id="tabs" tabbar bottom>
            <Link tabLink="#tab-1" tabLinkActive>Questions</Link>
            <Link tabLink="#tab-2">Ratings</Link>
          </Toolbar>
          <Tabs>
            <Tab id="tab-1" className="page-content" tabActive>
              {question === null && (
                <Block>
                  <textarea
                    onChange={e => {
                      this.setState({ question: e.target.value });
                    }}
                    placeholder="Your question"
                    style={{
                      width: '100%',
                      height: '30vh',
                      background: '#fff',
                      color: '#222',
                      padding: '1em'
                    }}
                  >{this.state.question}</textarea>
                  <Button
                    fill
                    small
                    style={{ float: 'right', width: '100px', marginTop: '1em' }}
                    onClick={() => this.HandleSendQuestion()}
                  >
                    Submit
                  </Button>
                </Block>
              )}
              {question !== null && (
                <Block>
                  <p>
                    Q:{' '}
                    {question
                      ? question.slice(question.length - 1) === '?'
                        ? question
                        : `${question}?`
                      : ''}
                  </p>{' '}
                  {answer && <p>A: {answer}</p>}
                </Block>
              )}
            </Tab>
            <Tab id="tab-2" className="page-content">
            {!isRated && <Block style={{textAlign:"center"}}> 
                <label style={{display:"inline-block"}}>Rate this event</label>
                <ListInput style={{width:"auto",textAlign:"center",display:"inline-block", marginLeft:"1em"}}
                  type="select"
                  placeholder="Please choose..."
                  onInput={e => {
                    this.setState({ rate: e.target.value });
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </ListInput>
                <Button fill style={{position:"relative",top:"5em"}} onClick={()=>{this.handleRate()}}>Submit</Button>
              </Block>}
              {isRated && <Block>
                <p>You already rated this event with {this.handleStar()}</p>
              </Block>}
            </Tab>
          </Tabs>
        </div>
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
