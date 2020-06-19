import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import GithubAuth from './components/GithubAuth/GithubAuth';
import GetPathway from './components/GetPathway/GetPathway';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={GithubAuth} />
        <Route path="/pathway" exact component={GetPathway} />
      </Switch>
    );
  }
}

export default App;