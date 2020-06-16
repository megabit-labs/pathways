import React, {Component} from 'react';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import './Header.css'
import Menu from '../assets/menu.png'
import Icon from '../assets/icon.png'
class Header extends Component{

    render() {
        return(
<React.Fragment>
<Navbar className="navbar">
    <Nav className="navlinks">
        <Nav.Link href="#">
            <img
                src={Menu}
                className="apps"/>
        </Nav.Link>
        <Nav.Link href="#">
            <img
                src={Icon}
                className="dp"/>
        </Nav.Link>
    </Nav>
</Navbar>
</React.Fragment>
        );
    };
};
export default Header;