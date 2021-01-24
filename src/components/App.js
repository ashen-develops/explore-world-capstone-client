import "../style.css";
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import StateSelector from './StateSelector'
import SignUp from './SignUp'
import CityInfo from './CityInfo'
import Suggestion from "./Suggestion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/select" component={StateSelector} />
        <Route path="/signup" component={SignUp} />
        <Route path="/info" component={CityInfo} />
        <Route path="/suggestions" component={Suggestion} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
