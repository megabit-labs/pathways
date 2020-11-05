import React from 'react';

const PathwayTags = props => props.tags.map((tag, idx) => {
    return(
        <span key={idx}>#{tag}</span>
    )
})

export default PathwayTags;