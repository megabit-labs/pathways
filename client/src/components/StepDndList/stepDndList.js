import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'

import Step from './Step/step'

import Button from '@material-ui/core/Button'

import PlusIcon from 'react-ionicons/lib/MdAdd'
import SaveIcon from 'react-ionicons/lib/IosCheckmarkCircleOutline'
import PreviewIcon from 'react-ionicons/lib/IosPlay'
import DownloadIcon from 'react-ionicons/lib/IosDownloadOutline'
import SettingsIcon from 'react-ionicons/lib/IosSettings'

import * as actions from '../../store/actions/index'

import classes from './StepDndList.module.css'
import generateId from '../../utils/generateId'
import * as mutations from '../../utils/mutations/updatePathway'
import UPDATE_STEP from '../../utils/mutations/updateStep'

const getListStyle = (isDraggingOver) => ({
    background: '#fafafa',
    width: '500px',
    overflowY: 'auto',
    height: '100%',
    paddingLeft: '10px',
    paddingRight: '30px',
    paddingTop: '20px',
    flex: '1 1 auto',
})


const StepDndList = (props) => {

    function handleClose (type, updatePathway=null, updateStep=null) {
        onAddBtnClick(type, updatePathway, updateStep)
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return
        }

        // from redux
        props.onReorderSteps(result)
    }

    function onAddBtnClick(type, updatePathway, updateStep) {
        const stepId = generateId("step")
        const contentId = generateId('content')
        const timeLimit = 30
        let stepName, stepType

        if (type === 'PATHWAY_STEP') {
            props.onAddStep({
                heading: 'This is a step',
                stepType: 'PATHWAY_STEP',
                id: stepId,
                timeLimit: timeLimit
            })
            stepName = 'Pathway Step'
            stepType = 'PATHWAY_STEP'
        } else if (type === 'CONTENT_STEP') {
            props.onAddStep({
                heading: 'This is a step',
                stepType: 'CONTENT_STEP',
                id: stepId,
                timeLimit: timeLimit,
                typeId: contentId
            })
            stepName = 'Content Step'
            stepType = 'CONTENT_STEP'
        } else if (type === 'SHARED_STEP') {
            props.onAddStep({
                heading: 'This is a step',
                stepType: 'SHARED_STEP',
                id: stepId,
                timeLimit: timeLimit
            })
            stepName = 'Shared Step'
            stepType = 'SHARED_STEP'
        }
        
        const newStep = {
            id: stepId,
            name: stepName,
            time: timeLimit,
            index: Object.keys(props.pathway.steps).length,
            stepType: stepType,
            typeId: ""
        }

        if(type === 'CONTENT_STEP' && updateStep) {
            
            updateStep({
                variables: {
                    id: contentId,
                    title: 'This is a step',
                    content: 'Step Content',
                },
            })
            .then(res => {
                console.log(res)
                newStep["typeId"] = contentId
                addNewStep(newStep, updatePathway)
            })
            .catch((err) => console.log(err))
            
        } else {
            addNewStep(newStep, updatePathway)
        }

    }

    function addNewStep(newStep, updatePathway) {
        if(updatePathway) {
            updatePathway({variables: {
                id: props.pathway.id,
                name: props.pathway.name,
                steps: [newStep],
                tags: props.pathway.tags,
                description: props.pathway.description
            }})
            .then( res => {
                console.log(res)
            })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e)))
            })
        }
    }

    function setPathwayDetails() {
        props.showPathwayDetailsScreen()
    }

    const stepData = props.pathway.steps
    const steps = props.pathway.stepOrder.map((stepId, index) => {
        const currentStep = stepData[stepId]
        return (
            <Step
                key={index}
                id={stepId}
                index={index}
                heading={currentStep.heading}
                stepType={currentStep.stepType}
                selected={currentStep.id === props.selectedStep}
                rating={currentStep.rating}
                onSelect={() => props.onSelectStep(currentStep.id)}
            />
        )
    })

    return (
        <div className={classes.ControlsArea}>
            <div className={classes.StepListArea}>
                <div className={classes.StepListTitle}>
                    <div>STEPS</div>
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        // onClick={handleClick}
                    >
                        <PlusIcon fontSize='30px' color='#555' />
                    </Button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='myNiggaThatsCrazy'>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(
                                    snapshot.isDraggingOver
                                )}
                            >
                                {steps}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className={classes.MoreControls}>
                <div>
                    <div className={classes.MoreControlsIcon}>
                        <SaveIcon fontSize='50px' color='#102e4a' />
                    </div>
                    <div
                        className={classes.MoreControlsIcon}
                        onClick={setPathwayDetails}
                    >
                        <SettingsIcon fontSize='50px' color='#102e4a' />
                    </div>
                    <div className={classes.MoreControlsIcon}>
                        {/* Clicking on this icon should render a preview of the pathway */}
                        <PreviewIcon fontSize='50px' color='#102e4a' />
                    </div>
                </div>
                <div>
                    <div className={classes.MoreControlsIcon}>
                        <DownloadIcon fontSize='50px' color='#102e4a' />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddStep: (stepData) => dispatch(actions.addStep(stepData))
    }
}

export default connect(null, mapDispatchToProps)(StepDndList)
