import React from 'react'
import { Component } from 'react'
import classes from './Navbar.module.css'

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <ul className={classes.navbar}>
                    <li>
                        <a href='#'>Pathways</a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Navbar
