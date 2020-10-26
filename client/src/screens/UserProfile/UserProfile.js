import React, {Component} from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";

import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfileMain from '../../components/ProfileMain/ProfileMain';

import './UserProfile.css';

import * as actions from '../../store/actions/index';

const statusEnum = {
    "NOT_STARTED": 0,
    "IN_PROGRESS": 1,
    "HAS_COMPLETED": 2
}

const stepType = {
    "CONTENT_STEP": 0,
    "SHARED_STEP": 1,
    "PATHWAY_STEP": 2
}

// function to convert data into appropriate
// format to load the profile page
// check /store/shared/profileData.js for required data structure
const convertData = (userdata) => {
    let bio = {}
    
    bio["name"] = userdata.name
    bio["username"] = userdata.username
    // bio description, bio profilePhoto
    
    let ongoing = {}
    ongoing["label"] = "On-going"
    ongoing["pathways"] = []
    
    let completed = {}
    completed["label"] = "Completed"
    completed["pathways"] = []

    let created = {}
    created["label"] = "Created"
    created["pathways"] = []
    
    userdata.pathwaysInProgress.forEach((pathway, idx) => {
        let pathwayDetails = {}
        pathwayDetails["id"] = idx
        pathwayDetails["topic"] = pathway.name
            
        if(pathway.steps[pathway.steps.length-1].userStatus == statusEnum.HAS_COMPLETED) {
            
            pathwayDetails["tags"] = pathway.tags.map(tag => tag.name)
            // completion date
            completed.pathways.push(pathwayDetails)
        } else {

            pathwayDetails["description"] = pathway.description
            
            let totalTime = 0, idx = -1, timeSpent

            pathway.steps.forEach((step, i) => {
                if(step.userStatus != statusEnum.HAS_COMPLETED && (idx === -1)) {
                    idx = i
                    timeSpent = totalTime
                }

                totalTime += step.time
            })

            pathwayDetails["timeLeft"] = totalTime - timeSpent
            pathwayDetails["subtopic"] = pathway.step[idx].name
            pathwayDetails["totalTime"] = totalTime

            ongoing.pathways.push(pathwayDetails)
        }
    })

    userdata.created.forEach((pathway) => {
        let createdDetails = {}
        createdDetails["topic"] = pathway.name
        createdDetails["description"] = pathway.description
        createdDetails["tags"] = pathway.tags.map(tag => tag.name)
        createdDetails["lastUpdated"] = pathway.lastModified.formatted
        createdDetails["steps"] = pathway.steps.length
        createdDetails["supported"] = pathway.steps.reduce((prev, step) => {
            if(step.stepType === stepType.PATHWAY_STEP ) {
                return prev + 1
            } else {
                return prev
            }
        }, 0)
        // no of users that have completed the pathway
        created.pathways.push(createdDetails)
    })

    // for now recent pathway is initial pathway
    ongoing["recentPathway"] = {}
    if(ongoing.pathways.length > 0) {
        ongoing.recentPathway = ongoing.pathways[0] 
    }

    ongoing["total"] = ongoing.pathways.length
    completed["total"] = completed.pathways.length
    created["total"] = created.pathways.length
    
    let content = {}
    content["bio"] = bio
    content["pathwayData"] = {}
    content.pathwayData["ongoing"] = ongoing
    content.pathwayData["completed"] = completed
    content.pathwayData["created"] = created

    console.log(content, userdata)
    return content
}

class UserProfile extends Component {
    
    render() {
        
        const isLoggedIn = this.props.isLoggedIn

        const ContentLoader = (props) => {
            const FETCH_PROFILE_DATA = gql`
                {
                    User(username: "${props.username}") {
                        username
                        name
                        pathwaysInProgress {
                            id
                            name
                            tags {
                                name
                            }
                            steps {
                                id
                                name
                                time
                                index
                                userStatus
                            }
                            description
                        }
                        created {
                            name
                            tags {
                                name
                            }
                            description
                            steps {
                                id
                                stepType
                            }
                            lastModified {
                                formatted
                            }
                        }
                    }
                }
            `;

            return(
                <Query query={FETCH_PROFILE_DATA}>
                    {({loading, error, data}) => {
                        if(loading) { console.log("Loading"); return(<div>Loading...</div>) ;}
                        else if(error) {
                            console.log(error)
                            return(<div>Error occured</div>)
                        }
                        else {
                            // console.log(data);
                            if(data.User.length !== 1) {
                                return(<div>Multiple entries for user</div>)
                            }

                            const userdata = convertData(data.User[0])
                            props.updateProfile(userdata)

                            return(
                                <MainContent userdata={userdata} />
                            )
                        }
                    }}
                </Query>
            )
        }

        const MainContent = (props) => {
            return(
                <div className='ProfileSection'>
                    <div className='ProfileLeftSection'>
                        <ProfileBio content={props.userdata}/>
                    </div>
                    <div className='ProfileRightSection'>
                        <ProfileMain content={props.userdata.pathwayData}/>
                    </div>
                </div>
            )
        }
        
        if(isLoggedIn) {
            return(
                <ContentLoader username={this.props.username} updateProfile={this.props.updateProfile} />
            )
        } else {
            return(
                <div> Login to view this page</div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        contentExisting: state.displayProfile.contentExisting,
        content: state.displayProfile.content,
        username: state.displayProfile.username,
        isLoggedIn: state.displayProfile.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (payload) => dispatch(actions.updateProfile(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
