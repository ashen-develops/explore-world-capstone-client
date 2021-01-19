import "../style.css";
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import StateSelector from './StateSelector'
import SignUp from './SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/select" component={StateSelector} />
        <Route path="/signup" component={SignUp} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
