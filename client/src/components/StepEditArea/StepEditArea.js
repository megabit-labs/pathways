import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../Markdown/CodeBlock'

import * as actions from '../../store/actions/index'

import Aux from '../../hoc/Aux/Aux'
import StepDataEdit from './StepDataEdit/StepDataEdit'
import StepContentEdit from './StepContentEdit/StepContentEdit'

import classes from './StepEditArea.module.css'

/**
 * I'm scared.
 * This component gets the step being edited from redux. Once
 * it has the state, it will communicate no more with redux and
 * all state will be managed locally from here on.
 *
 * Then whenever any new props as passed to this component,
 * it will push all the state it has to redux again. This ensures
 * that if someone changes the step they are editing without
 * saving the current step, that progress isn't lost.
 */
class StepEditArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            heading: 'This the heading',
            stepType: 'Content',
            content: 'This is the content',
            timeLimit: 30,
            stepId: '',
        }
    }

    // eslint-disable-next-line
    componentWillReceiveProps(next) {
        let newState = {}

        // The second conditional is to make sure that
        // we don't get stuck into an infinite loop, (since
        // saveStepDataToStore is going to trigger this
        // function again)
        if (
            next.selectedStep === '' ||
            next.selectedStep === this.state.stepId
        ) {
            return
        }

        if (this.state.stepId !== '') {
            this.saveStepDataToStore()
        }

        newState.stepId = next.selectedStep
        const step = next.steps[next.selectedStep]

        newState = {
            ...newState,
            ...step,
        }

        delete newState.selected

        this.setState({ ...newState })
    }

    saveStepDataToStore = () => {
        const stepData = { ...this.state }
        delete stepData.stepId

        this.props.onSaveToStore(this.state.stepId, stepData)
    }

    stepUpdateHandler = (key, value) => {
        const newStateObj = {}
        newStateObj[key] = value
        this.setState(newStateObj)
    }

    render() {
        const { steps, selectedStep } = this.props

        let displayComponent = null
        if (selectedStep && steps[selectedStep].isPreview) {
            const markdown = this.state.content
            displayComponent = (
                <ReactMarkdown
                    source={markdown}
                    escapeHtml={false}
                    renderers={{ code: CodeBlock }}
                />
            )
        } else {
            displayComponent = (
                <StepContentEdit
                    onContentChange={(content) =>
                        this.stepUpdateHandler('content', content)
                    }
                    content={this.state.content}
                    selectedStepType={this.state.stepType}
                />
            )
        }

        let editAreaComponent = <div />
        if (this.state.stepId !== '') {
            editAreaComponent = (
                <Aux>
                    <StepDataEdit
                        onStepDataUpdate={this.stepUpdateHandler}
                        heading={this.state.heading}
                        content={this.state.content}
                        stepType={this.state.stepType}
                        timeLimit={this.state.timeLimit}
                        onSaveStep={this.saveStepDataToStore}
                    />
                    {displayComponent}
                </Aux>
            )
        }
        return <div className={classes.StepEditArea}>{editAreaComponent}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedStep: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveToStore: (stepId, stepData) =>
            dispatch(actions.updateStep(stepId, stepData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepEditArea)
