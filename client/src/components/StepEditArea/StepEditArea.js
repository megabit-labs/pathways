import React, { Component } from 'react'

import StepDataEdit from './StepDataEdit/StepDataEdit'
import StepContentEdit from './StepContentEdit/StepContentEdit'

import classes from './StepEditArea.module.css'

class StepEditArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            heading: "This is a step",
            content: "# hello"
        }
    }

    contentChangeHandler = (content) => {
        this.setState({ content: content })
    }

    headingChangeHandler = (event) => {
        this.setState({ heading: event.target.value })
    }

    render() {
        return (
            <div className={classes.StepEditArea}>
                <StepDataEdit
                    onHeadingChange={this.headingChangeHandler}
                    value={this.props.heading}
                />
                <StepContentEdit 
                    onContentChange={this.contentChangeHandler}
                    content={this.state.content}  
                />
            </div>
        )
    }
}

export default StepEditArea