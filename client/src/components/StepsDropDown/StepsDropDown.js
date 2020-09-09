import React, { Component } from 'react'

import classes from './StepsDropDown.module.css'

class StepsDropDown extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log("hello  ")
    return (this.props.myref.current !== nextProps.myref.current)
  }

    render() {
        console.log(this.props.myref)
        let pos = this.props.myref.current ? 1 : 0;
        console.log(pos)
        return <div className={classes.DropDown}></div>
    }
}

export default StepsDropDown
