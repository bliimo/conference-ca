import React from 'react';
import { Swiper, SwiperSlide, Link, List, ListInput, Icon, ListItem, AccordionContent, Block, Button } from 'framework7-react';

import style from './style.css';

import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';
import profilePicture from '../../../img/HomePage/profilePicture.png';

import DigitalRevolution from '../../../img/HomePage/DigitalRevolution.png';
import InvestoMania from '../../../img/HomePage/InvestoMania.png';
import MPossible from '../../../img/HomePage/MPossible.png';
import MillenialTalks from '../../../img/HomePage/MillenialTalks.png';
import SaveMoney from '../../../img/HomePage/SaveMoney.png';
import LandScape from '../../../img/HomePage/landscape-4456368_960_720.jpg';
import LScape from '../../../img/HomePage/landscape-4460710_960_720.jpg';
import Twilight from '../../../img/HomePage/twilight-4453762_960_720.jpg';

export default class Activity extends React.Component {

  state = {
    display: 'dashboard', 
    description: `<h1 style='font-family: var(--font-light)'>The <span style='font-family: var(--font-bold)'>Talk</span></h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
    images : [
      { image:LandScape },
      { image:LScape },
      { image:Twilight }
    ],
    rate: 0,
    active: 0
  }
  
  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  btnRateHandler = (e) => {
    this.setState({
      rate: e,
      active: e
    })
  }
  
  render(){
      const { images, active } = this.state
      let { rate } = this.state

      const fullStar = <Icon material='star'/>
      const emptyStar = <Icon material='star_border'/>

    return(
      <div className='container'>
        <img src={thumbnail} alt=' bg image' className='bgImage'/>
        <div className='imagePos'>
        <Link iconMd='material:keyboard_arrow_left' color="white" className='back-button' onClick={ () => { this.props.event(true) } }></Link>
          <img src={ MPossibleLogo } alt='logo' className='mpossibleLogo'/>
          <img src={ profilePicture } alt='profile picture' className='profile'/>
          <h4 className='name'>Jane Dela Cruz</h4>
        </div>
        <div className='title'>
          <h4 className='theTalk'>The <strong>Talk</strong></h4>
        </div>
        <div className='description'>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </h4>
          <h4 className='secondSentence'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </h4>
        </div>
        <div className='thePlace'>
          <h4>The <strong>Place</strong></h4>
        </div>
        <div className='swiperPadding'>
          <Swiper params={{speed:500, spaceBetween: 15}} className='swiperContainer'>
            {
              images.map(imageItem =>(
                <SwiperSlide><img className='imgSize' src={imageItem.image}/></SwiperSlide>
              ))
            }
          </Swiper>
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

            <ListItem accordionItem title="Rating" className='backgroundColor'>
              <AccordionContent>
              <List>
                <ListItem title="Rate">
                  { active === 1 ?
                    <div>
                    <Button type="submit" active round outline onClick={() => this.btnRateHandler(1)}>1</Button>
                    </div>: <Button type="submit" round outline onClick={() => this.btnRateHandler(1)}>1</Button>
                  }
                  { active === 2 ?
                    <div>
                      <Button type="submit" active round outline onClick={() => this.btnRateHandler(2)}>2</Button>
                    </div>: <Button type="submit" round outline onClick={() => this.btnRateHandler(2)}>2</Button>
                  }
                  { active === 3 ?
                    <div>
                      <Button active type="submit" round outline onClick={() => this.btnRateHandler(3)}>3</Button>
                    </div>: <Button type="submit" round outline onClick={() => this.btnRateHandler(3)}>3</Button>
                  }
                  { active === 4 ?
                    <div>
                      <Button active type="submit" round outline onClick={() => this.btnRateHandler(4)}>4</Button>
                    </div>:<Button type="submit" round outline onClick={() => this.btnRateHandler(4)}>4</Button>
                  }
                  { active ===5 ?
                    <div>
                      <Button active type="submit" round outline onClick={() => this.btnRateHandler(5)}>5</Button>
                    </div>: <Button type="submit" round outline onClick={() => this.btnRateHandler(5)}>5</Button>
                  }
                  
                </ListItem>
              </List>
              </AccordionContent>
            </ListItem>

          </List>
    
          <div className='stars'>
            { rate === 0 ?
              <div>
                {emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}
              </div>: "" }
            { rate === 1 ?
              <div>
                {fullStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}
              </div>: "" }
            { rate === 2 ?
              <div>
                {fullStar} {fullStar} {emptyStar} {emptyStar} {emptyStar}
              </div>: "" }
            { rate === 3 ?
              <div>
                {fullStar} {fullStar} {fullStar} {emptyStar} {emptyStar}
              </div>: "" }
            { rate === 4 ?
              <div>
                {fullStar} {fullStar} {fullStar} {fullStar} {emptyStar}
              </div>: "" }
            { rate === 5 ?
              <div>
                {fullStar} {fullStar} {fullStar} {fullStar} {fullStar}
              </div>: "" }
          </div>
          
        </div>
      </div>
      )
    }
  }