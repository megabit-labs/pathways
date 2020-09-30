import React from 'react';
import './PathwayCompleted.css';

import PathwayTags from '../PathwayTags/PathwayTags';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

// expects date in the format 'MM/DD/YYYY'
const groupBy = function(xs) {
    return xs.reduce(function(rv, x) {
        let y = new Date(x['dateCompleted']);
        x['dateString'] = monthNames[y.getMonth()] + ', ' + y.getFullYear();
        (rv[y.getMonth() + y.getYear()*12] = rv[y.getMonth() + y.getYear()*12] || []).push(x);
        return rv;
    }, {});
};

const CompletedContent = props => props.data.map(ele => {
    return(
        <div className='completedContent'>
            <div>
                <div className='completedTitle'>{ele.topic}</div>
                <div className='completedTags'>
                    <PathwayTags tags={ele.tags}/>
                </div>
            </div>
        </div>   
    )
})

const CompletedContainer = props => {
    return(
        <div className='completedContainer'>
            <div className='completedDate'>{props.data[0]['dateString']}</div>
            <div className='completedBody'>
                <div className='verticalRule'></div>
                <div className='completedContentContainer'>
                    <CompletedContent data={props.data} />
                </div>
            </div>
        </div>
    )
}

const PathwayCompleted = props => {
    const content = groupBy(props.selectedTab.pathways);
    let containers = [];
    Object.keys(content).sort().reverse().forEach(key => {
        containers.push(<CompletedContainer data={content[key]} />)
    });
    
    return(
        <div className='completedWrapper'>
            {containers}
        </div>
    )
}

export default PathwayCompleted;