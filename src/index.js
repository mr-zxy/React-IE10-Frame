// 兼容ie10 --start
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import './polyfill';
import 'core-js/es/set';
import 'core-js/es/map';
import 'mutation-observer';
// 兼容ie10 --end
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import './styles/style/index.scss';
import './utils/commons';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>
  ,
  document.getElementById('app')
);
serviceWorker.unregister();
