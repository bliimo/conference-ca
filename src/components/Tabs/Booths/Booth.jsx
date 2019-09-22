import React from 'react';
import { Navbar, NavLeft, NavTitle, Block, AccordionItem, AccordionContent, AccordionToggle } from 'framework7-react';

import style from './style.css';

import HarleyLogo from '../../../img/Booths/HarleyLogo.png';
import InquirerLogo from '../../../img/Booths/InquirerLogo.png';
import JackAndJillLogo from '../../../img/Booths/JackAndJillLogo.png';
import PepsiLogo from '../../../img/Booths/PepsiLogo.png';
import UratexLogo from '../../../img/Booths/UratexLogo.png';
import FritolayLogo from '../../../img/Booths/FritolayLogo.png';

const HandleDisplayBooth = (props) => {
  return (
    <AccordionItem>
      <AccordionToggle>
        <div className='booth-information'>
          <div className='left'>
            <img src={props.data.logo} alt={props.data.booth} />
          </div>
          <div className='right'>
            <div className='booth-name'>{props.data.booth}</div>
            <div className='booth-description'>{props.data.description}</div>
          </div>
        </div>
      </AccordionToggle>
      <AccordionContent>
      <div className='booth-information'>
        <div className='right'>{( props.data.website !== '') ? `Website: ${props.data.website}` : '' }</div>
        <div className='right'>{ ( props.data.contact !== '') ? `Contact: ${props.data.contact}` : '' }</div>
      </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default class HomePage extends React.Component {

  state = {
    booths:[
      {
        booth: 'V8 Engine Tuning Tutorials',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: HarleyLogo,
        website: 'https://www.harley-davidson.com/', 
        contact:''
      },
      {
        booth: 'Free Newspaper and Goodies',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: InquirerLogo,
        website: 'https://www.inquirer.net/', 
        contact:'09661476295'
      },
      {
        booth: 'New Snack Sample Tasting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: JackAndJillLogo,
        website: 'http://www2.urc.com.ph/products/philippines/ph-jack-n-jill', 
        contact:''
      },
      {
        booth: 'Soda Pong Challenge',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: PepsiLogo,
        website: 'https://www.pepsi.com/en-us/', 
        contact:''
      },
      {
        booth: 'Discount Vouchers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: UratexLogo,
        website: 'https://www.uratex.com.ph/', 
        contact:'09661476295'
      },
      {
        booth: 'Free Snack via Sign up',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        logo: FritolayLogo,
        website: 'https://www.fritolay.com/', 
        contact:'09661476295'
      },
    ]
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  render(){
    return(
      <div className='booths'>
        <Navbar>
          <NavLeft><i className="f7-icons">chevron_left</i></NavLeft>
          <NavTitle>Activities/Booths</NavTitle>
        </Navbar>

        <Block inner accordionList>
          {
            this.state.booths.map( (booth, index) => {
              return (
                <HandleDisplayBooth key={index} data={booth} />
              )
            } )
          }
        </Block>
      </div>
    )
  }
}
