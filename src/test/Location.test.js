import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Florida from '../media/states/Florida';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Florida />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});