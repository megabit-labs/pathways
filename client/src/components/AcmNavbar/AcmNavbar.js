import React from 'react';

import classes from './AcmNavbar.module.css';
import acm_logo from '../../assets/acm_logo.png';
import acm_logo_text from '../../assets/acm_logo_text.png';
import facebook from '../../assets/facebook.png';
import github from '../../assets/github.png';
import instagram from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';

const AcmNavbar = props => {
    return (
        <div className={classes.container}>
            <div className={classes.ACMLogo}>
                <img src={acm_logo} alt="acm_logo" className={classes.ACMLogoImg} />
                <img src={acm_logo_text} alt="acm_logo" className={classes.ACMLogoText} />
            </div>
            <div className={classes.iconsContainer}>
                <img className={classes.icon} src={facebook} alt="facebook" />
                <img className={classes.icon} src={instagram} alt="instagram" />
                <img className={classes.icon} src={linkedin} alt="linkedin" />
                <img className={classes.icon} src={github} alt="github" />
            </div>
        </div>
    );
};

export default AcmNavbar;