import React from 'react'

const difficultyLevel = (props) => {
    let color = ''
    let value = ''
    switch (props.value) {
        case 0: color = "#dfdfdf"; break
        case 1: color = "#fcbf49"; value = 'Easy'; break
        case 2: color = "#f77f00"; value = 'Intermediate'; break
        case 3: color = "#d62828"; value = 'Hard'; break
        default: color = "#fff"
    }

    const styles = {
        color: color,
        fontWeight: "600",
        display: "inline-block",
        marginLeft: '20px'
    }

    return (
        <div style={styles}>
            {value}
        </div>
    )

}

export default difficultyLevel