import React from 'react';
import ReactDOM from 'react-dom';

import List from './List';
import MutateComponent from './Comment'

const mountNode = document.getElementById('root');

ReactDOM.render(
  <div>
    <List />
    <MutateComponent />
  </div>,
  mountNode
);
