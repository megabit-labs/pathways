import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'
import TextareaAutosize from 'react-textarea-autosize'
import { gql } from '@apollo/client';
import Toggle from '../../Toggle/Toggle'
import StepTag from '../../StepTag/stepTag'
import TimeInput from '../../TimeInput/timeInput'

import * as actions from '../../../store/actions'
import UPDATE_STEP from '../../../utils/mutations/updateStep'
import * as mutations from '../../../utils/mutations/updatePathway'

import classes from './StepDataEdit.module.css'

const StepTypeToggle = (props) => {
    return (
        <div className={classes.StepTypeToggle}>
            {props.value.split('_').join(' ')}
        </div>
    )
}

function StepDataEdit(props) {
    const stepTypes = ['CONTENT_STEP', 'PATHWAY_STEP', 'SHARED_STEP']
    const {
        selectedStep,
        selectStepForPreview,
        heading,
        stepType,
        timeLimit
    } = props.step

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
                            component: <StepTypeToggle value={val} />,
                            value: val,
                        }))}
                        onValueChange={(value) =>
                            props.updateStep({
                                stepType: {$set: value}
                            })
                        }
                        initialValue={stepTypes.indexOf(stepType)}
                    />
                    <TimeInput
                        onValueChange={(value) =>
                            props.updateStep({
                                timeLimit: {$set: value}
                            })
                        }
                        value={timeLimit}
                    />
                </div>
                {/* <div
                    style={{
                        float: 'right',
                    }}
                    aria-hidden='true'
                >
                    
                </div> */}
            </div>
            <div className={classes.TitleInput}>
                <TextareaAutosize
                    onChange={(e) =>
                        props.updateStep({
                            heading: {$set: e.target.value}
                        })
                    }
                    value={heading}
                    maxRows={5}
                />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStepForPreview: (stepId) =>
            dispatch(actions.selectForPreview(stepId)),
    }
}

export default connect(null, mapDispatchToProps)(StepDataEdit)
