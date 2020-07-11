import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"

import SearchPage from "./components/SearchPage/SearchPage"

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                </Switch>
            </Fragment>
        )
    }
}

export default App
