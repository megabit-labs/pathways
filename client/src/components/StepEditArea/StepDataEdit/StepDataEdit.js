import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import Toggle from '../../Toggle/Toggle'
import StepTag from '../../stepTag/stepTag'

import classes from './StepDataEdit.module.css'

const stepDataEdit = (props) => {
    return (
        <div className={classes.StepDataEdit}>
            <div className={classes.StepMetaEdit}>
                <Toggle
                    vals={['Content', 'Pathway', 'Shared Step'].map((val) => ({
                        component: (<StepTag stepType={val} />),
                        value: val
                    }))}
                    onValueChange={props.onStepTypeChange}
                />
            </div>
            <div className={classes.TitleInput}>
                <TextareaAutosize 
                    onChange={props.onHeadingChange}
                    value={props.value}
                    maxRows={5}
                />
            </div>
        </div>
    )
}

export default stepDataEdit