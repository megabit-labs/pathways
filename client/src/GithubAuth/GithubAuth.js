import React, { Component } from "react";

import {
    STATUS,
    Logo,
    Logotype,
    Container,
    Header
} from "gitstar-components";

const CLIENT_ID = "8b508ba452a263f604b4";
const REDIRECT_URI = "http://localhost:3000/";

class GithubAuth extends Component {
    state = {
        status: STATUS.INITIAL,
        token: null,
        isLoggedIn: false,
    };

    componentDidMount() {
        let code = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('code').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        if (code) {
            console.log(code);
            this.setState({ isLoggedIn: true })
        }
    }

    render() {

        let loggedIn = null;
        if (this.state.isLoggedIn) {
            loggedIn = <p>You are Logged In</p>
        }

        return (
            <Container>
                <Header>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Logo />
                        <Logotype />
                    </div>
                    <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
                        Login
                    </a>
                </Header>
                {loggedIn}
            </Container>
        );
    }
}

export default GithubAuth;