import React from 'react';
import { Swiper, SwiperSlide, Link, List, ListInput, Icon, ListItem, AccordionContent, Block, Button } from 'framework7-react';
import './style.css';
import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';
import profilePicture from '../../../img/HomePage/profilePicture.png';
import LandScape from '../../../img/HomePage/landscape-4456368_960_720.jpg';
import LScape from '../../../img/HomePage/landscape-4460710_960_720.jpg';
import Twilight from '../../../img/HomePage/twilight-4453762_960_720.jpg';

import DigitalRevolution from '../../../img/HomePage/DigitalRevolution.png';
import InvestoMania from '../../../img/HomePage/InvestoMania.png';
import MPossible from '../../../img/HomePage/MPossible.png';
import MillenialTalks from '../../../img/HomePage/MillenialTalks.png';
import SaveMoney from '../../../img/HomePage/SaveMoney.png';

export default class Activity extends React.Component {
  state = {
    images : [
      { image:LandScape },
      { image:LScape },
      { image:Twilight }
    ],
    rate: 0,
    active: 0,
    name: 'Jane Dela Cruz',
    description: `<h1 style='font-family: var(--font-light)'>The <span style='font-family: var(--font-bold)'>Talk</span></h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h1 style='font-family: var(--font-light)'>The <span style='font-family: var(--font-bold)'>Place</span></h1><p>
    <div class="swiper-container swiper-init demo-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src='${LandScape}' alt='' style='height: 200px; width: 420px;'></div>
        <div class="swiper-slide"><img src='${LScape}' alt='' style='height: 200px; width: 420px;'></div>
        <div class="swiper-slide"><img src='${Twilight}' alt='' style='height: 200px; width: 420px'></div>
        <div class="swiper-slide"><img src='${MillenialTalks}' alt='' style='height: 200px; width: 420px'></div>
        <div class="swiper-slide"><img src='${SaveMoney}' alt='' style='height: 200px; width: 420px'></div>
      </div>
    </div>
    </p>`
  }

  Buttons = () =>{
    const { active } = this.state;
    return(
      <div className="btnActive">
        <div className="btnActivePos"><Button active={active===1} type="submit" round outline onClick={() => this.btnRateHandler(1)}>1</Button></div>
        <div className="btnActivePos"><Button active={active===2} type="submit" round outline onClick={() => this.btnRateHandler(2)}>2</Button></div>
        <div className="btnActivePos"><Button active={active===3} type="submit" round outline onClick={() => this.btnRateHandler(3)}>3</Button></div>
        <div className="btnActivePos"><Button active={active===4} type="submit" round outline onClick={() => this.btnRateHandler(4)}>4</Button></div>
        <div className="btnActivePos"><Button active={active===5} type="submit" round outline onClick={() => this.btnRateHandler(5)}>5</Button></div>
      </div>
    )
  }
  
StarRating = () => {
  const { rate } = this.state
  const ratings = []
    for(let ratingCounter = rate; ratingCounter > 0; ratingCounter--) {
      ratings.push(1)
    }
    for(let ratingCounter = 5 - rate; ratingCounter > 0; ratingCounter--) {
      ratings.push(0)
    }
    return(
      <div className='stars'>
        { ratings.map( item => {
          if (item == 1){
            return <Icon material='star'/>
          }
          else{
            return <Icon material='star_border'/>
          }
        }
        )}
      </div>
    )
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
      let { name } = this.state
      const { active } = this.state
      
      
    return(
      <div className='container'>
        <img src={thumbnail} alt=' bg image' className='bgImage'/>

        <div className='imagePos'>
          <Link iconMd='material:keyboard_arrow_left' color="white" className='back-button' onClick={() => {this.props.event(true)} }></Link>
          <img src={ MPossibleLogo } alt='logo' className='mpossibleLogo'/>
          <img src={ profilePicture } alt='profile picture' className='profile'/>
          <h4 className='name'>{name}</h4>
        </div>

        <div className='description' dangerouslySetInnerHTML={{__html: this.state.description}} ></div>

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
                    resizable/>
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
                    resizable/>
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
                    resizable/>
                </Block>
              </AccordionContent>
            </ListItem>

            <ListItem accordionItem title="Rating" className='backgroundColor'>
              <AccordionContent>
                <List>
                  {
                    this.Buttons()
                  }
                </List>
              </AccordionContent>
            </ListItem>
          </List>
    
          {
              this.StarRating()
          }
          <br />
        </div>
      </div>
      )
    }
  }