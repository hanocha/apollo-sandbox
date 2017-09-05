import React from 'react';
import ReactDOM from 'react-dom';

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo';

import ListContainer from './containers/ListContainer';

const mountNode = document.getElementById('root');

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
  opts: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.TOKEN}`,
    },
  },
})

const client = new ApolloClient({
  networkInterface: networkInterface,
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

ReactDOM.render(
  <div>
    <ApolloProvider store={store} client={client}>
      <ListContainer />
    </ApolloProvider>
  </div>,
  mountNode
);
