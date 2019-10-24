import React from 'react';
import {
  Navbar,
  NavLeft,
  NavTitle,
  Block,
  AccordionItem,
  AccordionContent,
  AccordionToggle,
  Link
} from 'framework7-react';

import style from './style.css';
import { connect } from 'react-redux';
import Dotdotdot from 'react-dotdotdot';
import { getData, api } from '../../../reducers/reducer';

const DisplayBooth = props => {
  return (
    <div className="booth-wrapper">
      <img className="booth-img" src={props.data.logo} alt={props.data.booth} />
      <p className="company-name">{props.data.company}</p>
      <div className="company-desc">{props.data.description}</div>
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

  componentDidMount = () => {};

  handleClick = (display, boothOpen) => {
    this.setState({ display, boothOpen });
  };

  render() {
    return (
      <div className="booths">
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
