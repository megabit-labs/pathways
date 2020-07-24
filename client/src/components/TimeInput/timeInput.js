import React from 'react'
import ClockIcon from 'react-ionicons/lib/IosTimeOutline'

import classes from './timeInput.module.css'

const timeInput = (props) => {
    return (
        <div className={classes.TimeInput}>
            <ClockIcon />
            <input 
                type="number"
                onChange={(e) => props.onValueChange(e.target.value)}
                value={props.value}
            ></input> min
        </div>
    )
}

export default timeInput