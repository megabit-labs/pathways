import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStats from './ProfileStats/ProfileStats';

import './ProfileBio.css';

class ProfileBio extends Component {

    render() {
        return(
            <div className='profileBio'>
                <div>
                    <div>
                        <ProfileInfo bio={this.props.content.bio}/>
                    </div>
                    <hr />
                    <div>
                        <ProfileStats content={this.props.content.pathwayData}/>
                    </div>
                    <hr />
                    <div className='createPathwayLink'>
                        <Link to="/create">
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Create a Pathway</span>
                        </Link>
                    </div>
                </div>
                <div className='profileFooter'>
                    pathways.
                </div>
            </div>
        );
    }
}

export default ProfileBio;