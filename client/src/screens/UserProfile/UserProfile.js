import React, {Component} from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";

import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfileMain from '../../components/ProfileMain/ProfileMain';
// import {content} from './UserData';

import './UserProfile.css';

const FETCH_PROFILE_DATA = gql`
     {
        User {
            username
            name
        }
    }
`;

const mapStatetoProps = state => {
    return {
        content: state.displayProfile.content
    }
}

class UserProfile extends Component {

    render() {

        const Something = () => {
            return(
                <Query query={FETCH_PROFILE_DATA}>
                    {({loading, error, data}) => {
                        if(loading) return(<div>Loading...</div>);
                        else if(error) {
                            console.log(error)
                            return(<div>Error occured</div>)
                        }
                        else {
                            console.log(data);
                            return(<div>Hello</div>)
                        }
                    }}
                </Query>
            )
        }
        
        return(
            <div className='ProfileSection'>
                <div className='ProfileLeftSection'>
                    <ProfileBio content={this.props.content}/>
                </div>
                <div className='ProfileRightSection'>
                    <ProfileMain content={this.props.content.pathwayData}/>
                </div>
                <Something />
            </div>
        );
    }
}

export default connect(mapStatetoProps)(UserProfile);