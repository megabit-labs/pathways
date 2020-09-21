import React from 'react';

import './ProfileInfo.css';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images = require.context('../../assets');

function ProfileInfo(props) {
    return (
        <div className='profileInfo'>
            <div><img className='profilePhoto' src={images(props.bio.profilePhoto)} alt='No Photo'></img></div>
            <div className='profileName'> {props.bio.name}</div>
            <div className='profileID'><span> <FontAwesomeIcon icon={faGithub} /> </span> {props.bio.username} </div>
            <div className='profileDesc'>{props.bio.description}</div>
        </div>
    )
}

export default ProfileInfo;
