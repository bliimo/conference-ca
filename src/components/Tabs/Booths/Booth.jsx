import React from 'react';
import {
  Navbar,
  NavLeft,
  NavTitle,
  Block,
  AccordionItem,
  AccordionContent,
  AccordionToggle,
  Link,
  Checkbox,
  Button
} from 'framework7-react';

import style from './style.css';
import { connect } from 'react-redux';
import Dotdotdot from 'react-dotdotdot';
<<<<<<< HEAD
import { getData, api,setStorage,getStorage } from '../../../reducers/reducer';
=======
import { getData, api } from '../../../reducers/reducer';
import poweredBy from '../../../img/icons/bliimo-white-msap.png'
>>>>>>> origin

const DisplayBooth = props => {
  return (
    <div className="booth-wrapper">
      <img className="booth-img" src={props.data.logo} alt={props.data.booth} />
      <p className="company-name">{props.data.company}</p>
      <div className="company-desc" style={{color:'#fff',marginBottom:'1em'}}>{props.data.description}</div>
       {props.data.website && ( <div style={{textAlign:'left'}}>
          <span>Website: </span>
          <Link href={props.data.website} external target="_blank">
            {props.data.website}
          </Link>
        </div>
       )}
        <div style={{textAlign:'left'}}>
          <span>Contact: </span>
          <Link href={`tel:${props.data.phone}`} external target="_blank">
            {props.data.phone}
          </Link>
        </div>
      {/* <div className="booth-information collapse-info" style={{textAlign:'left',marginTop:'1em' }}>
        <div>
          <span>Website: </span>
          <Link href={props.data.website} external target="_blank">
            {props.data.website}
          </Link>
        </div>
        <div>
          <span>Contact: </span>
          <Link href={`tel:${props.data.phone}`} external target="_blank">
            {props.data.phone}
          </Link>
        </div>
      </div> */}
    </div>
  );
};
const HandleDisplayBooth = props => {
  const htmlRender = () => {
    return { __html: props.data.description };
  };
  return (
    <AccordionItem>
      <AccordionToggle>
        <div
          className="booth-information"
          onClick={() => {
            props.click('booth', props.data);
          }}
        >
          <div className="left">
            <img src={props.data.logo} alt={props.data.booth} />
          </div>
          <div className="right">
            <div className="booth-name" style={{ fontSize: '1.2em', marginTop: '.5em' }}>
              {props.data.company}
            </div>
            <Dotdotdot clamp={1}>
              <div className="booth-description" dangerouslySetInnerHTML={htmlRender()} />
            </Dotdotdot>
          </div>
        </div>
      </AccordionToggle>
      {/* <AccordionContent>
        <div className="booth-information collapse-info">
          <div className="right">
            <span>Website: </span>
            <Link href={props.data.website} external target="_blank">
              {props.data.website}
            </Link>
          </div>
          <div className="right">
            <span>Contact: </span>
            <Link href={`tel:${props.data.phone}`} external target="_blank">
              {props.data.phone}
            </Link>
          </div>
        </div>
      </AccordionContent> */}
    </AccordionItem>
  );
};

// let isNotShow = getStorage('isShow');

// const OnHandleSetNotif = (e)=>{
//   isNotShow = e.target.checked
// }

// const OnHandleSaveNotif = () =>{
//   setStorage({isNotShow})
// }

const Notification = (props) =>{
  return (
    <div className='pop-info'>
      <h1>
        GET A CHANCE TO WIN PRIZES!
      </h1>
      <p>
        Visit the booths.  Take the booth's challenge.  Present your app profile for validation. The more visits and challenges you take, the more chances of winning!
      </p>
      <div className='pop-action'>
        {/* <Checkbox name="isShow" onChange={(e)=>OnHandleSetNotif(e)}></Checkbox>
        <label>Don't show again</label> */}
        <Button fill onClick={()=>{
          props.props.closeNotication(false)
        }}>Ok</Button>
      </div>
    </div>
  )
}

class HomePage extends React.Component {
  state = {
    booths: [],
    boothOpen: {},
    display: 'main'
  };

  getDataFromApi = async () => {
    const data = await this.props.getBooths('booths.json');
    this.setState({ booths: data.payload.data });
  };

  componentWillMount = () => {
    this.getDataFromApi();
  };

  componentDidMount = () => {
  };
  componentWillReceiveProps = () =>{
    // this.props.closeNotication(true)
  }

  handleClick = (display, boothOpen) => {
    this.setState({ display, boothOpen });
  };

  render() { 
    return (
      <div className="booths">
        {this.props.showNotification && <div className='notif-wrapper'> <Notification props={this.props}/> </div>}
        <Navbar className="nav-booths">
          <Link
            iconMd="material:keyboard_arrow_left"
            color="white"
            className="back-button"
            tabLink={`${this.state.display === 'main' ? '#dashboard' : '#'}`}
            onClick={() => {
              this.state.display === 'booth'
                ? this.setState({ display: 'main' })
                : console.log('main');
            }}
          ></Link>
          <NavTitle className="top-title">
          Activities/Booths
          </NavTitle>
        </Navbar>

        <Block inner accordionList>
          {this.state.display === 'main' &&
            Object.keys(this.state.booths).map((booth, index) => {
              return (
                <HandleDisplayBooth
                  click={this.handleClick}
                  key={index}
                  data={this.state.booths[booth]}
                />
              );
            })}
          {this.state.display === 'booth' && <DisplayBooth data={this.state.boothOpen} />}
        </Block>
      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boothState: state.boothState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBooths: url => {
      return dispatch(api(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
