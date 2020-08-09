import React, { useState } from 'react'

import classes from './ContentPreview.module.css'
import StepPreview from './StepPreview'
import PathwayPreview from './PathwayPreview'

function ContentPreview(props) {
    const [id, setId] = useState('')
    const [shouldDisplay, setDisplay] = useState(false)
    const { stepType } = props

    let displayComponent = null
    if (stepType === 'Shared Step') {
        displayComponent = <StepPreview stepId={id} />
    } else {
        displayComponent = <PathwayPreview pathwayId={id} />
    }

    return (
        <div style={{ marginLeft: '18px' }}>
            <div style={{ display: 'flex' }}>
                <input
                    className={classes.InputField}
                    placeholder='Enter ID of relevant component'
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />
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
