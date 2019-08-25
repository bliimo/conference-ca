import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React from 'framework7-react';
import App from './components/App.jsx';
import 'framework7/css/framework7.bundle.css';
import './css/icons.css';
import './css/app.css';
Framework7.use(Framework7React);
ReactDOM.render(
  React.createElement(App),
  document.getElementById('app'),
);
