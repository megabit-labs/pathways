import React, {Component} from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";

import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfileMain from '../../components/ProfileMain/ProfileMain';

import './UserProfile.css';

import * as actions from '../../store/actions/index';

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

const statusEnum = {
    "NOT_STARTED": 0,
    "IN_PROGRESS": 1,
    "HAS_COMPLETED": 2
}

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
    
    userdata.pathwaysInProgress.forEach((pathway) => {
        let pathwayDetails = {}
        pathwayDetails["id"] = pathway.id
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

            pathwayDetails["id"] = pathway.id
            pathwayDetails["timeLeft"] = totalTime - timeSpent
            pathwayDetails["subtopic"] = pathway.step[idx].name
            pathwayDetails["totalTime"] = totalTime

            ongoing.pathways.push(pathwayDetails)
        }
    })

    userdata.created.forEach((pathway) => {
        let createdDetails = {}
        createdDetails["topic"] = pathway.topic
        createdDetails["description"] = pathway.description
        createdDetails["tags"] = pathway.tags.map(tag => tag.name)
        createdDetails["lastUpdated"] = pathway.lastUpdated.formatted
        createdDetails["haveDone"] = pathway.steps.length
        createdDetails["supported"] = pathway.steps.reduce((prev, step) => {
            if(step.isPathway) {
                return prev + 1
            } else {
                return prev
            }
        }, 0)
        // pathways have completed
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

    // console.log(content)
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
                                isPathway
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
