import React, { Component } from 'react'

import TabBar from './TabBar/TabBar'

import classes from './DashboardContent.module.css'

class DashboardContent extends Component {
    render() {
        return (
            <div className={classes.Main}>
                <TabBar />
            </div>
        )
    }
}

export default DashboardContent