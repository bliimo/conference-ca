import React from 'react';
import { Link, List, ListInput, Icon } from 'framework7-react';

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
    </p>`
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  render(){
    return(
      <div className='container activity'>
        <Link iconMd='material:keyboard_arrow_left' color="white" className='back-button' onClick={ () => { this.props.event(true) } }></Link>
        <img src={thumbnail} alt='event bg' className='bg-image' />
        <div className='profile'>
          <img src={MPossibleLogo} alt='logo' className='logo' />
          <img src={profilePicture} alt='participant img' className='picture' />
          <p className='name'>Jane Dela Cruz</p>
        </div>
        <div className='description' dangerouslySetInnerHTML={{__html: this.state.description}} ></div>
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
