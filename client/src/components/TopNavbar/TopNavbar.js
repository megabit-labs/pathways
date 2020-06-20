import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './TopNavbar.module.css';
import PathwaysIcon from '../../assets/logo.png'

const topNavbar = props => {
    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.iconContainer}>
                    <img src={PathwaysIcon} alt="pathwaysicon" style={{ height: '60%' }} />
                </div>
                <div className={classes.linksContainer}>
                    <Link className={classes.link}>Guides</Link>
                    <Link className={classes.link}>FAQs</Link>
                    <Link className={classes.link}>Subscribe</Link>
                </div>
            </div>
        </Fragment>
    );
};

export default topNavbar;