import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfileMain from '../../components/ProfileMain/ProfileMain';
// import {content} from './UserData';

import './UserProfile.css';

const mapStatetoProps = state => {
    return {
        content: state.displayProfile.content
    }
}

class UserProfile extends Component {

    render() {
        return(
            <div className='ProfileSection'>
                <div className='ProfileLeftSection'>
                    <ProfileBio content={this.props.content}/>
                </div>
                <div className='ProfileRightSection'>
                    <ProfileMain content={this.props.content.pathwayData}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStatetoProps)(UserProfile);