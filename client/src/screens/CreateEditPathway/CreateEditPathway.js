import React, { Fragment, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import StepDndList from '../../components/StepDndList/stepDndList'
import StepEditArea from '../../components/StepEditArea/StepEditArea'
import PathwayDetails from '../../components/PathwayDetails/PathwayDetails'

import classes from './CreateEditPathway.module.css'
import * as actions from '../../store/actions/index';

function getPathwayStateFromPayload(payload) {
    let tags = payload.tags.map(tag => tag.name)
    let stepOrder = payload.steps.map((step) => step.id)
    const steps = {}
    
    payload.steps.forEach((step) => {
        const { id } = step
        steps[id] = {
            id: id,
            heading: step.content ? step.content.title : step.name,
            content: step.content ? step.content.content : "",
            stepType: step.stepType,
            selected: false,
            timeLimit: step.time,
            isPreview: false,
            typeId: step.content ? step.content.id : "",
            shareId: ""
        }
    })

    return {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        tags: tags,
        stepOrder: stepOrder,
        steps: steps,
        initialState: true,
    }
}

const CreateEditPathway = (props) => {
    const { pathwayId } = useParams()

    const FETCH_PATHWAY_DATA = gql`
        query Pathway($id: String!) {
            Pathway(id: $id) {
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

    const { loading, error, data } = useQuery(FETCH_PATHWAY_DATA, {
        variables: {
            id: pathwayId
        }
    })

    const [pathwayData, setPathwayData] = useState({
        id: '',
        name: '',
        description: '',
        tags: [],
        stepOrder: [],
        steps: {},
        initialState: false
    })

    const [uiState, setUiState] = useState({
        isPreview: false,
        selectedStep: '',
        showPathwayDetailsScreen: false,
        modalCloseOnOverlay: true,
        loading: true
    })

    useEffect(() => {
        if (!loading && data) {
            setPathwayData(
                getPathwayStateFromPayload(data.Pathway[0])
            )
            setUiState(update(uiState, {
                loading: {$set: false}
            }))
        }
    }, [loading, data])

    function onReorderSteps(result) {
        setPathwayData(update(pathwayData, {
            stepOrder: {
                $apply: function(stepOrder) {
                    const newSteps = Array.from(stepOrder)
                    const [removed] = newSteps.splice(result.source.index, 1)
                    newSteps.splice(result.destination.index, 0, removed)
                    return newSteps
                }
            }
        }))
    }

    function onSelectStep(id) {
        setUiState(update(uiState, {
            selectedStep: {
                $set: id
            }
        }))
    }

    function onUpdateStep(updateObj) {
        setPathwayData(update(pathwayData, {
            steps: {
                [uiState.selectedStep]: updateObj
            }
        }))
    }

    function togglePreview() {
        setUiState(update(uiState, {
            isPreview: {
                $apply: (isPreview) => !isPreview
            }
        }))
    }

    if (loading || uiState.loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error
            </div>
        )
    }

    return (
        <Fragment>
            <div className={classes.Content}>
                    <div className={classes.EditArea}>
                        {
                            uiState.selectedStep
                            ?   (
                                    <StepEditArea
                                        step={pathwayData.steps[uiState.selectedStep]}
                                        selectedStep={uiState.selectedStep}
                                        isPreview={uiState.isPreview}
                                        updateStep={onUpdateStep}
                                        togglePreview={togglePreview}
                                    />
                            )
                            :   <div/>
                        }
                    </div>
                    <div className={classes.StepList}>
                        <StepDndList
                            pathway={pathwayData}
                            selectedStep={uiState.selectedStep}
                            onReorderSteps={onReorderSteps}
                            onSelectStep={onSelectStep}
                            showPathwayDetailsScreen={
                                () => props.togglePathwayDetailsScreen(true)
                            }
                        />
                    </div>
                </div>
        </Fragment>
    )
    


    // const PathwayCreateEdit = () => {
    //     return(
    //         <Fragment>

    //             <PathwayDetails
    //                 showPathwayDetailsScreen={
    //                     (props.pathwayId === '') ? true : props.showPathwayDetailsScreen
    //                 }
    //                 hidePathwayDetailsScreen={
    //                     () => props.togglePathwayDetailsScreen(false)
    //                 }
    //                 modalCloseOnOverlay={(props.pathwayId === '') ? false : props.modalCloseOnOverlay}
    //                 toggleModalCloseOnOverlay={props.toggleModalCloseOnOverlay}
    //                 location={props.location.pathname}
    //             />

    //             <div className={classes.Content}>
    //                 <div className={classes.EditArea}>
    //                     <StepEditArea />
    //                 </div>
    //                 <div className={classes.StepList}>
    //                     <StepDndList
    //                         showPathwayDetailsScreen={
    //                             () => props.togglePathwayDetailsScreen(true)
    //                         }
    //                     />
    //                 </div>
    //             </div>
    //         </Fragment>
    //     )
    // }

    // if(!props.isLoggedIn) {
    //     return(<div>Please Login to create and edit pathways</div>)
    // } else {
    //     const currentPathway = props.match.params.pathwayId
    //     if(currentPathway && !props.initialState) {
    //         const FETCH_PATHWAY_DATA = gql`{
    //             Pathway(id: "${currentPathway}") {
    //                 id
    //                 name
    //                 description
    //                 tags {
    //                     name
    //                 }
    //                 steps {
    //                     id
    //                     name
    //                     index
    //                     stepType
    //                     content {
    //                         id
    //                         title
    //                         content
    //                     }
    //                     time
    //                 }
    //             }
    //         }
    //         `

    //         return(
    //             <Query query={FETCH_PATHWAY_DATA}>
    //                 {({loading, error, data}) => {
    //                     if(loading) {return(<div>Loading...</div>)}
    //                     else if(error) {
    //                         console.log(error)
    //                         return(<div>Error occured</div>)
    //                     }
    //                     else {
    //                         // console.log(data)
    //                         props.updatePathwayInitialState(data.Pathway[0])
    //                         return(
    //                             <PathwayCreateEdit/>
    //                         )
    //                     }
    //                 }}
    //             </Query>
    //         )
    //     } else {
    //         return(
    //             <PathwayCreateEdit/>
    //         )
    //     }
    // }
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
