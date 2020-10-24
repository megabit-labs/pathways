import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import TimeProgressSpinner from '../TimeProgressSpinner/TimeProgressSpinner';

import './RecentPathway.css'

const ContentHeader = props => {
    
    return(
        <div className='contentHeader'>
            <div className='contentTitle'>
                <div className='contentSubtopic'>{props.subtopic}</div>
                <div className='contentTopic'>in <span> {props.topic} </span></div>
            </div>
            <div className='contentID'>
                #{props.id}
            </div>
        </div>
    )
}

const ContentDescription = props => {
    return(
        <div className='contentDescription'>
            {props.desc}
        </div>
    )
}

const ContentFooter = props => {
    return(
        <div className='contentFooter'>
            <div className='contentTime'>
                <TimeProgressSpinner timeLeft={props.timeLeft} totalTime={props.totalTime} radius={14}/>
                <div> {props.timeLeft} more hours left</div>
            </div>

            <div className='contentResume'>
                <div><FontAwesomeIcon icon={faPlay} /></div>
                <div>resume</div>
            </div>
        </div>
    );
}

const RecentPathway = props => {
    
    return(
        <div className='recentPathway'>
            <ContentHeader topic={props.data.topic} subtopic={props.data.subtopic} id={props.data.id} />
            <ContentDescription desc={props.data.description} />
            <ContentFooter timeLeft={props.data.timeLeft} totalTime={props.data.totalTime} />
        </div> 
    );
}

export default RecentPathway;