import React from 'react';
import { Swiper, SwiperSlide, Link, List, ListInput, Icon, ListItem, AccordionContent, Block } from 'framework7-react';

import style from './style.css';

import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';
import profilePicture from '../../../img/HomePage/profilePicture.png';

import DigitalRevolution from '../../../img/HomePage/DigitalRevolution.png';
import InvestoMania from '../../../img/HomePage/InvestoMania.png';
import MPossible from '../../../img/HomePage/MPossible.png';
import MillenialTalks from '../../../img/HomePage/MillenialTalks.png';
import SaveMoney from '../../../img/HomePage/SaveMoney.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
        <img src={thumbnail} alt=' bg image' className='bgImage'/>
        <div className='imagePos'>
          <img src={ MPossibleLogo } alt='logo' className='mpossibleLogo'/>
          <img src={ profilePicture } alt='profile picture' className='profile'/>
          <p className='name'>Jane Dela Cruz</p>
        </div>
        <div className='title'>
          <span className='theTalk'>The <strong>Talk</strong></span>
        </div>
        <div className='description'>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </span><br/>
          <span className='secondSentence'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
        <div className='thePlace'>
          <span>The <strong>Place</strong></span>
        </div>
        <div>
            <Carousel showArrows={true}
             onChange={this.onChange} 
             onClickItem={this.onClickItem} 
             classname='carousel'>
                <div>
                    <img src={ DigitalRevolution }/>
                    <span className="legend">First Image</span>
                </div>
                <div>
                    <img src={ InvestoMania } />
                    <span className="legend">Second Image</span>
                </div>
                <div>
                    <img src={ MPossible } />
                    <span className="legend">Third Image</span>
                </div>
                <div>
                    <img src={ MillenialTalks } />
                    <span className="legend">Fourth Image</span>
                </div>
                <div>
                    <img src={ SaveMoney } />
                    <span className="legend">Fifth Image</span>
                </div>
            </Carousel>
        </div>

        <div className='get-data-from-user'>
          <List accordionList className='accordionContainer'>
            <ListItem accordionItem title="Comment" className='backgroundColor'>
              <AccordionContent>
                <Block>
                  <ListInput
                    className='textArea'
                    type="textarea"
                    placeholder="Comment"
                    clearButton
                    resizable
                  />
                </Block>
              </AccordionContent>
            </ListItem>

            <ListItem accordionItem title="Suggestion" className='backgroundColor'>
              <AccordionContent>
                <Block>
                  <ListInput
                    className='textArea'
                    type="textarea"
                    placeholder="Suggestion"
                    clearButton
                    resizable
                  />
                </Block>
              </AccordionContent>
            </ListItem>
            
            <ListItem accordionItem title="Question" className='backgroundColor'>
              <AccordionContent>
                <Block>
                  <ListInput
                    className='textArea'
                    type="textarea"
                    placeholder="Question"
                    clearButton
                    resizable
                  />
                </Block>
              </AccordionContent>
            </ListItem>
          </List>
 
          <div className='stars'>
            <Icon material='star' />
            <Icon material='star' />
            <Icon material='star_half' />
            <Icon material='star_border' />
            <Icon material='star_border' />
          </div>

          <div>
            <br/>
          </div>

        </div>
      </div>
    )
  }
}
