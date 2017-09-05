import React from 'react';
import ListItem from './ListItem'

const List = ({ data: { viewer, loading, error } }) => {
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {viewer.repositories.edges.map((edge, index) => {
        return <ListItem key={index} node={edge.node} />
      })}
    </div>
  );
};

export default List;
