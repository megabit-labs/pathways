import React, {Component} from 'react';
import './Footer.css'
class Footer extends Component{

    render() {
        return(
            <div className="navbottom">
                <footer className="footer">
                    <div className="leftfoot">
                        <a href="#">About</a>
                    </div>
                    <div className="rightfoot">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Settings</a>
                    </div>
                </footer>
            </div>
        );
    };
};
export default Footer;