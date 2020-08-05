import React from 'react'
import { Component } from 'react'
import classes from'./SubNavbar.module.css'

class SubNavbar extends Component {
    render() {
        return (
            <div className={classes.navbar}>
                <ul className={classes.link}>
                    <li>
                        <a>Community</a>
                    </li>
                    <li>
                        <a>Documentation</a>
                    </li>
                    <li>
                        <a>Pricing</a>
                    </li>
                    <li>
                        <a>Products</a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default SubNavbar
