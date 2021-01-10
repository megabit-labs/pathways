import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'

// import Rating from '../../Rating/Rating'
import StepTag from '../../StepTag/stepTag'

import DeleteIcon from 'react-ionicons/lib/IosTrash'
import EditIcon from 'react-ionicons/lib/IosCreateOutline'
import { FaGripVertical } from 'react-icons/fa'

import * as actions from '../../../store/actions/index'
import classes from './Step.module.css'


const getItemStyle = (isDragging, draggableStyle, selected = false) => {
    let variableStyles = {}

    if (isDragging) {
        variableStyles = {
            boxShadow: 'var(--heavy-shadow)'
        }
    } else {
        variableStyles = {
            boxShadow: 'var(--light-shadow)'
        }
    }

    if (selected) {
        variableStyles['boxShadow'] = 'var(--heavy-shadow)'
    }

    return {
        userSelect: "none",
        padding: '16px',
        margin: "0 0 16px 0",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '170px',
        borderRadius: 'var(--border-radius-l)',
        background: "white",
        cursor: 'pointer',
        ...variableStyles,
        ...draggableStyle,
    };
};

const step = (props) => {
    
    const content = props.heading.length < 40 ? props.heading
                                              : `${props.heading.slice(0, 40)}...`

    const selected = props.selected

    return (
        <Draggable
            key={props.id}
            draggableId={props.id.toString()}
            index={props.index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        selected
                    )}
                    onClick={() => props.onSelectStep(props.id)}
                >
                    <div className={classes.TopRow}>
                        <div className={classes.StepTitle}>
                            <p>{content}</p>
                        </div>

                        <div 
                            className={classes.DragHandle}
                            {...provided.dragHandleProps}
                        >
                            <FaGripVertical/>
                        </div>
                    </div>
                    
                    <div className={classes.Details}>
                        {/* <Rating value={props.rating}/> */}
                        
                        
                    </div>

                    
                    
                    <div className={classes.BottomRow}>
                        <StepTag value={props.stepType} />
                        <div 
                            className={classes.DeleteBtn}
                            onClick={() => props.onDeleteStep(props.id)}
                        >
                            <DeleteIcon color="#aaa" fontSize="30px"/>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteStep: (stepId) => dispatch(actions.deleteStep(stepId)),
        onSelectStep: (stepId) => dispatch(actions.selectForEditing(stepId))
    }
}

export default connect(null, mapDispatchToProps)(step)