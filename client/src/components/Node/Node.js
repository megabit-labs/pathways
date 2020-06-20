import React from 'react';

import classes from './Node.module.css';

const Node = props => {

    let circleClasses = [classes.circle, classes.inactive];

    const showStep = (event) => {
        props.clicked(event);
    };

    return (
        <div className={classes.circleContainer}>
            <div className={circleClasses.join(' ')} onClick={(event) => showStep(event)}>{props.step.name}</div>
        </div>
    );
};

export default Node;