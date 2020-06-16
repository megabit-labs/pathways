import React from "react";
import { Draggable } from "react-beautiful-dnd";

import classes from './Step.module.css'

const getItemStyle = (isDragging, draggableStyle) => {
    let variableStyles = {}

    if (isDragging) {
        variableStyles = {
            // border: "1px solid #aaa",
            boxShadow: "0px 0px 16px 4px #ddd",
            background: "white"
        }
    } else {
        variableStyles = {
            // border: "1px solid #aaa",
            boxShadow: "0px 0px 8px 4px #eee",
            background: "white"
        }
    }

    return {
        userSelect: "none",
        padding: 16,
        margin: "0 0 16px 0",
        // height: "100px",
        borderRadius: "5px",
        ...variableStyles,
        ...draggableStyle,
    };
};

const step = (props) => {

    let tagColor
    switch (props.stepType) {
        case 'Content': tagColor = '#ff5400'; break;
        case 'Pathway': tagColor = '#ff0054'; break;
        case 'Shared Step': tagColor = '#9b5de5'; break;
    }

    const typeStyle = {
        display: "inline-block",
        backgroundColor: tagColor,
        height: "23px",
        borderRadius: "12.5px",
        fontSize: "15px",
        boxSizing: "border-box",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginTop: "10px",
        textAlign: "center",
        color: "white",
        fontWeight: "800",
        verticalAligh: "middle"
    }

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
                        provided.draggableProps.style
                    )}
                >
                    <div className={classes.StepTitle}>
                        {props.content}
                    </div>
                    <div style={typeStyle}>
                        <p>{props.stepType}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default step;