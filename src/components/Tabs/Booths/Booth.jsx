import React from 'react';
import { Navbar, NavLeft, NavTitle, Block, AccordionItem, AccordionContent, AccordionToggle } from 'framework7-react';

import style from './style.css';

import HarleyLogo from '../../../img/Booths/HarleyLogo.png';
import InquirerLogo from '../../../img/Booths/InquirerLogo.png';
import JackAndJillLogo from '../../../img/Booths/JackAndJillLogo.png';
import PepsiLogo from '../../../img/Booths/PepsiLogo.png';
import UratexLogo from '../../../img/Booths/UratexLogo.png';
import FritolayLogo from '../../../img/Booths/FritolayLogo.png';
import Dotdotdot from 'react-dotdotdot';
import { getData } from '../../../reducers/reducer';

const HandleDisplayBooth = props => {
  return (
    <AccordionItem>
      <AccordionToggle>
        <div className="booth-information">
          <div className="left">
            <img src={props.data.logo} alt={props.data.booth} />
          </div>
          <div className="right">
            <div className="booth-name">{props.data.company}</div>
            <Dotdotdot clamp={2}>
              <div className="booth-description">{props.data.description}</div>
            </Dotdotdot>
          </div>
        </div>
      </AccordionToggle>
      <AccordionContent>
        <div className="booth-information">
          <div className="right">{props.data.website !== '' ? `Website: ${props.data.website}` : ''}</div>
          <div className="right">{props.data.phone !== '' ? `Contact: ${props.data.phone}` : ''}</div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default class HomePage extends React.Component {
  state = {
    booths: []
  };

  OnhandleGetBooths = async () => {
    const booths = await getData(`booths/`);
    this.setState({ booths });
  };

  componentWillMount = () => {
    this.OnhandleGetBooths();
  };

  componentDidMount = () => {};

  render() {
    return (
      <div className="booths">
        <Navbar>
          <NavLeft>
            <i className="f7-icons">chevron_left</i>
          </NavLeft>
          <NavTitle>Activities/Booths</NavTitle>
        </Navbar>

        <Block inner accordionList>
          {Object.keys(this.state.booths).map((booth, index) => {
            return <HandleDisplayBooth key={index} data={this.state.booths[booth]} />;
          })}
        </Block>
      </div>
    );
  }
}
