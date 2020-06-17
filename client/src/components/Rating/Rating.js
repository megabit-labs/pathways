import React, { useState } from 'react'
import Rating from 'react-rating'

const getRatingSymbol = (value) => {
    let bgColor = ""
    switch (value) {
        case 0: bgColor = "#dfdfdf"; break
        case 1: bgColor = "#fcbf49"; break
        case 2: bgColor = "#f77f00"; break
        case 3: bgColor = "#d62828"; break
        default: bgColor = "#d62828"
    }

    const style = {
        width: "50px",
        height: "5px",
        borderRadius: "2.5px",
        backgroundColor: bgColor,
        marginRight: "5px"
    }

    return (<div style={style}></div>)
}


const CustomRating = (props) => {
    return <Rating 
                emptySymbol={getRatingSymbol(0)}
                fullSymbol={getRatingSymbol(props.value)}
                stop={3}
                initialRating={props.value}
                readonly
            />
}

export default CustomRating