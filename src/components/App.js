import "../style.css";
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import StateSelection from './StateSelection';
import SelectState from './ss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={SelectState} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
