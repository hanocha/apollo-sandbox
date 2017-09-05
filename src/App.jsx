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
import CommentButton from './containers/CommentButton'
import app from './reducers'

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
    app: app,
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

class App extends React.Component {
  render() {
    return (
      <div>
        <ListContainer count={4} />
        <CommentButton />
      </div>
    )
  }
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  mountNode
);
