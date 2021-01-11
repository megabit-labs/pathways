import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { Query } from "react-apollo";

import StepDndList from '../../components/StepDndList/stepDndList'
import StepEditArea from '../../components/StepEditArea/StepEditArea'
import PathwayDetails from '../../components/PathwayDetails/PathwayDetails'

import classes from './CreateEditPathway.module.css'
import * as actions from '../../store/actions/index';

const CreateEditPathway = (props) => {

    const PathwayCreateEdit = () => {
        return(
            <Fragment>

                <PathwayDetails
                    showPathwayDetailsScreen={
                        (props.pathwayId === '') ? true : props.showPathwayDetailsScreen
                    }
                    hidePathwayDetailsScreen={
                        () => props.togglePathwayDetailsScreen(false)
                    }
                    modalCloseOnOverlay={(props.pathwayId === '') ? false : props.modalCloseOnOverlay}
                    toggleModalCloseOnOverlay={props.toggleModalCloseOnOverlay}
                    location={props.location.pathname}
                />

                <div className={classes.Content}>
                    <div className={classes.EditArea}>
                        <StepEditArea />
                    </div>
                    <div className={classes.StepList}>
                        <StepDndList
                            showPathwayDetailsScreen={
                                () => props.togglePathwayDetailsScreen(true)
                            }
                        />
                    </div>
                </div>
            </Fragment>
        )
    }

    if(!props.isLoggedIn) {
        return(<div>Please Login to create and edit pathways</div>)
    } else {
        const currentPathway = props.match.params.pathwayId
        if(currentPathway && !props.initialState) {
            const FETCH_PATHWAY_DATA = gql`{
                Pathway(id: "${currentPathway}") {
                    id
                    name
                    description
                    tags {
                        name
                    }
                    steps {
                        id
                        name
                        index
                        stepType
                        content {
                            id
                            title
                            content
                        }
                        time
                    }
                }
            }
            `

            return(
                <Query query={FETCH_PATHWAY_DATA}>
                    {({loading, error, data}) => {
                        if(loading) {return(<div>Loading...</div>)}
                        else if(error) {
                            console.log(error)
                            return(<div>Error occured</div>)
                        }
                        else {
                            // console.log(data)
                            props.updatePathwayInitialState(data.Pathway[0])
                            return(
                                <PathwayCreateEdit/>
                            )
                        }
                    }}
                </Query>
            )
        } else {
            return(
                <PathwayCreateEdit/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        stepId: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps,
        showPathwayDetailsScreen: state.createEditPathway.showPathwayDetailsScreen,
        modalCloseOnOverlay: state.createEditPathway.modalCloseOnOverlay,
        pathwayId: state.createEditPathway.pathwayId,
        isLoggedIn: state.displayProfile.isLoggedIn,
        initialState: state.createEditPathway.initialState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        togglePathwayDetailsScreen: (payload) => dispatch(actions.togglePathwayDetailsScreen(payload)),
        toggleModalCloseOnOverlay: () => dispatch(actions.toggleModalCloseOnOverlay()),
        updatePathwayInitialState: (payload) => dispatch(actions.updatePathwayInitialState(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPathway)
