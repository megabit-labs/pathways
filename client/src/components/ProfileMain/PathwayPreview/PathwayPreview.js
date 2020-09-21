import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import TimeProgressSpinner from '../TimeProgressSpinner/TimeProgressSpinner';

import './PathwayPreview.css';

const PathwayPreview = props => {
    return(
        <div className='previewBox'>
            <div className='previewHeader'>
                <div className='previewSubtopic'>{props.data.subtopic}</div>
                <div className='previewTopic'>{props.data.topic}</div>
            </div>

            <div className='previewFooter'>
                <div className='previewTime'>
                    <TimeProgressSpinner timeLeft={props.data.timeLeft} totalTime={props.data.totalTime} radius={10} />
                    <div>{props.data.timeLeft}h</div>
                </div>
                <div className='previewResume'>
                    <div><FontAwesomeIcon icon={faPlay} /></div>
                </div>
            </div>
        </div>
    );
}

export default PathwayPreview;