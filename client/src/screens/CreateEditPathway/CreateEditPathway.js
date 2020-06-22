import React, { Component } from "react"

import StepDndList from "../../components/StepDndList/stepDndList"
import StepEditArea from "../../components/StepEditArea/StepEditArea"

import classes from "./CreateEditPathway.module.css"

class CreateEditPathway extends Component {

    componentDidMount() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e))
    }

    handleKeyDown = (event) => {
        let charCode = String.fromCharCode(event.which).toLowerCase()
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
            event.preventDefault()
            console.log('User tried to save')
        }
    }

    render() {
        return (
            <div 
                className={classes.Content}
                onKeyDown={this.handleKeyDown}
            >
                <div className={classes.EditArea}>
                    <StepEditArea />
                </div>
                <div className={classes.StepList}>
                    <StepDndList />
                </div>
            </div>
        )
    }
}

export default CreateEditPathway
