import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../Markdown/CodeBlock'

import * as actions from '../../store/actions/index'

import Aux from '../../hoc/Aux/Aux'
import StepDataEdit from './StepDataEdit/StepDataEdit'
import StepContentEdit from './StepContentEdit/StepContentEdit'

import classes from './StepEditArea.module.css'


const StepEditArea = (props) => {


    function stepUpdateHandler(key, value) {
        const newStateObj = {}
        newStateObj[key] = value
        this.setState(newStateObj)
    }

    const step = props.step

    let displayComponent = null
    if (props.selectedStep && props.isPreview) {
        const markdown = step.content
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
                    props.updateStep({
                        content: {$set: content}
                    })
                }
                content={step.content}
                selectedStepType={step.stepType}
            />
        )
    }

    let editAreaComponent = <div />
    if (step) {
        editAreaComponent = (
            <Aux>
                <StepDataEdit
                    step={step}
                    updateStep={props.updateStep}
                />
                {displayComponent}
            </Aux>
        )
    }
    return <div className={classes.StepEditArea}>{editAreaComponent}</div>
}


const mapDispatchToProps = (dispatch) => {
    return {
        onSaveToStore: (stepId, stepData) =>
            dispatch(actions.updateStep(stepId, stepData)),
    }
}

export default connect(null, mapDispatchToProps)(StepEditArea)
