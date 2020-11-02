import React from 'react';
import './PathwayOngoing.css';

import RecentPathway from './RecentPathway/RecentPathway';
import PathwayPreview from './PathwayPreview/PathwayPreview';

const PreviewData = props => props.selectedTab.pathways.map((pathway, idx) => {
    if(pathway.id !== props.selectedTab.recentPathway.id) {
        return(
            <PathwayPreview key={idx} data={pathway} />
        );
    }
});

const PathwayOngoing = props => {

    if(props.selectedTab.pathways.length === 0) {
        return(
            <div className='emptyWrapper'>
                Start a new pathway
            </div>
        )
    }

    return (
        <React.Fragment>
            <span class='ongoing-header-first'> Jump right back in!</span>

            <div>
                <RecentPathway data={props.selectedTab.recentPathway} />
            </div>

            <hr />

            <span class='ongoing-header-second'>Stuff you procastinated about</span>

            <div>
                <div className='previewWrapper'>
                    <PreviewData selectedTab={props.selectedTab} />
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default PathwayOngoing;