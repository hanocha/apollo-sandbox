import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo';
import Button from '../components/Button';

const addCommentQuery = gql`
mutation addComment {
  addComment(input: { body: "test comment with Apollo!", subjectId: "MDExOlB1bGxSZXF1ZXN0MTM3MzkyMzg5"}) {
    clientMutationId
  }
}
`;

const ButtonWithQuery = graphql(addCommentQuery, {
  props: ({ ownProps, mutate }) => ({ 
    onClick() {
      mutate();
    }
  }),
})(Button);

const mapNameToProps = state => {
  return {
    text: state.app.commentButton.text,
  }
}

const CommentButton = connect(mapNameToProps)(ButtonWithQuery);

export default CommentButton;
