import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useQuery, useMutation } from 'react-apollo'
import TextareaAutosize from 'react-textarea-autosize'
import { gql } from '@apollo/client';
import Toggle from '../../Toggle/Toggle'
import StepTag from '../../StepTag/stepTag'
import TimeInput from '../../TimeInput/timeInput'

import * as actions from '../../../store/actions'
import UPDATE_STEP from '../../../utils/mutations/updateStep'
import * as mutations from '../../../utils/mutations/updatePathway'

import classes from './StepDataEdit.module.css'

function StepDataEdit(props) {
    const stepTypes = ['CONTENT_STEP', 'PATHWAY_STEP', 'SHARED_STEP']
    const {
        selectedStep,
        selectStepForPreview,
        onStepDataUpdate,
        onSaveStep,
        stepType,
        typeId,
        shareId
    } = props

    const GET_CONTENT_ID = gql` {
        Step(id: "${shareId}") {
            id
            content {
                id
            }
        }
    }`
    
    const [updateStep] = useMutation(UPDATE_STEP)
    const [updatePathway] = useMutation(mutations.CREATE_UPDATE_PATHWAY)
    const {_, error, data} = useQuery(GET_CONTENT_ID)
    
    if(error) {console.log(error)}

    const updatePathwayStep = (newTypeId) => {
        const currentStep = props.steps[selectedStep]
        const updatedStep = {
            id: selectedStep,
            name: currentStep.heading,
            time: currentStep.timeLimit,
            index: currentStep.index,
            stepType: currentStep.stepType,
            typeId: newTypeId
        }

        updatePathway({
            variables: {
                id: props.pathwayId,
                name: props.pathwayName,
                description: props.pathwayDescription,
                tags: [],
                steps: updatedStep
            },
        })
        .then(res => {
            console.log(res)
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={classes.StepDataEdit}>
            <div className={classes.StepMetaEdit}>
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <Toggle
                        vals={stepTypes.map((val) => ({
                            component: <StepTag stepType={val} />,
                            value: val,
                        }))}
                        onValueChange={(value) =>
                            onStepDataUpdate('stepType', value)
                        }
                        initialValue={stepTypes.indexOf(props.stepType)}
                    />
                    <div
                        className={classes.ActionButton}
                        onClick={(e) => {
                            // console.log(selectedStep, props.heading, props.content, stepType, typeId)
                            e.preventDefault()
                            onSaveStep()
                            if(stepType === 'CONTENT_STEP') {
                                updateStep({
                                    variables: {
                                        id: typeId,
                                        title: props.heading,
                                        content: props.content,
                                    },
                                })
                                .then(res => {
                                    console.log(res)
                                })
                                .catch((err) => console.log(err))
                            } else {
                                let newTypeId = typeId
                                if(stepType === 'SHARED_STEP') {
                                    if(data.length === 0) {
                                        console.log("Incorrect step id")
                                        return
                                    }
                                    newTypeId = data.Step[0].content.id
                                    updatePathwayStep(newTypeId)
                                } else {
                                    updatePathwayStep(newTypeId)
                                }
                            }
                        
                        }}
                        role='button'
                        aria-hidden='true'
                    >
                        Save
                    </div>
                    <div
                        className={classes.ActionButton}
                        onClick={() => selectStepForPreview(selectedStep)}
                        aria-hidden='true'
                    >
                        Preview
                    </div>
                </div>
                <div
                    style={{
                        float: 'right',
                    }}
                    aria-hidden='true'
                >
                    <TimeInput
                        onValueChange={(value) =>
                            onStepDataUpdate('timeLimit', value)
                        }
                        value={props.timeLimit}
                    />
                </div>
            </div>
            <div className={classes.TitleInput}>
                <TextareaAutosize
                    onChange={(e) =>
                        onStepDataUpdate('heading', e.target.value)
                    }
                    value={props.heading}
                    maxRows={5}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedStep: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps,
        pathwayId: state.createEditPathway.pathwayId,
        pathwayName: state.createEditPathway.pathwayName,
        pathwayDescription: state.createEditPathway.pathwayDescription,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStepForPreview: (stepId) =>
            dispatch(actions.selectForPreview(stepId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepDataEdit)
