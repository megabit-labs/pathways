import React from 'react';
import {Component} from 'react';
import classes from "./Navbar.module.css"

class Navbar extends Component{
    render(){
        return(

            <div>

                <div className={classes.navbar}>
                    <ul className={classes.navs}>
                        <div className={classes.conatiner}>
                            <p className={classes.pathways}>Pathways</p>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;