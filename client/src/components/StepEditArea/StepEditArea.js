import React, { Component } from 'react'

import StepDataEdit from './StepDataEdit/StepDataEdit'
import StepContentEdit from './StepContentEdit/StepContentEdit'

import classes from './StepEditArea.module.css'

class StepEditArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "# hello"
        }
    }

    contentChangeHandler = (content) => {
        this.setState({ content: content })
    }

    render() {
        return (
            <div className={classes.StepEditArea}>
                <StepDataEdit />
                <StepContentEdit 
                    onContentChange={this.contentChangeHandler}
                    content={this.state.content}  
                />
            </div>
        )
    }
}

export default StepEditArea