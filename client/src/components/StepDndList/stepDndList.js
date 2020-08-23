import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import Step from './Step/step'
import NumberStat from '../NumberStat/NumberStat'

import PlusIcon from 'react-ionicons/lib/MdAdd'
import SaveIcon from 'react-ionicons/lib/IosCheckmarkCircleOutline'
import PreviewIcon from 'react-ionicons/lib/IosPlay'
import DownloadIcon from 'react-ionicons/lib/IosDownloadOutline'
import SettingsIcon from 'react-ionicons/lib/IosSettings'
import StepsDropDown from '../StepsDropDown/StepsDropDown'

import * as actions from '../../store/actions/index'

import classes from './StepDndList.module.css'

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

/**
 * But...but...
 * class based components are so easy to use!
 */
class StepDndList extends Component {
    constructor(props) {
        super(props)
        this.onDragEnd = this.onDragEnd.bind(this)
        this.plusIconRef = React.createRef()
    }

    onDragEnd(result) {
        if (!result.destination) {
            return
        }

        // from redux
        this.props.onReorderSteps(result)
    }

    onAddBtnClick = () => {
        this.props.onAddStep({
            heading: 'This is a step',
            stepType: 'Content',
            id: `${Math.random()}`,
        })
    }

    setPathwayDetails = () => {
        this.props.showPathwayDetailsScreen()
    }

    getParentSize() {
        return (
            (this.plusIconRef &&
                this.plusIconRef.current &&
                this.plusIconRef.current.offsetTop) ||
            0
        )
    }

    render() {
        const stepData = this.props.steps
        const steps = this.props.stepOrder.map((stepId, index) => {
            const currentStep = stepData[stepId]
            return (
                <Step
                    key={index}
                    id={stepId}
                    index={index}
                    heading={currentStep.heading}
                    stepType={currentStep.stepType}
                    selected={currentStep.selected}
                    rating={currentStep.rating}
                    selected={currentStep.selected}
                />
            )
        })

        return (
            <div className={classes.ControlsArea}>
                <StepsDropDown myref={this.plusIconRef} />
                <div className={classes.StepListArea}>
                    <div className={classes.StepListTitle}>
                        <p style={{ fontSize: '40px' }}>Steps</p>
                        <div
                            ref={this.plusIconRef}
                            className={classes.AddBtn}
                            onClick={this.onAddBtnClick}
                        >
                            <PlusIcon fontSize='30px' color='#555' />
                        </div>
                    </div>

                    <DragDropContext onDragEnd={this.onDragEnd}>
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
                            onClick={this.setPathwayDetails}
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
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddStep: (stepData) => dispatch(actions.addStep(stepData)),
        onReorderSteps: (result) => dispatch(actions.reorderSteps(result)),
    }
}

const mapStateToProps = (state) => {
    return {
        stepOrder: state.createEditPathway.stepOrder,
        steps: state.createEditPathway.steps,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepDndList)
