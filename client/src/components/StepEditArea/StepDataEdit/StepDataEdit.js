import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize';

import Toggle from '../../Toggle/Toggle'
import StepTag from '../../StepTag/stepTag'
import TimeInput from '../../TimeInput/timeInput'

import * as actions from '../../../store/actions'

import classes from './StepDataEdit.module.css'

class stepDataEdit extends Component {
    render() {
        const stepTypes = ['Content', 'Pathway', 'Shared Step']
        const {selectedStep, selectStepForPreview, onStepDataUpdate} = this.props
        return (
            <div className={classes.StepDataEdit}>
                <div className={classes.StepMetaEdit}>
                    <div style={{
                        display: "flex"
                    }}>
                        <Toggle
                            vals={stepTypes.map((val) => ({
                                component: (<StepTag stepType={val} />),
                                value: val
                            }))}
                            onValueChange={(value) => onStepDataUpdate("stepType", value)}
                            initialValue={stepTypes.indexOf(this.props.stepType)}
                        />
                        <div className={classes.ActionButton}>Save</div>
                        <div 
                            className={classes.ActionButton} 
                            onClick={() => selectStepForPreview(selectedStep)}
                        >
                            Preview
                        </div>
                    </div>
                    <div style={{
                        float: "right"
                    }}>
                        <TimeInput 
                            onValueChange={(value) => onStepDataUpdate("timeLimit", value)}
                            value={this.props.timeLimit}
                        />
                    </div>
                </div>
                <div className={classes.TitleInput}>
                    <TextareaAutosize 
                        onChange={(e) => onStepDataUpdate("heading", e.target.value)}
                        value={this.props.heading}
                        maxRows={5}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedStep: state.createEditPathway.selectedStep,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStepForPreview: (stepId) => dispatch(actions.selectForPreview(stepId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(stepDataEdit)