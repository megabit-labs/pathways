import React, { Component } from "react"
import { Navbar, Nav, NavLink, Button } from "react-bootstrap"
import classes from "./Header.module.css"
import Menu from "../assets/menu.png"

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar className={classes.navbar}>
                    <Nav className={classes.navlinks}>
                        <Nav.Link href="#">
                            <img src={Menu} className={classes.apps} />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <button className={classes.login}>
                                <img
                                    className={classes.github}
                                    src="https://ik.imagekit.io/m52sq26n4h/icons8-github-48__1_.png"
                                />
                               <text className={classes.text}>Login with GitHub</text> 
                            </button>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </React.Fragment>
        )
    }
}
export default Header
