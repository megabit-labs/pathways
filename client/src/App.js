import React, { Component } from "react";

import GithubAuth from './components/GithubAuth/GithubAuth';
import StepDnDList from './components/StepDndList/stepDndList'
import CreateEditPathway from './screens/CreateEditPathway/CreateEditPathway'

class App extends Component {

  render() {
    return (
      // <GithubAuth />
      // <StepDnDList />
      <CreateEditPathway />
    );
  }
}

export default App;