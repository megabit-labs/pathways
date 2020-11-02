import React, { useState } from "react";
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';


import {
    Logo,
    Logotype,
    Container,
    Header
} from "gitstar-components";



const CLIENT_ID = "37454df5e11a69f88833";


const GET_TOKEN = gql`
    mutation($code: String!){
        GithubAuth(code: $code){
            status
            message
            token
        }
    }
`;


const GithubAuth = (props) => {

    const [isTouched, isTouchedHandler] = useState(false);
    const [getToken, { loading, data }] = useMutation(GET_TOKEN);

    let display = <Container>
        <Header>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Logo />
                <Logotype />
            </div>
            <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}>
                Login
            </a>
        </Header>
    </Container>

    let displayedData = null;
    let code = null;
    code = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('code').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    if (code && !isTouched) {
        isTouchedHandler(true);
        getToken({ variables: { code: code } })
    }

    if(!isTouched){
        displayedData = null;
    }
    else{
        if (loading) {
            displayedData = <div>Loading ...</div>
        }
        else {
            let token = data.GithubAuth.token;
            displayedData = <div>Your Token is <br />{token}</div>
        }
    }

    return (
        <div>
            {display}
            <div>{displayedData}</div>
        </div>
    );
}

export default GithubAuth;
