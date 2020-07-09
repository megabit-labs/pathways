import React, { Component } from "react"
import {connect} from "react-redux"

import StepDndList from "../../components/StepDndList/stepDndList"
import StepEditArea from "../../components/StepEditArea/StepEditArea"

import classes from "./CreateEditPathway.module.css"
import step from "../../components/StepDndList/Step/step"

class CreateEditPathway extends Component {
    render() {
        const { stepId, steps } = this.props
    
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

const mapStateToProps = state => {
    return {
        stepId: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps
    }
}

export default connect(mapStateToProps)(CreateEditPathway)
