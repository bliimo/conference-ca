import React,{Component} from 'react';
import { Page, Link, Toolbar, Tab, Tabs} from 'framework7-react';
import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';
import Account from '../../Tabs/Account/Account';
import DashboardIcon from '../../../img/icons/activities.svg';
import BoothsIcon from '../../../img/icons/booths.svg';
import AccountIcon from '../../../img/icons/account.svg';
import {getStorage} from '../../../reducers/reducer';
import style from './style.css';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid:null,
      isClicked:false, 
      showBoothNotification: true
    }
  }

  OnHandleCheck = () => {
   const uid = getStorage('uid');
   if(!uid)this.$f7router.navigate('/')
   this.setState({uid})
  };

  render() {
    return ( 
      <Page url=''>
        <Toolbar tabbar bottom>
          <Link tabLink='#dashboard' href='#dashboard' onClick={this.OnHandleCheck.bind(this)} tabLinkActive>
            <div className='icon-wrapper'>
              <img src={BoothsIcon} alt="Dashboard icon" />
            </div>
          </Link>
          <Link tabLink="#booths" href='#booths'>
            <div className='icon-wrapper'>
              <img src={DashboardIcon} alt="Booth icon" />
            </div>
          </Link>
          <Link tabLink="#account" href='#account'>
            <div className='icon-wrapper'>
              <img src={AccountIcon} alt="Account icon" />
            </div>
          </Link>
        </Toolbar>
        <Tabs swipeable>
          <Tab id="dashboard" tabActive onTabShow={this.OnHandleCheck.bind(this)} className="page-content">
            <Dashboard uid={this.state.uid} />
          </Tab>
          <Tab id="booths" className="page-content" onTabShow={ () => { this.setState({showBoothNotification: true}) } }>
            <Booth showNotification={this.state.showBoothNotification} closeNotication={ (status) => {this.setState({showBoothNotification: false})} } />
          </Tab>
          <Tab id="account" className="page-content">
            <Account/>
          </Tab>
        </Tabs>
      </Page> 
    );
  }
}
