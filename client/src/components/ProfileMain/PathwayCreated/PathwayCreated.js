import React from 'react';
import './PathwayCreated.css';

import PathwayTags from '../PathwayTags/PathwayTags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const CreatedContainer = props => {
    return(
        <div className='createdContainer'>
            <div className='createdDescription'>
                <div className='createdHeader'>
                    <div className='createdTitle'>{props.data.topic}</div>                    
                    <div><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                </div>

                <div className='createdBody'>
                    {props.data.description}
                </div>

                <div className='createdFooter'>
                    <div className='createdTags'>
                        <PathwayTags tags={props.data.tags} />
                    </div>

                    <div className='createdTime'>Last Updated {props.data.lastUpdated} ago</div>
                </div>
            </div>
            <div className='createdStats'>
                <div className='createdStat'>
                    <span>{props.data.steps}</span>
                    <span>Steps</span>
                </div>
                <div className='createdStat'>
                    <span>{props.data.haveDone}</span>
                    <span>Have Done</span>
                </div>
                <div className='createdStat'>
                    <span>{props.data.supported}</span>
                    <span>Pathways Supported</span>
                </div>
            </div>
        </div>
    )
}

const CreatedWrapper = props => props.selectedTab.pathways.map(pathway => {
    return(
        <CreatedContainer data={pathway}/>
    )
})

const PathwayCreated = props => {
    return(
        <div className='createdWrapper'>
            <CreatedWrapper selectedTab={props.selectedTab} />
        </div>
    )
}

export default PathwayCreated;