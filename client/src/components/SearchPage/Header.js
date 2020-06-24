import React, {Component} from 'react';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import classes from './Header.module.css'
import Menu from '../assets/menu.png'
import Icon from  '../assets/icon.png' 
   
class Header extends Component{

    render() {
        return(
<React.Fragment>
<Navbar className={classes.navbar}>
    <Nav className={classes.navlinks}>
        <Nav.Link href="#">
            <img
                src={Menu}
                className={classes.apps}/>
        </Nav.Link>
        <Nav.Link href="#">
            <img
                src={Icon}
                className={classes.dp}/>
        </Nav.Link>
    </Nav>
</Navbar>
</React.Fragment>
        );
    };
};
export default Header;