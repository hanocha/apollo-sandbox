import React from 'react';

export default ({ data: { viewer } }) => {
  if (viewer) {
    return <div>{viewer.gists.edges[0].node.id}</div>;
  }

  return <div>loading...</div>;
}
