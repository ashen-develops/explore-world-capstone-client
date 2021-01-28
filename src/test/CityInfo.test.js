import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CityInfo from '../components/CityInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CityInfo />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});