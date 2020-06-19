import React, { Component } from 'react';

import classes from './Pathway.module.css';
import Node from '../../components/Node/Node';
import { Fragment } from 'react';

class Pathway extends Component {

    pathwayRef = React.createRef();

    state = {
        pos: [],
    }

    componentDidMount() {
        this.pathwayRef.current.focus();
        console.log(this.pathwayRef);
        let nodes = this.pathwayRef.current.children;
        console.log(nodes[0].children[0]);
        let pos = [];
        for (let i of nodes) {
            let ele = i.children[0];
            let coords = ele.getBoundingClientRect();
            console.log(coords)
            let temp = {
                y: (coords.bottom - coords.top) / 2 + coords.top,
                x: (coords.right - coords.left) / 2 + coords.left,
            }
            pos.push(temp)
        };
        this.setState({ pos: pos })
    }


    render() {

        console.log(this.props.pathway)

        console.log(this.state.pos)

        let display;
        if (this.state.pos.length === 0) {
            display = null;
        }
        else {
            console.log(this.state.pos[0].x)
            display = <svg style={{ position: 'absolute', height: '100%', width: '100%' }}>
                {this.state.pos.map((pos, index) => {
                    if (index === (this.state.pos.length - 1)) {
                        return null;
                    }
                    else {
                        return <line x1={this.state.pos[index].x} y1={this.state.pos[index].y} x2={this.state.pos[index + 1].x} y2={this.state.pos[index + 1].y} stroke="#09695d" stroke-width="8" />
                    }
                })}
            </svg>
        }


        console.log(this.props.pathway.steps)
        return (
            <Fragment>
                {display}
                <div className={classes.outerContainer}>
                    <div className={classes.pathwayContainer} ref={this.pathwayRef}>
                        {this.props.pathway.steps.map((step, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <div className={classes.nodeContainerLeft}>
                                        <Node step={step} />
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div className={classes.nodeContainerRight}>
                                        <Node step={step} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }

};

export default Pathway;


// import Graph from "react-graph-vis";
// import Graph from "../../lib";

// import Graph from 'react-graph-vis'

// import React, { Component } from "react";
// import { render } from "react-dom";

// const graph = {
//     nodes: [
//         { id: 1, label: "Node 1", color: "#e04141" },
//         { id: 2, label: "Node 2", color: "#e09c41" },
//         { id: 3, label: "Node 3", color: "#e0df41" },
//         { id: 4, label: "Node 4", color: "#7be041" },
//         { id: 5, label: "Node 5", color: "#41e0c9" }
//     ],
//     edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 }]
// };

// const options = {
//     layout: {
//         hierarchical: false
//     },
//     edges: {
//         color: "#000000"
//     }
// };

// const events = {
//     select: function (event) {
//         var { nodes, edges } = event;
//         console.log("Selected nodes:");
//         console.log(nodes);
//         console.log("Selected edges:");
//         console.log(edges);
//     }
// };

// class Pathway extends Component {
//     render() {
//         return (
//             <div>

//                 <Graph graph={graph} options={options} events={events} style={{ height: "100vh" }} />
//             </div >
//         );
//     }

// }

// export default Pathway;