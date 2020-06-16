import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Step from "./Step/step";
import PlusIcon from 'react-ionicons/lib/MdAdd'

import classes from './StepDndList.module.css'

const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `${k}`,
        content: `item-${k + 1}`,
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

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

class StepDndList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(7),
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({ items: items });
    }

    render() {
        console.log(this.state.items);
        return (
            <div className={classes.ControlsArea}>
                <div className={classes.StepListArea}>
                    <div className={classes.StepListTitle}>
                        <p style={{fontSize: "40px"}}>Steps</p>
                        <div className={classes.AddBtn}>
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
                                    {this.state.items.map((item, index) => (
                                        <Step
                                            key={index}
                                            id={index}
                                            index={index}
                                            content={item.content}
                                        />
                                    ))}
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

export default StepDndList;
