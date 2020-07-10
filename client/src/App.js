import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"

import GithubAuth from "./components/GithubAuth/GithubAuth"
import GetPathway from "./components/GetPathway/GetPathway"
import SearchPage from "./components/SearchPage/SearchPage"

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                    <Route path="/pathway" exact component={GetPathway} />
                </Switch>
            </Fragment>
        )
    }
}

export default App
