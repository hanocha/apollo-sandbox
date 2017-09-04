import React from 'react';
import GistItem from './GistItem'

const List = ({ data: { viewer, loading, error } }) => {
  if (loading) {
    return <div>loading...</div>;
  }
  return <GistItem node={viewer.gists.edges[0].node} />
};

export default List;
