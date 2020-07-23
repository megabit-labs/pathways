import React from 'react'
import { connect } from 'react-redux'

import Tab from './Tab/Tab'

import classes from './TabBar.module.css'

const tabBar = (props) => {

    const tabs = ["Ongoing", "Created", "Completed"].map((name, i) => {
        return <Tab 
            name={name}
            active={props.activeTab === name}
            key={i}
        />
    })

    return (
        <div className={classes.TabBar}>
            {tabs}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        activeTab: state.dashboard.activeTab
    }
}

export default connect(mapStateToProps)(tabBar)