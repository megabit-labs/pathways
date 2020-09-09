import React from 'react'
import {Link} from 'react-router-dom'

import classes from './Navbar.module.css'

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <ul className={classes.navbar}>
                    <li>
                        <Link to="/" >Pathways</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Navbar
