import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import classes from './StepDataEdit.module.css'

const stepDataEdit = (props) => {
    return (
        <div className={classes.StepDataEdit}>
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