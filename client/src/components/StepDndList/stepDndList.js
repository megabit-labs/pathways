import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from 'react-redux'

import Step from "./Step/step";
import PlusIcon from 'react-ionicons/lib/MdAdd'

import * as actions from '../../store/actions/index'

import classes from './StepDndList.module.css'



const getListStyle = (isDraggingOver) => ({
    background: "#fafafa",
    width: "500px",
    overflowY: "auto",
    height: "100%",
    paddingLeft: "10px",
    paddingRight: "30px",
    paddingTop: "20px",
    flex: "1 1 auto"
});

/**
 * But...but...
 * class based components are so easy to use!
 */
class StepDndList extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        // from redux
        this.props.onReorderSteps(result)
    }

    onAddBtnClick = () => {
        this.props.onAddStep({
            content: 'This is a step',
            stepType: 'Content',
            id: `${Math.random()}`
        })
    }

    render() {
        const stepData = this.props.steps
        console.log(this.props.stepOrder)
        const steps = this.props.stepOrder.map((stepId, index) => (
            <Step
                key={index}
                id={stepId}
                index={index}
                content={stepData[stepId].content}
                stepType={stepData[stepId].stepType}
            />
        ))

        return (
            <div className={classes.ControlsArea}>
                <div className={classes.StepListArea}>

                    <div className={classes.StepListTitle}>
                        <p style={{fontSize: "40px"}}>Steps</p>
                        <div 
                            className={classes.AddBtn}
                            onClick={this.onAddBtnClick}
                        >
                            <PlusIcon fontSize="30px" color="#555" />
                        </div>
                    </div>

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="myNiggaThatsCrazy">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {steps}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                </div>
                <div className={classes.MoreControls}>
                    More
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddStep: (stepData) => dispatch(actions.addStep(stepData)),
        onReorderSteps: (result) => dispatch(actions.reorderSteps(result))
    }
}

const mapStateToProps = (state) => {
    return {
        stepOrder: state.createEditPathway.stepOrder,
        steps: state.createEditPathway.steps
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepDndList);
