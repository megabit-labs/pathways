import React, { useState } from "react"
import { Navbar, Nav, NavLink, Button } from "react-bootstrap"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { withRouter } from "react-router-dom"

import classes from "./Header.module.css"
import Menu from "../assets/menu.png"

const CLIENT_ID =
    process.env.REACT_APP_GITHUB_CLIENT_ID || "8b508ba452a263f604b4"

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
        isLoggedInHandler(true)
        getToken({ variables: { code: code } })
    }

    if (data && !isTouched) {
        isTouchedHandler(true);
        console.log(data)
        token = data.GithubAuth.token
        localStorage.setItem("token", token)
        props.history.push("/pathway")
    }

    console.log(code)

    return (
        <React.Fragment>
            <Navbar className={classes.navbar}>
                <Nav className={classes.navlinks}>
                    <Nav.Link href="#">
                        <img src={Menu} className={classes.apps} />
                    </Nav.Link>
                    <Nav.Link href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}>
                        <div className={classes.login}>
                            <img
                                className={classes.github}
                                src="https://ik.imagekit.io/m52sq26n4h/icons8-github-48__1_.png"
                            />
                            <text
                                // href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}
                                className={classes.text}
                            >
                                Login with GitHub
                            </text>
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </React.Fragment>
    )
}
export default withRouter(Header)
