import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StateSelector from '../components/StateSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <StateSelector />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});