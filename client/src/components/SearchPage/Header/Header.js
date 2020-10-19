import React, { useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import LogoGithub from 'react-ionicons/lib/LogoGithub'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from "./Header.module.css"

import * as actions from '../../../store/actions/index';

const CLIENT_ID = "8b508ba452a263f604b4"

const GET_TOKEN = gql`
    mutation($code: String!) {
        GithubAuth(code: $code) {
            status
            message
            token
        }
    }
`

const Header = (props) => {
    const [isLoggedIn, isLoggedInHandler] = useState(false)
    const [isTouched, isTouchedHandler] = useState(false)
    const [getToken, { loading, data }] = useMutation(GET_TOKEN)

    let code = null
    code = decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" +
                    encodeURIComponent("code").replace(/[\.\+\*]/g, "\\$&") +
                    "(?:\\=([^&]*))?)?.*$",
                "i"
            ),
            "$1"
        )
    )

    let token

    if (code && !isLoggedIn) {
        console.log(code);
        isLoggedInHandler(true)
        getToken({ variables: { code: code } })
    }

    if (data && !isTouched) {
        isTouchedHandler(true)
        token = data.GithubAuth.token
        console.log(token, data);
        props.userLogin(null);
        localStorage.setItem("token", token)
        alert("You are logged in !!!")
    }

    return (
        <React.Fragment>
            <Navbar className={classes.navbar}>
                <Nav className={classes.navlinks}>
                    <Nav.Link
                        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}
                    >
                        <div className={classes.login}>
                            <LogoGithub fontSize="35px" color="white" />
                            <div className={classes.text}>
                                Login with GitHub
                            </div>
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (payload) => dispatch(actions.userLogin(payload)),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Header))
