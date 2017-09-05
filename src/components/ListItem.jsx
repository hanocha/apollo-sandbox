import React from 'react';

const ListItem = ({ node }) => (
  <p>
    Name: {node.name}, {node.id}
  </p>
);

export default ListItem;
