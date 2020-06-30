import React, { useState, useEffect } from "react"
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import StepDndList from "../../components/StepDndList/stepDndList"
import StepEditArea from "../../components/StepEditArea/StepEditArea"

import classes from "./CreateEditPathway.module.css"

const CreateEditPathway = (props) => {

    useEffect(() => {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e))
    },[])

    handleKeyDown = (event) => {
        let charCode = String.fromCharCode(event.which).toLowerCase()
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
            event.preventDefault()
            console.log('User tried to save')
        }
    }

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

export default CreateEditPathway
