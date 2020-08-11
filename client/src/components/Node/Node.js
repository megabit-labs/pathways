import React from 'react'

import classes from './Node.module.css'
import MdTime from 'react-ionicons/lib/MdTime'

const Node = (props) => {
    let circleClasses = [classes.circle]

    if (props.active) {
        circleClasses.push(classes.active)
    } else {
        circleClasses.push(classes.inactive)
    }

    const showStep = (event) => {
        props.clicked(event)
    }

    const display = (
        <div className={classes.circleContainer}>
            <div
                className={circleClasses.join(' ')}
                onClick={(event) => showStep(event)}
            >
                <div>{props.step.name}</div>
                <div className={classes.timeDisplay}>
                    <MdTime
                        fontSize='20px'
                        color='#1A4058'
                    />
                    <div style={{ height: '100%', width: '0.5vw' }}></div>
                    {props.step.time}min
                </div>
            </div>
        </div>
    )

    return display
}

export default Node
