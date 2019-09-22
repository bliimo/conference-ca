import React from 'react';
import { Page, Link, Toolbar, Tab, Tabs } from 'framework7-react';

import Dashboard from '../../Tabs/Dashboard/Dashboard';
import Booth from '../../Tabs/Booths/Booth';
import Account from '../../Tabs/Account/Account';

import style from './style.css';

import DashboardIcon from '../../../img/icons/activities.png';
import BoothsIcon from '../../../img/icons/booths.png';
import AccountIcon from '../../../img/icons/account.png';

export default () => (
  <Page pageContent={false}>
    <div className="page no-navbar no-toolbar no-swipeback">
      <div className="page-content login-screen-content login-page">
        <div className="login-screen-title">Login</div>
        <form>
          <div className="list">
            <ul>
              <li className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">Username</div>
                  <div className="item-input">
                    <input type="text" name="username" placeholder="Username"/>
                  </div>
                </div>
              </li>
              <li className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">Password</div>
                  <div className="item-input">
                    <input type="password" name="password" placeholder="Password"/>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="list">
            <ul>
              <li><a href="#" className="item-link list-button signin-link">Login</a></li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </Page>
);
