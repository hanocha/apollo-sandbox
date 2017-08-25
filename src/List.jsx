import React from 'react';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  gql,
  graphql,
} from 'react-apollo';

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

const ListItem = ({ data: { viewer, loading, error } }) => {
    if (loading) {
      return <div>loading...</div>;
    }
    if (error) {
      return <div>error!</div>;
    }
    return <div>{viewer.gists.edges[0].node.id}</div>;
}

const ListItemWithData = graphql(listQuery)(ListItem);

class List extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ListItemWithData />
      </ApolloProvider>
    )
  }
}

export default List;
