import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route exact path="/">
              <News key="general" country="in" category="general" />
            </Route>
            <Route exact path="/entertainment">
              <News key="entertainment" country="in" category="entertainment" />
            </Route>
            <Route exact path="/general">
              <News key="general" country="in" category="general" />
            </Route>
            <Route exact path="/health">
              <News key="health" country="in" category="health" />
            </Route>
            <Route exact path="/science">
              <News key="science" country="in" category="science" />
            </Route>
            <Route exact path="/sports">
              <News key="sports" country="in" category="sports" />
            </Route>
            <Route exactpath="/technology">
              <News key="technology" country="in" category="technology" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
