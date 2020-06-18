import React, { Component } from 'react'

import StepDndList from '../../components/StepDndList/stepDndList'
import StepEditArea from '../../components/StepEditArea/StepEditArea'

import classes from './CreateEditPathway.module.css'


class CreateEditPathway extends Component {
    render() {
        return (
            <div className={classes.Content}>
                <div className={classes.EditArea}>
                    <StepEditArea />
                </div>
                <div className={classes.StepList}>
                    <StepDndList />
                </div>
            </div>
        )
    }
}

export default CreateEditPathway