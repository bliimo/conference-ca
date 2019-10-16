import React,{Component} from 'react';
import { Page, Link, Toolbar, Tab, Tabs } from 'framework7-react';

import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';
import Account from '../../Tabs/Account/Account';

import style from './style.css';

import DashboardIcon from '../../../img/icons/activities.png';
import BoothsIcon from '../../../img/icons/booths.png';
import AccountIcon from '../../../img/icons/account.png';
import {getStorage} from '../../../reducers/reducer'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid:null
    }
  }

  OnHandleCheck = () => {
   const uid = getStorage('uid');
   if(!uid)this.$f7router.navigate('/')
   this.setState({uid})
  };
  render() {
    return (
      <Page pageContent={false} onPageAfterIn={this.OnHandleCheck.bind(this)} onPageBeforeIn={this.OnHandleCheck.bind(this)}>
        <Toolbar tabbar bottom>
          <Link tabLink='#dashboard' onClick={this.OnHandleCheck.bind(this)} tabLinkActive>
            <div>
              <img src={DashboardIcon} alt="Dashboard icon" />
            </div>
          </Link>
          <Link tabLink="#booths">
            <div>
              <img src={BoothsIcon} alt="Booth icon" />
            </div>
          </Link>
          <Link tabLink="#account">
            <div>
              <img src={AccountIcon} alt="Account icon" />
            </div>
          </Link>
        </Toolbar>
        <Tabs swipeable>
          <Tab id="dashboard" tabActive onTabShow={this.OnHandleCheck.bind(this)} className="page-content">
            <Dashboard uid={this.state.uid} />
          </Tab>
          <Tab id="booths" className="page-content">
            <Booth />
          </Tab>
          <Tab id="account" className="page-content">
            <Account />
          </Tab>
        </Tabs>
      </Page>
    );
  }
}