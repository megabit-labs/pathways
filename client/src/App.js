import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

<<<<<<< HEAD
import GithubAuth from './components/GithubAuth/GithubAuth';
import GetPathway from './components/GetPathway/GetPathway';
=======
import SearchPage from './components/SearchPage/SearchPage';
>>>>>>> cbcb765021f3948934df79d0428a0f4fc7640853

class App extends Component {

  render() {
    return (
<<<<<<< HEAD
      <Switch>
        <Route path="/" exact component={GithubAuth} />
        <Route path="/pathway" exact component={GetPathway} />
      </Switch>
=======
      <SearchPage />
>>>>>>> cbcb765021f3948934df79d0428a0f4fc7640853
    );
  }
}

export default App;