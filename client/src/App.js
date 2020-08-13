import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"


import CreateEditPathway from './screens/CreateEditPathway/CreateEditPathway'
import SearchPage from "../src/screens/SearchPage/SearchPage"
import SearchResultPage from "../src/screens/SearchResultPage/SearchResultPage"
class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                    <Route path="/create" exact component={CreateEditPathway} />
                    <Route path="/results/search=:query" exact component={SearchResultPage}/>
                </Switch>
            </Fragment>
        )
    }
}

export default App
