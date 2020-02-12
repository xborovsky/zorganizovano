import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import join from 'url-join';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(config => {
  // Concatenate base path if not an absolute URL
  if ( !isAbsoluteURLRegex.test(config.url)) {
    const urlPrefix = process.env.NODE_ENV === "production" ?
      "https://zorganizovano.cz:" : "http://localhost:";
    const port = config.url.startsWith('/img-api') ? 8082 : 8081;
    const defaultContextPath = port === 8081 ? '/api' : '';

    config.url = join(`${urlPrefix}${port}${defaultContextPath}`, config.url);
    return config;
  }
});

const httpLink = createHttpLink({
  uri : process.env.NODE_ENV === "production" ?
    "https://zorganizovano.cz:8081/api/graphql" :
    "http://localhost:8081/api/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
