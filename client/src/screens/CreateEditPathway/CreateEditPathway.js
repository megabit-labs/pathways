import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import StepDndList from '../../components/StepDndList/stepDndList'
import StepEditArea from '../../components/StepEditArea/StepEditArea'
import PathwayDetails from '../../components/PathwayDetails/PathwayDetails'

import classes from './CreateEditPathway.module.css'
import * as actions from '../../store/actions/index';

class CreateEditPathway extends Component {

    render() {
        return (
            <Fragment>
                <PathwayDetails
                    showPathwayDetailsScreen={
                        this.props.showPathwayDetailsScreen
                    }
                    hidePathwayDetailsScreen={
                        () => this.props.togglePathwayDetailsScreen(false)
                    }
                    modalCloseOnOverlay={this.props.modalCloseOnOverlay}
                    toggleModalCloseOnOverlay={this.props.toggleModalCloseOnOverlay}
                />
                <div className={classes.Content}>
                    <div className={classes.EditArea}>
                        <StepEditArea />
                    </div>
                    <div className={classes.StepList}>
                        <StepDndList
                            showPathwayDetailsScreen={
                                () => this.props.togglePathwayDetailsScreen(true)
                            }
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stepId: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps,
        showPathwayDetailsScreen: state.createEditPathway.showPathwayDetailsScreen,
        modalCloseOnOverlay: state.createEditPathway.modalCloseOnOverlay
    }
}

const mapDispatchToProps = dispatch => {
    return {
        togglePathwayDetailsScreen: (payload) => dispatch(actions.togglePathwayDetailsScreen(payload)),
        toggleModalCloseOnOverlay: () => dispatch(actions.toggleModalCloseOnOverlay()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPathway)
