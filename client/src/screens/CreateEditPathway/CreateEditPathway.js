import React, { useState, useEffect } from "react"
import {connect} from "react-redux"
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import ReactMarkdown from 'react-markdown'

import StepDndList from "../../components/StepDndList/stepDndList"
import StepEditArea from "../../components/StepEditArea/StepEditArea"

import classes from "./CreateEditPathway.module.css"
import step from "../../components/StepDndList/Step/step"

const UPDATE_STEP = gql`
    mutation($id: String, $title: String, $content: String) {
        createUpdateContent(id: $id, title: $title, content: $content) {
            status,
            message
        }
    }
`

const CreateEditPathway = (props) => {
    const [updateStep, { data }] = useMutation(UPDATE_STEP)
    const { stepId, steps } = props

    const content = null
    if (steps[stepId]["isPreview"]) {
        const markdown = steps[stepId]["content"]
        content = (
            <ReactMarkdown source={markdown} />
        )
    } else {
        content = (
            <div className={classes.Content}>
                <div className={classes.EditArea}>
                    <StepEditArea />
                </div>
                <div className={classes.StepList}>
                    <StepDndList />
                </div>
            </div>            
        )
    }

    return {content}
}

const mapStateToProps = state => {
    return {
        stepId: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps
    }
}

export default connect(mapStateToProps)(CreateEditPathway)
