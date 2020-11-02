import React, { useState } from 'react'

import classes from './ContentPreview.module.css'
import StepPreview from './StepPreview'
import PathwayPreview from './PathwayPreview'

function ContentPreview(props) {
    const [pathwayId, setPathwayId] = useState('');
    const [stepId, setStepId] = useState('');
    const [shouldDisplay, setDisplay] = useState(false)
    const { stepType } = props

    let displayComponent = null
    if (stepType === 'SHARED_STEP') {
        displayComponent = <StepPreview stepId={stepId} />
    } else {
        displayComponent = <PathwayPreview pathwayId={pathwayId} />
    }

    return (
        <div style={{ marginLeft: '18px' }}>
            <div style={{ display: 'flex' }}>
                {stepType === 'SHARED_STEP' ? (
                    <input
                        className={classes.InputField}
                        placeholder='Enter ID of Step'
                        onChange={(e) => {
                            setStepId(e.target.value)
                            props.onValueChange(e.target.value, 'shareId')
                        }}
                        value={stepId}
                    />
                ) : (
                    <input
                        className={classes.InputField}
                        placeholder='Enter ID of relevant component'
                        onChange={(e) => {
                            setPathwayId(e.target.value)
                            props.onValueChange(e.target.value, 'shareId')
                        }}
                        value={pathwayId}
                    />
                )}
                <div
                    className={classes.ActionButton}
                    onClick={(e) => {
                        e.preventDefault()
                        setDisplay(true)
                    }}
                    aria-hidden='true'
                >
                    Done
                </div>
            </div>
            <div className={classes.PreviewContainer}>
                {shouldDisplay ? displayComponent : null}
            </div>
        </div>
    )
}

export default ContentPreview
