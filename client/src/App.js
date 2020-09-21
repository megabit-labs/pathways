import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"
import GetPathway from './components/GetPathway/GetPathway';
import CreateEditPathway from './screens/CreateEditPathway/CreateEditPathway'
import SearchPage from "../src/screens/SearchPage/SearchPage"
import SearchResultPage from "../src/screens/SearchResultPage/SearchResultPage";
import UserProfile from "../src/screens/UserProfile/UserProfile";
import GithubAuth from './components/GithubAuth/GithubAuth';    

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                    <Route path="/profile" exact component={UserProfile}/>
                    <Route path="/create" exact component={CreateEditPathway} />
                     <Route path="/pathway" component={GetPathway} />
                    <Route path="/results/search=:query" exact component={SearchResultPage}/>
                </Switch>
            </Fragment>
        )
    }
}

export default App
