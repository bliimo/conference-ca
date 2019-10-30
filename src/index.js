import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React from 'framework7-react';
import Apps from './components/App.jsx';
import 'framework7/css/framework7.bundle.css';
import './css/icons.css';
import './css/app.css';

function onDeviceReady(){
  Framework7.use(Framework7React);
  ReactDOM.render(React.createElement(Apps), document.getElementById('app'));
}

if(window.cordova){
  document.addEventListener("deviceready", onDeviceReady, false);
}else{ 
  onDeviceReady();
}
