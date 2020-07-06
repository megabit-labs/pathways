import React from 'react'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize';

import Toggle from '../../Toggle/Toggle'
import StepTag from '../../StepTag/stepTag'
import TimeInput from '../../TimeInput/timeInput'

import * as actions from '../../../store/actions'

import classes from './StepDataEdit.module.css'

const stepDataEdit = (props) => {
    const stepTypes = ['Content', 'Pathway', 'Shared Step']
    // console.log(stepTypes.indexOf(props.stepType))
    
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
                        onValueChange={(value) => props.onStepDataUpdate("stepType", value)}
                        initialValue={stepTypes.indexOf(props.stepType)}
                    />
                    <div className={classes.ActionButton}>Save</div>
                    <div 
                        className={classes.ActionButton} 
                        onClick={props.selectStepForPreview(props.selectedStep)}
                    >
                        Preview
                    </div>
                </div>
                <div style={{
                    float: "right"
                }}>
                    <TimeInput 
                        onValueChange={(value) => props.onStepDataUpdate("timeLimit", value)}
                        value={props.timeLimit}
                    />
                </div>
            </div>
            <div className={classes.TitleInput}>
                <TextareaAutosize 
                    onChange={(e) => props.onStepDataUpdate("heading", e.target.value)}
                    value={props.heading}
                    maxRows={5}
                />
            </div>
        </div>
    )
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