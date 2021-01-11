import React from 'react'
import { FaRegClock } from 'react-icons/fa'

import classes from './timeInput.module.css'

const timeInput = (props) => {
    return (
        <div className={classes.TimeInput}>
            <FaRegClock />
            <input 
                type="number"
                onChange={(e) => props.onValueChange(e.target.value)}
                value={props.value}
            ></input> min
        </div>
    )
}

export default timeInput