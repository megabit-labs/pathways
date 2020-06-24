import React, { Component } from "react";
import classes from "./Footer.module.css";
class Footer extends Component {
  render() {
    return (
      <div className={classes.navbottom}>
        <footer className={classes.footer}>
          <div className={classes.leftfoot}>
            <a href="#">About</a>
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
