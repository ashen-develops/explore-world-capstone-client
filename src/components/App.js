import '../App.css';
import React from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Header />
      {/* <Switch>
        <Route exact path="/" component={Landing} />
      </Switch> */}
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
