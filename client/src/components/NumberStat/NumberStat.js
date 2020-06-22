import React from 'react'

const numberStat = (props) => {
    let variableStyles = {}
    if (props.filled) {
        variableStyles = {
            backgroundColor: props.color,
            color: '#fff'
        }
    } else {
        variableStyles = {
            border: `3px solid ${props.color}`,
            color: props.color
        }
    }
    return (
        <div 
            style={{
                height: `${props.size}px`,
                width: `${props.size}px`,
                borderRadius: `${props.size/2}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                ...variableStyles
            }}
        >
            <div
                style={{
                    fontSize: `${props.size/1.5}px`,
                    fontWeight: '500'
                }}
            >
                {props.value}
            </div>
        </div>
    )
}

export default numberStat