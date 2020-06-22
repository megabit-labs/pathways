import React, { useState } from 'react'

import classes from './Toggle.module.css'

const Toggle = (props) => {
    const len = props.vals.length
    const [index, setIndex] = useState(props.initialValue)

    // TODO - Ask Shreyans if this is an anti-pattern.
    if (index != props.initialValue) {
        setIndex(props.initialValue)
    }

    const handleDivClick = () => {
        if (index === len - 1) {
            setIndex(0)
            props.onValueChange(props.vals[0].value)
        } else {
            setIndex(index + 1)
            props.onValueChange(props.vals[index + 1].value)
        }
    }

    return (
        <div 
            onClick={handleDivClick}
            className={classes.Option}  
        >
            {props.vals[index].component}
        </div>
    )
}

export default Toggle