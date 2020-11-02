import React from 'react';
import {Link} from 'react-router-dom';
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
                    <div><Link className='createdLink' to={`/create/${props.data.pathwayId}`}>
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </Link></div>
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
        <CreatedContainer key={pathway.pathwayId} data={pathway}/>
    )
})

const PathwayCreated = props => {

    if(props.selectedTab.pathways.length === 0) {
        return(
            <div className='emptyWrapper'>
                You have not created any pathway
            </div>
        )
    }

    return(
        <div className='createdWrapper'>
            <CreatedWrapper selectedTab={props.selectedTab} />
        </div>
    )
}

export default PathwayCreated;