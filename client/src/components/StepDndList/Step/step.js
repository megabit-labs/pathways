import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'

// import Rating from '../../Rating/Rating'
import StepTag from '../../StepTag/stepTag'

import DeleteIcon from 'react-ionicons/lib/IosTrash'
import EditIcon from 'react-ionicons/lib/IosCreateOutline'

import * as actions from '../../../store/actions/index'
import classes from './Step.module.css'


const getItemStyle = (isDragging, draggableStyle, selected = false, color) => {
    let variableStyles = {}

    if (isDragging) {
        variableStyles = {
            boxShadow: "0px 0px 16px 4px #ddd"
        }
    } else {
        variableStyles = {
            boxShadow: "0px 0px 8px 4px #eee"
        }
    }

    if (selected) {
        variableStyles['border'] = `3px solid ${color}`
    }

    return {
        userSelect: "none",
        padding: 16,
        margin: "0 0 16px 0",
        borderRadius: "5px",
        background: "white",
        ...variableStyles,
        ...draggableStyle,
    };
};

const step = (props) => {

    let tagColor
    switch (props.stepType) {
        case 'Content': tagColor = '#0077b6'; break;
        case 'Pathway': tagColor = '#2ec4b6'; break;
        case 'Shared Step': tagColor = '#9b5de5'; break;
    }

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
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        selected,
                        tagColor
                    )}
                >
                    <div className={classes.TopRow}>
                        <div className={classes.StepTitle}>
                            <p>{content}</p>
                        </div>

                        <div 
                            className={classes.EditBtn}
                            onClick={() => props.onSelectStep(props.id)}
                        >
                            <EditIcon fontSize="45px" color="#555"/>
                        </div>
                    </div>
                    
                    <div className={classes.Details}>
                        {/* <Rating value={props.rating}/> */}
                        
                        
                    </div>

                    
                    
                    <div className={classes.BottomRow}>
                        <StepTag stepType={props.stepType} />

                        {selected ? <div className={classes.Unsaved} style={{backgroundColor: `${tagColor}`}}/> 
                                  : null}

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