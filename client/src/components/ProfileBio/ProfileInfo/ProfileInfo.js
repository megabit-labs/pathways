import React from 'react';

import './ProfileInfo.css';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images = require.context('../../assets');

function ProfileInfo(props) {

    let profilePhoto = props.bio.profilePhoto, description = props.bio.description

    if(profilePhoto == null) {
        profilePhoto = "./user.png"
    }
    if(description == null) {
        description = "Add a description"
    }

    return (
        <div className='profileInfo'>
            <div><img className='profilePhoto' src={images(profilePhoto)} alt='No Photo'></img></div>
            <div className='profileName'> {props.bio.name}</div>
            <div className='profileID'><span> <FontAwesomeIcon icon={faGithub} /> </span> {props.bio.username} </div>
            <div className='profileDesc'>{description}</div>
        </div>
    )
}

export default ProfileInfo;
