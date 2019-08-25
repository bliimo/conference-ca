import React from 'react';
import { Swiper, SwiperSlide, Link, List, ListInput, Icon } from 'framework7-react';

import style from './style.css';

import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';
import profilePicture from '../../../img/HomePage/profilePicture.png';

import DigitalRevolution from '../../../img/HomePage/DigitalRevolution.png';
import InvestoMania from '../../../img/HomePage/InvestoMania.png';
import MPossible from '../../../img/HomePage/MPossible.png';
import MillenialTalks from '../../../img/HomePage/MillenialTalks.png';
import SaveMoney from '../../../img/HomePage/SaveMoney.png';

export default class Activity extends React.Component {

  state = {
    display: 'dashboard'
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  render(){
    return(
      <div className='container'>
        <img src={thumbnail} alt=' bg image' />
        <div className=''>
          <img src={MPossibleLogo} alt='logo' />
          <img src={profilePicture} alt='profile picture' />
          <p className='makeMeRed'>Jane Dela Cruz</p>
        </div>
        <div className='description'>
        </div>
        <div className='get-data-from-user'>

        <List>
          <ListInput
            type="textarea"
            placeholder="Comment"
            clearButton
            resizable
          />
          <ListInput
            type="textarea"
            placeholder="Suuggestion"
            clearButton
            resizable
          />
          <ListInput
            type="textarea"
            placeholder="Question"
            clearButton
            resizable
          />
          <div className=''>
          <Icon material='star' />
          <Icon material='star' />
          <Icon material='star_half' />
          <Icon material='star_border' />
          <Icon material='star_border' />
          </div>
        </List>

        </div>
      </div>
    )
  }
}
