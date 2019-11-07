import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import join from 'url-join';

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(config => {
  // Concatenate base path if not an absolute URL
  if ( !isAbsoluteURLRegex.test(config.url)) {
    const port = config.url.startsWith('/img-api') ? 8082 : 8081;
    const defaultContextPath = port === 8081 ? '/api' : '';
    config.url = join(`http://localhost:${port}${defaultContextPath}`, config.url);
  }

  return config;
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
