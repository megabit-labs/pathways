import React, { useState, useEffect } from "react"
import {connect} from "react-redux"
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

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
    const [updateStep, {data}] = useMutation(UPDATE_STEP)

    useEffect(() => {
        window.addEventListener('keydown', (e) => handleKeyDown(e))
    },[])

    const handleKeyDown = (event) => {
        const {stepID, steps} = props
        console.log(steps[stepID]["heading"])
        let charCode = String.fromCharCode(event.which).toLowerCase()
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
            event.preventDefault()
            // console.log('User tried to save')
            // console.log(steps[stepID]["heading"])
            let heading = steps[stepID]["heading"]            
            let content = steps[stepID]["content"]            
            updateStep({variables: {
                id: stepID,
                title: heading,
                content: content,
            }})
        }
    }

    return (
        <div 
            className={classes.Content}
            onKeyDown={(e) => handleKeyDown(e)}
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

const mapStateToProps = state => {
    return {
        stepID: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps
    }
}

export default connect(mapStateToProps)(CreateEditPathway)
