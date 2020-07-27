import React, { useState } from 'react'

import classes from './ContentPreview.modue.css'
import StepPreview from './StepPreview'
import PathwayPreview from './PathwayPreview'

function ContentPreview(props) {
    const [id, setId] = useState('')
    const { stepType } = props

    let displayComponent = null

    return (
        <div>
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
                        if (stepType === 'Shared Step') {
                            displayComponent = <StepPreview stepId={id} />
                        } else {
                            displayComponent = <PathwayPreview pathwayId={id} />
                        }
                    }}
                    aria-hidden='true'
                >
                    Done
                </div>

                {displayComponent}
            </div>
        </div>
    )
}

export default ContentPreview
