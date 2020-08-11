import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"

import CreateEditPathway from './screens/CreateEditPathway/CreateEditPathway'
import SearchPage from "../src/screens/SearchPage/SearchPage"
import GetPathway from './components/GetPathway/GetPathway';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                    <Route path="/create" exact component={CreateEditPathway} />
                    <Route path="/pathway" component={GetPathway} />
                </Switch>
            </Fragment>
        )
    }
}

export default App
