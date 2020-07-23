import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../store/actions/index'

import classes from './Tab.module.css'

const tab = (props) => {    
    const styles = [classes.Tab]

    if (props.active) {
        styles.push(classes.Active)
    }
    
    return (
        <div 
            className={styles.join(' ')}
            onClick={() => props.onTabClick(props.name)}
        >
            {props.name}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTabClick: (name) => dispatch(actions.changeTab(name))
    }
}

export default connect(null, mapDispatchToProps)(tab)