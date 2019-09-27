import React,{Component} from 'react';
import { Page, Link, Toolbar, Tab, Tabs } from 'framework7-react';

import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';

import style from './style.css';

import DashboardIcon from '../../../img/icons/activities.png';
import BoothsIcon from '../../../img/icons/booths.png';
import AccountIcon from '../../../img/icons/account.png';
import {getStorage} from '../../../reducers/reducer'
export default class AccountPage extends Component {
  constructor(props){
    super(props)
  }

  OnHandleCheckUser = ()=> {
    const uid = getStorage('uid')
    console.log(uid)
  }
  
  render() {
    return (
      <Page pageContent={false}>
        <Toolbar tabbar bottom>
          <Link tabLink="#dashboard">
            <div>
              <img src={DashboardIcon} alt="Dashboard icon" />
            </div>
          </Link>
          <Link tabLink="#booths" tabLinkActive>
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
          <Tab id="dashboard" className="page-content">
            <Dashboard />
          </Tab>
          <Tab id="booths" className="page-content" tabActive>
            <Booth />
          </Tab>
          <Tab id="account" className="page-content">
            <p>Account</p>
          </Tab>
        </Tabs>
      </Page>
    );
  }
}
