import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"

import GithubAuth from './components/GithubAuth/GithubAuth'
import CreateEditPathway from './screens/CreateEditPathway/CreateEditPathway'
import SearchPage from "../src/screens/SearchPage/SearchPage"
import Dashboard from "../src/screens/Dashboard/Dashboard"

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                    <Route path="/create" exact component={CreateEditPathway} />
                    <Route path="/dashboard" exact component={Dashboard} />
                </Switch>
            </Fragment>
        )
    }
}

export default App
