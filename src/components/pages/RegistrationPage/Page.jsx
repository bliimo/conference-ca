import React from 'react';
import { Page } from 'framework7-react';

export default () => (
  <Page pageContent={false}>
    <div className="page no-navbar no-toolbar no-swipeback">
      <div className="page-content login-screen-content signup-page">
        <div className="login-screen-title">Sign Up</div>
        <form>
          <div className="list">
            <ul>
              <li className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">Firstname</div>
                  <div className="item-input">
                    <input type="text" name="firstname" placeholder="Firstname"/>
                  </div>
                </div>
              </li>
              <li className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">Lastname</div>
                  <div className="item-input">
                    <input type="text" name="lastname" placeholder="Lastname"/>
                  </div>
                </div>
              </li>
              <li className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">Email</div>
                  <div className="item-input">
                    <input type="text" name="email" placeholder="Email"/>
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
              <li><a href="#" className="item-link list-button signup-link">Sign Up</a></li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </Page>
);
