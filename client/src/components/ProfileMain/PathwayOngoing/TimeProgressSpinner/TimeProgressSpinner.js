import React from 'react';
import './TimeProgressSpinner.css';

const TimeProgressSpinner = props => {

    const rotateBy = props.timeLeft / props.totalTime * 100
    const radius = props.radius
    const circum = 22 / 7 * radius * 2
    const offset = circum - (circum*rotateBy) / 100

    const transformProperty = "translate(10px, " + (radius*2 + 10).toString() + "px) rotate(270deg)"

    const dashOffset = {
        "stroke-dashoffset": offset,
        "stroke-dasharray": circum,
        "transform": transformProperty
    }
    const dashArray = {
        "stroke-dasharray": circum,
        "stroke-dashoffset": 0
    }

    return(
        <div class="progressPie">
            <div class="pieWrapper">
                <svg>
                    <circle style={dashArray} cx={radius} cy={radius} r={radius}></circle>
                    <circle style={dashOffset} cx={radius} cy={radius} r={radius}></circle>
                </svg>
            </div>
        </div>
    );
}

export default TimeProgressSpinner;