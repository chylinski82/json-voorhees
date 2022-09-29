import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import ToDos from "./ToDos";
import Photos from "./Photos";

function App () {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/todos">
              <ToDos />
            </Route>
            <Route path="/photos">
              <Photos />
            </Route>
          </Switch>
        </div>
      </div>
    </Router> 
  );
 
}

export default App;
