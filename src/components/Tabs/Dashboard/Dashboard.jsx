import React from 'react';
import { Swiper, SwiperSlide, Link } from 'framework7-react';

import style from './style.css';

import {connect} from 'react-redux';
import { getEvents, getStorage } from '../../../reducers/reducer';

import thumbnail from '../../../img/HomePage/featured-activity-bg.png';
import MPossibleLogo from '../../../img/EventPage/MpossibleLogo.png';

import Activity from './Activity';

const HandleDisplayEvents = (props) => {
  let activities = Object.entries(props.activities);
  let click = props.click;
  if(activities.length > 0){
    return (
      <div>
      {
        activities.map((activity, item) => {
          return (
              <div key={item}>
                {activity[0]}
                <HandleDisplayTalks click={click} talks={Object.entries(activity[1])}/>
              </div>
          )
        })
      }
      </div>
    )    
  }
  else{
    return (<div>Loading...</div>);
  }
}

const HandleDisplayTalks = (props) => {
  let {talks, click} = props;
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
        talks.map( (talk, index) => {
          return(
            <SwiperSlide key={index}>
              <Link onClick={ () => { click(talk); } } >
                <div className='talk'>
                  <img src={talk[1].thumbnail} alt={talk[1].title} />
                  <div className='title'>{talk[1].name}</div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  );
}

const HandleDisplaySlide = (data) => {
  let {activity} = data;
  return (
    <div>
      <img src={activity.thumbnail} alt={activity.name} className='featured-activity-bg-image' />
      <div className='content'>
        <div className='left'>
          <div className='logo'><img src={MPossibleLogo} alt='' /></div>
          <div className='title'>{activity.date}</div>
          <div className='description'>{activity.shortDesc}</div>
        </div>
        <div className='right'>
          <div className='profile-picture'><img src={activity.speakerDP} alt='' /></div>
          <div className='name'>{activity.speaker}</div>
        </div>
      </div>
    </div>
  )
}

const HandleDisplayFeaturedActivity = (props) => {
  let {activities, click} = props;

  if(activities.length > 0){
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
          activities.map( (activity, index) => {
            return(
              <SwiperSlide key={index}>
                <Link onClick={ () => {click(activity)} } >
                  <HandleDisplaySlide activity={activity[1]} />
                </Link>
              </SwiperSlide>
            );
          })
        }
      </Swiper>
    )

  }
  else{
    return (<div>Loading...</div>);
  }
}

const HandleFilterFeatured = (activities) => {
  let talks = [], featured = activities.map((i, l) => {
    return Object.entries(i[1]).filter((a) => { return a[1].featured });
  });
  featured = featured.filter( a => a.length>0 );
  featured.map( a => { talks = [...talks, ...a]} )
  return talks
}

class HomePage extends React.Component {
  state = {
    featuredActivity: {},
    activities: {}, 
    activity:{},
    display: 'dashboard' // 'dashboard'
  }

  HandleGetEvents = async () => {
    const events = await this.props.getEvents('/events?orderByValue=\"featured\"&equalTo="true');
    let featuredActivity = HandleFilterFeatured(Object.entries(events.payload.data));
    this.setState({activities: events.payload.data, featuredActivity: featuredActivity});
  };

  componentWillMount = () => {
    this.HandleGetEvents(); 
  }

  HandleActivities = (activity) =>{
    this.setState({display:'activity',activity})
  }

  componentDidMount = () => {
  } 

  render(){
    // this.setState({display: e})
    return(
      <div className='dashboard'>
        { ( this.state.display === 'dashboard' ) ? 
          <div>
            <div className='featured-activity'>
              <HandleDisplayFeaturedActivity click={this.HandleActivities} activities={this.state.featuredActivity} /> 
            </div>
            <div className='activities'>
              <HandleDisplayEvents click={this.HandleActivities} activities={this.state.activities} /> 
            </div>
          </div> : 
          <Activity featured={this.state.activity} event={ (e) => { this.setState({display: e ? 'dashboard' : '' }) } } />
        }
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    getEventsState: state.getEventsState
  };
};

const mapDispatchToProps =(dispatch)=>{
  return {
    getEvents:()=>{ return dispatch(getEvents()) },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);