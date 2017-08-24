import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  gql,
  graphql,
} from 'react-apollo';

import List from './List';

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

const listQuery = gql`
query {
  viewer {
    gists(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
}
`;

const ListWithData = graphql(listQuery)(List);

ReactDOM.render(
  <ApolloProvider client={client}>
    <ListWithData />
  </ApolloProvider>,
  mountNode
);
