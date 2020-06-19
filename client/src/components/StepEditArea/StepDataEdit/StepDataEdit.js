import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import Toggle from '../../Toggle/Toggle'
import StepTag from '../../StepTag/stepTag'
import TimeInput from '../../TimeInput/timeInput'

import classes from './StepDataEdit.module.css'

const stepDataEdit = (props) => {
    const stepTypes = ['Content', 'Pathway', 'Shared Step']

    return (
        <div className={classes.StepDataEdit}>
            <div className={classes.StepMetaEdit}>
                <Toggle
                    vals={stepTypes.map((val) => ({
                        component: (<StepTag stepType={val} />),
                        value: val
                    }))}
                    onValueChange={(value) => props.onStepDataUpdate("stepType", value)}
                    initialValue={stepTypes.indexOf(props.stepType)}
                />
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

export default stepDataEdit