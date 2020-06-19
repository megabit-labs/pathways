import React, { Component } from 'react'
import { connect } from 'react-redux'

import StepDataEdit from './StepDataEdit/StepDataEdit'
import StepContentEdit from './StepContentEdit/StepContentEdit'

import classes from './StepEditArea.module.css'
import Aux from '../../hoc/Aux/Aux'

class StepEditArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            heading: "This is a step",
            stepType: "Content",
            content: "# hello",
            timeLimit: 30,
            stepId: ""
        }
        const step = this.props.steps[this.props.selectedStep]
        console.log(step)
    }

    componentDidMount() {
        const step = this.props.steps[this.props.selectedStep]
        console.log(step)
    }

    componentWillReceiveProps(next) {
        let newState = {}
        if (next.selectedStep === "") {
            return
        }

        newState.stepId = next.selectedStep
        const step = next.steps[next.selectedStep]
        delete step.selected
        newState = {
            ...newState,
            ...step
        }

        this.setState({ ...newState })
    }

    stepUpdateHandler = (key, value) => {
        console.log(key, value)
        let newStateObj = {}
        newStateObj[key] = value
        this.setState(newStateObj)
    }

    render() {
        let editAreaComponent = (<div></div>)
        if (this.state.stepId != "") {
            editAreaComponent = (
                <Aux>
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
                </Aux>
            )
        }
        return (
            <div className={classes.StepEditArea}>
                {editAreaComponent}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedStep: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps
    }
}

export default connect(mapStateToProps)(StepEditArea)