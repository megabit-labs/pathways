import React, { Component } from "react";
import classes from "./Footer.module.css";
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className={classes.navbottom}>
        <footer className={classes.footer}>
          <div className={classes.leftfoot}>
            <a href="#">About</a>
            <Link to="/profile" >Profile</Link>
          </div>
          <div className={classes.rightfoot}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Settings</a>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
