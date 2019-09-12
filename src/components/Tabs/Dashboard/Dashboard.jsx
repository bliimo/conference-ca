import React from 'react';
import { Swiper, SwiperSlide, Link } from 'framework7-react';
import './style.css';
import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';
import profilePicture from '../../../img/HomePage/profilePicture.png';

import DigitalRevolution from '../../../img/HomePage/DigitalRevolution.png';
import InvestoMania from '../../../img/HomePage/InvestoMania.png';
import MPossible from '../../../img/HomePage/MPossible.png';
import MillenialTalks from '../../../img/HomePage/MillenialTalks.png';
import SaveMoney from '../../../img/HomePage/SaveMoney.png';

import Activity from './Activity';

const HandleDisplayEvents = (props) => {
  return (
    <div>
    {
      props.activities.map((activity, item) => {
        return (
          <div key={item}>
            {activity.name}
            <HandleDisplayTalks talks={activity.talks} />
          </div>
        )
      })
    }
    </div>
  )
}

const HandleDisplayTalks = (props) => {
  return (
    <Swiper
      navigation={false}
      params={{speed:500, slidesPerView: 3, spaceBetween: 10}}
      swiperOptions={{
        autoplay: true,
        loop: true,
        slidesPerView: 1,
      }}
      loop={true}
      pagination={false}
    >
        {
          props.talks.map( (talk, index) => {
            return(<SwiperSlide key={index}>
              <div className='talk'>
                <img src={talk.thumbnail} alt={talk.title} />
                <div className='title'>{talk.title}</div>
              </div>
            </SwiperSlide>);
          })
        }
    </Swiper>
  );
}

const HandleDisplaySlide = (data) => {
  let {activity} = data;
  return (
    <div>
      <img src={thumbnail} alt={activity.name} className='featured-activity-bg-image' />
      <div className='content'>
        <div className='left'>
          <div className='logo'><img src={activity.logo} alt='' /></div>
          <div className='title'>{activity.title}</div>
          <div className='description'>{activity.description}</div>
        </div>
        <div className='right'>
          <div className='profile-picture'><img src={activity.profilePicture} alt='' /></div>
          <div className='name'>{activity.profileName}</div>
        </div>
      </div>
    </div>
  )
}

const HandleDisplayFeaturedActivity = (props) => {
  return(
    <Swiper
      swiperOptions={{
        autoplay: true,
        loop: true,
        slidesPerView: 1,
      }}
      navigation={false}
      pagination={false}
    >
      {
        props.activities.map( (activity, index) => {
          return(
            <SwiperSlide key={index}>
              <Link onClick={ () => { props.click(true) } } >
                <HandleDisplaySlide activity={activity} />
              </Link>
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  )
}

export default class HomePage extends React.Component {
  state = {
    featuredActivity:[
      {
        name: "MPossible",
        thumbnail: thumbnail,
        logo: MPossibleLogo,
        profilePicture: profilePicture,
        title: 'November 5-6, 2019',
        profileName: 'Jane Dela Cruz',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      }, 
      {
        name: "MPossible",
        thumbnail: thumbnail,
        logo: MPossibleLogo,
        profilePicture: profilePicture,
        title: 'November 5-6, 2019',
        profileName: 'Jane Dela Cruz',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      }, 
    ],
    activities:[
      {
        name: 'November 5, 2019',
        talks: [{
          thumbnail: InvestoMania,          
          title:'InvestoMania',
          timeStart: '8:00',
          timeEnd: '10:00'
        },
        {
          thumbnail: MPossible,          
          title:'MPossible',
          timeStart: '10:15',
          timeEnd: '11:30'
        },
        {
          thumbnail: DigitalRevolution,          
          title:'Digital Revolution',
          timeStart: '13:00',
          timeEnd: '14:30'
        },
        {
          thumbnail: SaveMoney,          
          title:'Save Money',
          timeStart: '14:45',
          timeEnd: '16:00'
        }]
      },
      {
        name: 'November 6, 2019',
        talks: [{
          thumbnail: MPossible,          
          title:'MPossible',
          timeStart: '9:00',
          timeEnd: '11:00'
        },
        {
          thumbnail: MillenialTalks,          
          title:'Millenial Talks',
          timeStart: '13:15',
          timeEnd: '14:30'
        },
        {
          thumbnail: SaveMoney,          
          title:'Save Money',
          timeStart: '14:30',
          timeEnd: '15:00'
        },
        {
          thumbnail: InvestoMania,          
          title:'InvestoMania',
          timeStart: '15:15',
          timeEnd: '17:00'
        }]
      },
    ], 
    display: 'activity' //dashboard
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  render(){
    return(
      <div className='dashboard'>
        { (this.state.display == 'dashboard') ? 
          <div>
            <div className='featured-activity'>
              <HandleDisplayFeaturedActivity click={ (e) => { this.setState({display:e}) } } activities={this.state.featuredActivity} />
            </div>
            <div className='activities'>
              <HandleDisplayEvents activities={this.state.activities} /> 
            </div>
          </div> : 
          <Activity event={ (e) => { this.setState({display: e ? 'dashboard' : '' }) } } />
        }
      </div>
    )
  }
}
