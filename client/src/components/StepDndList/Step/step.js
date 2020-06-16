import React from "react";
import { Draggable } from "react-beautiful-dnd";

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
        height: "100px",
        borderRadius: "10px",
        ...variableStyles,
        ...draggableStyle,
    };
};

const step = (props) => {
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
                    {props.content}
                </div>
            )}
        </Draggable>
    );
};

export default step;
