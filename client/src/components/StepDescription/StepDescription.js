import React from 'react'
import ReactMarkdown from 'react-markdown'

import classes from './StepDescription.module.css'

const StepDescription = (props) => {
    const markdown = props.step.content.content

    let display
    if (props.step) {
        display = (
            <div className={classes.container}>
                <div className={classes.heading}>{props.step.content.title}</div>
                <div className={classes.textContainer}>
                    <ReactMarkdown source={markdown} />
                </div>
            </div>
        )
    } else {
        display = null
    }

    return display
}

export default StepDescription
