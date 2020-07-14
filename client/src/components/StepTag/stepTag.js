import React from 'react'

const stepTag = (props) => {
    let tagColor
    switch (props.stepType) {
        case 'Content': tagColor = '#0077b6'; break;
        case 'Pathway': tagColor = '#2ec4b6'; break;
        case 'Shared Step': tagColor = '#9b5de5'; break;
    }

    // These styles are kinda messed up, with the transform and all.
    // TODO: Get a real front-end dev to fix these.
    const typeStyle = {
        display: "inline-block",
        backgroundColor: tagColor,
        height: "23px",
        borderRadius: "5px",
        fontSize: "15px",
        boxSizing: "border-box",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginTop: "auto",
        marginBottom: "auto",
        // transform: "translateY(-20%)",
        textAlign: "center",
        color: "white",
        fontWeight: "800",
        verticalAligh: "middle"
    }

    return (
        <div style={typeStyle}>
            <p>{props.stepType}</p>
        </div>
    )
}

export default stepTag