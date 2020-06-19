import React, { Component } from 'react'

import StepDataEdit from './StepDataEdit/StepDataEdit'
import StepContentEdit from './StepContentEdit/StepContentEdit'

import classes from './StepEditArea.module.css'

class StepEditArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            heading: "This is a step",
            stepType: "Content",
            content: "# hello",
            timeLimit: 30
        }
    }

    stepUpdateHandler = (key, value) => {
        console.log(key, value)
        let newStateObj = {}
        newStateObj[key] = value
        this.setState(newStateObj)
    }

    render() {
        return (
            <div className={classes.StepEditArea}>
                <StepDataEdit
                    onStepDataUpdate={this.stepUpdateHandler}

                    heading={this.state.heading}
                    stepType={this.state.stepType}
                    timeLimit={this.state.timeLimit}
                />
                <StepContentEdit 
                    onContentChange={(content) => this.stepUpdateHandler('content', content)}
                    content={this.state.content}  
                />
            </div>
        )
    }
}

export default StepEditArea