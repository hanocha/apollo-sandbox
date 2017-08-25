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

const addCommentQuery = gql`
mutation addComment {
  addComment(input: { body: "test comment with Apollo!", subjectId: "MDExOlB1bGxSZXF1ZXN0MTM3MzkyMzg5"}) {
    clientMutationId
  }
}
`;

const dummyItem = ({ mutate }) => {
  mutate()
  return null
}

const Mutate = graphql(addCommentQuery)(dummyItem);

class MutateComponent extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Mutate />
      </ApolloProvider>
    )
  }
}

export default MutateComponent;
