import { connect } from 'react-redux';
import List from '../components/List'

import {
  gql,
  graphql,
} from 'react-apollo'

const listQuery = graphql(gql`
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
`);

const ListWithData = listQuery(List);

const mapStateToProps = state => {
  return {
    nodes: state.nodes
  }
}

const ListContainer = connect(mapStateToProps)(ListWithData);

export default ListContainer;
