import React from 'react'

import classes from './stepTag.module.css'

const stepTag = (props) => {
    return (
        <div className={classes.StepTag}>
            {props.value.split('_').join(' ')}
        </div>
    )
}

export default stepTag