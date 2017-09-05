import List from '../components/List'

import {
  gql,
  graphql,
} from 'react-apollo'

const listQuery = gql`
query repositoryList($count: Int!) {
  viewer {
    repositories(first: $count) {
      edges {
        node {
          name,
          id
        }
      }
    }
  }
}
`;

const ListContainer = graphql(listQuery, {
  options: { variables: { count: 5 } },
})(List);

export default ListContainer;
