import React, { Component } from 'react'

import StepDndList from '../../components/StepDndList/stepDndList'

import classes from './CreateEditPathway.module.css'


class CreateEditPathway extends Component {
    render() {
        return (
            <div className={classes.Content}>
                <div className={classes.EditArea}>
                    EditArea
                </div>
                <div className={classes.StepList}>
                    <StepDndList />
                </div>
            </div>
        )
    }
}

export default CreateEditPathway