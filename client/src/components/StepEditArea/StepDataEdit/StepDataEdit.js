import React from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import TextareaAutosize from 'react-textarea-autosize'

import Toggle from '../../Toggle/Toggle'
import StepTag from '../../StepTag/stepTag'
import TimeInput from '../../TimeInput/timeInput'

import * as actions from '../../../store/actions'

import classes from './StepDataEdit.module.css'

const UPDATE_STEP = gql`
    mutation($id: String!, $title: String, $content: String) {
        createUpdateContent(id: $id, title: $title, content: $content) {
            status
            message
        }
    }
`

function StepDataEdit(props) {
    const stepTypes = ['Content', 'Pathway', 'Shared Step']
    const {
        selectedStep,
        selectStepForPreview,
        onStepDataUpdate,
        onSaveStep,
        stepType,
    } = props
    const [updateStep] = useMutation(UPDATE_STEP)

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
                            e.preventDefault()
                            onSaveStep()
                            updateStep({
                                variables: {
                                    id: selectedStep,
                                    title: props.heading,
                                    content: props.content,
                                },
                            }).catch((err) => console.log(err))
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStepForPreview: (stepId) =>
            dispatch(actions.selectForPreview(stepId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepDataEdit)
