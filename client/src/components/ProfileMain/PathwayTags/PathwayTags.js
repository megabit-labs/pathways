import React from 'react';

const PathwayTags = props => props.tags.map(tag => {
    return(
        <span>#{tag}</span>
    )
})

export default PathwayTags;