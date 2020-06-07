import React, { Component } from "react";
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';


import {
    STATUS,
    Logo,
    Logotype,
    Container,
    Header
} from "gitstar-components";

const getToken = gql`
            mutation($code: String!){
                GithubAuth(code: $code){
                    status
                    message
                    token
                }
            }
            `;

const CLIENT_ID = "8b508ba452a263f604b4";
const REDIRECT_URI = "http://localhost:3000/";

class GithubAuth extends Component {
    state = {
        status: STATUS.INITIAL,
        token: null,
        isLoggedIn: false,
        code: null,
    };

    fetchToken = () => {
        let code = this.state.code;
        if (code !== null) {
            this.props.getToken({
                variables: {
                    code: code
                }
            });
        }
    }

    render() {

        let display = <Container>
            <Header>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Logo />
                    <Logotype />
                </div>
                <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
                    Login
            </a>
            </Header>
        </Container>

        let code = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('code').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        if (code) {
            console.log(code);
            this.setState({ code: code });
            display = <Mutation mutation={getToken} variables={{ code }}>
                {(GithubAuth, { data }) => {
                    GithubAuth();
                    this.setState({ token: data.GithubAuth.token })
                    return <p>{data.GithubAuth.token}</p>
                }}
            </Mutation>
        }
        return (
            display
        )
    }
}

export default GithubAuth;