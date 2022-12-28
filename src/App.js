import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import ToDos from "./ToDos";
import Posts from "./Posts";
import Photos from "./Photos";

function App () {
  const [album, setAlbum] = useState(1);

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
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/photos">
              <Photos album={album} setAlbum={setAlbum}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router> 
  );
 
}

export default App;
