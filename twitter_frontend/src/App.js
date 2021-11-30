import "./App.css";
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Login, Signup } from "./user_pages";
import { Home } from "./twitter_pages";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <Route exact path="/home" component={Home} />
            <Route component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
