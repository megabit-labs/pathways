import React from 'react';

import classes from './Node.module.css';

const Node = props => {

    console.log(props.orientation);

    return (
        <div className={classes.circleContainer}>
            <div className={classes.circle}>{props.step.name}</div>
        </div>
    );
};

export default Node;